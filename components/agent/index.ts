
import { HandleToolCall } from './handleToolCall';
import OpenAI from 'openai';
import { agentFunctions } from './functions';
import { NativeModules } from 'react-native';

// Connect to LM Studio's local OpenAI-compatible endpoint
const openai = new OpenAI({ 
    baseURL: 'http://192.168.1.5:1234/v1', // Default LM Studio port
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
    // UPDATE THIS URL BASED ON YOUR DEVICE (Emulator vs Physical)
    const LM_STUDIO_URL = 'http://192.168.1.5:1234/v1/chat/completions'; 
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
        let aiMessage = data.choices[0].message;

        // Step 2: Check for Tool Calls
        if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
            
            chatHistory.push(aiMessage);

            handleToolCall.handle(aiMessage, setBackgroundColor);

            // Step 3: Send the Observations back for the final response
            let finalRawResponse = await fetch(LM_STUDIO_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "local-model",
                    messages: chatHistory,
                    tools: tools
                })
            });

            let finalData = await finalRawResponse.json();
            aiMessage = finalData.choices[0].message;
        }

        // Save and return final text
        if (aiMessage.content) {
            const cleaned = aiMessage.content
                // .replace(/\[TOOL_RESULT\][\s\S]*?\[END_TOOL_RESULT\]/g, '')
                // .trim();
            chatHistory.push({ role: "assistant", content: cleaned });
            return cleaned;
        }

    } catch (error) {
        console.error("Local Agent crashed:", error);
        return "My local server hit an error. Make sure LM Studio is running and accessible!";
    }
}