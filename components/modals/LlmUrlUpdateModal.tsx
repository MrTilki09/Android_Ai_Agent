import { use, useEffect, useRef, useState } from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    runOnJS
} from "react-native-reanimated";
import { getCurrentUsageLimits, GetDigitalTwinLimitRules } from "../userFunctions";
import { UsageLimit } from "../interfaces";
import { TextInput } from "react-native-gesture-handler";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";

export default function LlmUrlUpdateModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {

    // Local state to keep the Modal mounted while the exit animation plays
    const [llmUrl, setLlmUrl] = useState('');
    const [isRendered, setIsRendered] = useState(false);
    // Reanimated Shared Values
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);
    const translateY = useSharedValue(20);
    const storage = createAsyncStorage('appDB');

    const handleSubmit = () => {
        storage.setItem('llmUrl', llmUrl);
        onClose(); // Close the modal after submission
    };

    useEffect(() => {

        storage.getItem('llmUrl').then((url) => {
            if (url) {
                setLlmUrl(url);
            }
        });

    }, []);


    // Handle Animations
    useEffect(() => {
        if (visible) {
            setIsRendered(true);
            // Entrance animations
            opacity.value = withTiming(1, { duration: 200 });
            scale.value = withSpring(1, { damping: 20, stiffness: 200 });
            translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
        } else {
            // Exit animations
            opacity.value = withTiming(0, { duration: 200 });
            scale.value = withTiming(0.9, { duration: 200 });
            translateY.value = withTiming(20, { duration: 200 }, () => {
                // Unmount the modal ONLY after the exit animation finishes
                runOnJS(setIsRendered)(false);
            });
        }
    }, [visible]);

    // Animated Styles
    const backdropStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const modalStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { scale: scale.value },
            { translateY: translateY.value }
        ],
    }));

    // If it's not visible and the exit animation is done, render nothing.
    if (!isRendered) return null;

    return (
        <Modal
            animationType="none" // Turn off default janky animations
            transparent={true}
            visible={isRendered}
            onRequestClose={onClose}
        >
            {/* Animated Backdrop */}
            <Animated.View style={[{ flex: 1 }, backdropStyle]}>
                <Pressable
                    className="absolute inset-0 bg-black bg-opacity-40"
                    onPress={onClose}
                />

                <View className="flex-1 items-center justify-center px-6" pointerEvents="box-none">

                    {/* Animated Modal Content */}
                    <Animated.View
                        className="w-full max-w-sm bg-white rounded-xl shadow-lg"
                        pointerEvents="auto"
                        style={modalStyle}
                    >
                        {/* Header */}
                        <View className="px-5 py-4 border-b border-gray-200">
                            <Text className="text-lg font-bold text-gray-800">Update LLM URL</Text>
                        </View>

                        {/* List */}
                        <ScrollView className="max-h-72">
                            <Text className="text-gray-600 text-sm m-2">Enter the new URL for your LM Studio instance:</Text>
                            <TextInput value={llmUrl} onChangeText={setLlmUrl} placeholder="Enter new LM Studio URL" className="border border-gray-300 rounded-lg px-4 py-2 m-4" />
                            <Text className="text-gray-600 text-xs mb-2 text-center">Updating this will override the default behavior</Text>
                        
                        </ScrollView>

                        {/* Footer */}
                                               <View className="border-t border-gray-200 px-5 py-3 flex-row gap-3">
                            <TouchableOpacity onPress={onClose} className="flex-1 bg-gray-300 rounded-lg py-2 items-center">
                                <Text className="text-gray-800 text-sm font-semibold">Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} className="flex-1 bg-blue-500 rounded-lg py-2 items-center">
                                <Text className="text-white text-sm font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Animated.View>
        </Modal>
    );
}