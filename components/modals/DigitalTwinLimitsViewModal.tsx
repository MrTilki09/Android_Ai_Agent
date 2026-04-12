import { useEffect, useState } from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    withSpring, 
    runOnJS 
} from "react-native-reanimated";
import { GetDigitalTwinLimitRules } from "../userFunctions";
import { UsageLimit } from "../interfaces";

export default function DigitalTwinLimitsViewModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    const [currentRules, setCurrentRules] = useState<UsageLimit[]>([]);
    
    // Local state to keep the Modal mounted while the exit animation plays
    const [isRendered, setIsRendered] = useState(false);

    // Reanimated Shared Values
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);
    const translateY = useSharedValue(20);

    // Handle Data Fetching
    useEffect(() => {
        if (visible) {
            const fetch = async () => {
                const rules = await GetDigitalTwinLimitRules();
                setCurrentRules(rules);
            }
            fetch();
        }
    }, [visible]);

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
                            <Text className="text-lg font-bold text-gray-800">Digital Twin Limits</Text>
                        </View>

                        {/* List */}
                        <ScrollView className="max-h-72">
                            {currentRules.length > 0 ? (
                                currentRules.map((rule, index) => (
                                    <View key={index} className={`px-5 py-3 flex-row items-center justify-between ${index !== currentRules.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                        <Text className="text-sm font-medium text-gray-700 flex-1">
                                            {rule.packageName.split('.').pop() || rule.packageName}
                                        </Text>
                                        <View className="bg-blue-50 rounded px-2 py-1">
                                            <Text className="text-xs font-semibold text-blue-600">{rule.limit}m</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View className="px-5 py-8 items-center">
                                    <Text className="text-sm text-gray-500">No limits set</Text>
                                </View>
                            )}
                        </ScrollView>

                        {/* Footer */}
                        <View className="border-t border-gray-200 px-5 py-3">
                            <TouchableOpacity onPress={onClose} className="bg-blue-500 rounded-lg py-2 items-center">
                                <Text className="text-white text-sm font-semibold">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Animated.View>
        </Modal>
    );
}