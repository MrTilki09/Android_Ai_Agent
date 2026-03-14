import { useMutation } from "@tanstack/react-query";
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, PermissionsAndroid } from "react-native";
import { startAgent } from "../components/agent";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { NativeModules } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import DrawerButton from "../components/buttons/DrawerButton";
import { RenderMessage } from "../components/app/RenderMessage";
import { DigitalTwinLimitRules } from "../components/userFunctions";
// const { agentFeatures } = NativeModules;  // matches getName() return value

type Message = {
    role: "user" | "assistant";
    content: string;
};

export function Home() {
    const [prompt, setPrompt] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<ScrollView>(null);
    const { backgroundColor, setBackgroundColor } = useTheme();
    const navigation = useNavigation<DrawerNavigationProp<any>>();


   

    useEffect(() => {

        // NativeModules.agentFeatures.openYouTube();
       DigitalTwinLimitRules();

        // Send the rules to the Kotlin background service
        PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            'android.permission.INTERNET' as any,
            'android.permission.SCHEDULE_EXACT_ALARM' as any,
            'android.permission.USE_EXACT_ALARM' as any,
            'android.permission.READ_CONTACTS' as any,
        ])
            .then((results) => {
                const allGranted = Object.values(results).every(
                    (result) => result === PermissionsAndroid.RESULTS.GRANTED
                );
                if (allGranted) {
                    const { agentFeatures } = NativeModules;
                    console.log('module:', agentFeatures);
                    agentFeatures.scheduleNotification("Scheduled!", "This was delayed", 10);
                    console.log(JSON.stringify(NativeModules.agentFeatures));
                } else {
                    console.log("Some permissions denied:", results);
                }
            })
            .catch((error) => {
                console.error("Error requesting permissions:", error);
            });
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
            <View className="flex-row items-center border-b border-gray-700 bg-[#161b22] px-4 py-3 pt-10">
                <DrawerButton />
                <View className="flex-1 items-center">
                    <Text className="text-base font-semibold text-white">AI Agent</Text>
                    <Text className="text-xs text-green-400">
                        {mutation.status === "pending" ? "typing..." : "online"}
                    </Text>
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