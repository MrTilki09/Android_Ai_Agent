
import { HandleToolCall } from './handleToolCall';
import OpenAI from 'openai';
import { agentFunctions } from './functions';
import { NativeModules } from 'react-native';
    const LM_STUDIO_URL = 'http://192.168.1.38:1234/v1/chat/completions'; 

// Connect to LM Studio's local OpenAI-compatible endpoint
const openai = new OpenAI({ 
    baseURL: 'http://192.168.1.38:1234/v1', // Default LM Studio port
    apiKey: 'lm-studio' // API key is required by the SDK, but LM Studio ignores it
});

// 2. Define the Menu (Converted to OpenAI standard format)
const tools: OpenAI.Chat.ChatCompletionTool[] = agentFunctions as OpenAI.Chat.ChatCompletionTool[]; // Prove to TypeScript this is the right type


// 4. Memory (We have to manage this manually now)
// We store this globally so the agent remembers past messages in the Telegram chat
let chatHistory: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a helpful assistant running locally on LM Studio. Use your tools when needed." }
];


export async function startAgent(userMessage: string, setBackgroundColor?: (color: string) => void) { 
    // Use provided URL or fall back to default
const handleToolCall = new HandleToolCall();

    chatHistory.push({ role: "user", content: userMessage });
    
    try {
        // Step 1: Send to LM Studio using standard Fetch
        let rawResponse = await fetch(LM_STUDIO_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "local-model",
                messages: chatHistory,
                tools: tools
            })
        });

        let data = await rawResponse.json();
        
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error("Invalid response structure:", data);
            return "Received an invalid response from the server.";
        }
        
        let aiMessage = data.choices[0].message;

        // Step 2: Loop to handle multiple rounds of tool calls
        let maxIterations = 10; // Prevent infinite loops
        let iteration = 0;
        
        while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0 && iteration < maxIterations) {
            iteration++;
            
            // Ensure content is a string (can be null when tool_calls present)
            if (!aiMessage.content) {
                aiMessage.content = "";
            }
            
            chatHistory.push(aiMessage);

            // Wait for user to confirm and execute tool calls
            const toolResults = await handleToolCall.handle(aiMessage, setBackgroundColor);
            
            // Add tool results to chat history with proper string content
            for (const result of toolResults) {
                chatHistory.push({
                    role: "tool",
                    tool_call_id: result.tool_call_id,
                    content: typeof result.content === 'string' ? result.content : JSON.stringify(result.content)
                });
            }

            // Step 3: Send the Observations back for the next response
            let nextRawResponse = await fetchAgentResponse();
            let nextData = await nextRawResponse.json();
            
            if (!nextData || !nextData.choices || !nextData.choices[0] || !nextData.choices[0].message) {
                console.error("Invalid response structure in loop:", nextData);
                return "Received an invalid response from the server.";
            }
            
            aiMessage = nextData.choices[0].message;
        }

        // Save and return final text
        if (aiMessage && aiMessage.content) {
            // Remove <think> tags and their content, as well as other reasoning artifacts
            const cleaned = aiMessage.content
                .replace(/<think>[\s\S]*?<\/think>/gi, '')
                .replace(/<\|think\|>[\s\S]*?<\|\/think\|>/gi, '')
                .replace(/\[THINK\][\s\S]*?\[\/THINK\]/gi, '')
                .trim();
            
            if (cleaned) {
                chatHistory.push({ role: "assistant", content: cleaned });
                return cleaned;
            }
        }
        
        console.error("No content in AI message:", aiMessage);
        return "The AI did not return any content.";

    } catch (error) {
        console.error("Local Agent crashed:", error);
        return "My local server hit an error. Make sure LM Studio is running and accessible!";
    }
}

const fetchAgentResponse = async (): Promise<any> => {
    return await fetch(LM_STUDIO_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "local-model",
                    messages: chatHistory,
                    tools: tools
                })
            });
}