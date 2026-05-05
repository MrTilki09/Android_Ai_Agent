import { useMutation } from "@tanstack/react-query";
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, PermissionsAndroid, Alert } from "react-native";
import { startAgent } from "../components/agent";
import {  useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import DrawerButton from "../components/buttons/DrawerButton";
import { RenderMessage } from "../components/app/RenderMessage";
import { allMemoryFromDB } from "../src/db/client";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export function Chat() {
    const [prompt, setPrompt] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<ScrollView>(null);
    const { backgroundColor, setBackgroundColor } = useTheme();

    useEffect(() => {
        const initializeChat = async () => {
            const dbMessages = await allMemoryFromDB();
            setMessages(dbMessages.filter((msg) => msg.role !== "tool").map((msg) => ({ role: msg.role as "user" | "assistant", content: msg.content })));
        };

        initializeChat();
    }, []);
   

    // agentFeatures.sendCoolNotification("Agent Module Loaded", "The agent is ready to receive commands.");
    const mutation = useMutation({
        mutationFn: (message: string) => startAgent(message, setBackgroundColor),
        onSuccess: (data) => {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data ?? "..." },
            ]);

           
        },
    });

    function handleSend() {
        if (!prompt.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: prompt }]);
        mutation.mutate(prompt);
        setPrompt("");
    }

    return (
        <KeyboardAvoidingView
            style={{
                backgroundColor: backgroundColor,
            }}
            className="flex-1 "
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            {/* Header */}
            <View className="flex-row items-center border-b border-gray-700 bg-[#161b22] px-4 py-3 ">
                <DrawerButton />
                <View className="flex-1 items-center">
                    <Text className="text-base font-semibold text-white">Chat</Text>
                    {/* <Text className="text-xs text-green-400">
                        {mutation.status === "pending" ? "typing..." : "online"}
                    </Text> */}
                </View>
                <View style={{ width: 24 }} />
            </View>

            {/* Messages */}
            <ScrollView
                ref={scrollRef}
                className="flex-1 px-3 py-2"
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map((msg, i) => (
                    <RenderMessage key={i} msg={msg} />
                ))}
                {mutation.status === "pending" && (
                    <View className="my-1 self-start rounded-2xl rounded-bl-sm bg-[#21262d] px-4 py-2">
                        <Text className="text-gray-400">●●●</Text>
                    </View>
                )}
                <View
                    style={{ paddingBottom: 100 }}

                ></View>

            </ScrollView>

            {/* Input Bar */}
            <View className="flex-row items-end border-t border-gray-700 bg-[#161b22] px-3 py-2">
                <TextInput
                    className="mr-2 flex-1 rounded-2xl bg-[#21262d] px-4 py-2 text-white"
                    placeholder="Message..."
                    placeholderTextColor="#6b7280"
                    value={prompt}
                    onChangeText={setPrompt}
                    onSubmitEditing={handleSend}
                    multiline
                />
                <TouchableOpacity
                    className="h-10 w-10 items-center justify-center rounded-full bg-blue-600"
                    onPress={handleSend}
                    disabled={mutation.status === "pending"}
                >
                    <Text className="text-white">↑</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}