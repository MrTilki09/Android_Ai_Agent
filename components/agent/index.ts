
import { HandleToolCall } from './handleToolCall';
import OpenAI from 'openai';
import { agentFunctions } from './functions';
import { NativeModules, Platform } from 'react-native';

// For Android emulator use 10.0.2.2, for physical device use your machine's IP
// Change this to your machine IP if using physical device (e.g., '192.168.x.x')
const LOCAL_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const LOCAL_PORT = '1234';
const LM_STUDIO_URL = `http://${LOCAL_HOST}:${LOCAL_PORT}/v1/chat/completions`;

const openai = new OpenAI({
    baseURL: `http://${LOCAL_HOST}:${LOCAL_PORT}/v1`,
    apiKey: 'lm-studio'
});

const tools: OpenAI.Chat.ChatCompletionTool[] = agentFunctions as OpenAI.Chat.ChatCompletionTool[]; // Prove to TypeScript this is the right type



let chatHistory: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a helpful assistant running locally on LM Studio. Use your tools when needed." }
];


export async function startAgent(userMessage: string, setBackgroundColor?: (color: string) => void) {

    const handleToolCall = new HandleToolCall();

    chatHistory.push({ role: "user", content: userMessage });

    try {
        let rawResponse = await fetch(LM_STUDIO_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "qwen3.5-2b",
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

        let maxIterations = 10;
        let iteration = 0;

        while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0 && iteration < maxIterations) {
            iteration++;

            if (!aiMessage.content) {
                aiMessage.content = "";
            }

            chatHistory.push(aiMessage);

            console.log(`[Agent] Iteration ${iteration}: Processing ${aiMessage.tool_calls.length} tool call(s)`);
            const toolResults = await handleToolCall.handle(aiMessage, setBackgroundColor);

            for (const result of toolResults) {
                chatHistory.push({
                    role: "tool",
                    tool_call_id: result.tool_call_id,
                    content: typeof result.content === 'string' ? result.content : JSON.stringify(result.content)
                });
            }

            let nextRawResponse = await fetchAgentResponse();
            let nextData = await nextRawResponse.json();

            if (!nextData || !nextData.choices || !nextData.choices[0] || !nextData.choices[0].message) {
                console.error("Invalid response structure in loop:", nextData);
                return "Received an invalid response from the server.";
            }

            aiMessage = nextData.choices[0].message;
        }

        if (iteration >= maxIterations) {
            console.warn(`[Agent] Hit max iterations (${maxIterations}). Last message:`, aiMessage);
        }

        if (aiMessage && aiMessage.content) {
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
        console.error("Chat history length:", chatHistory.length);
        return "The AI did not return any content.";

    } catch (error) {
        return "My local server hit an error. Check your connection and try again.f";
    }
}

const fetchAgentResponse = async (): Promise<any> => {
    return await fetch(LM_STUDIO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "qwen3.5-2b",
            messages: chatHistory,
            tools: tools
        })
    });
}