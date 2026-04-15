import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Pressable } from "react-native";
import DrawerButton from "../components/buttons/DrawerButton";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { DigitalTwinLimitRules, GetDigitalTwinLimitRules } from "../components/userFunctions";
import DigitalTwinLimitsViewModal from "../components/modals/DigitalTwinLimitsViewModal";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function Settings() {
    const { backgroundColor } = useTheme();

    const [showLimitsModal, setShowLimitsModal] = useState(false);
    const translateY = useSharedValue(100);
    const opacity = useSharedValue(0);

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 300 });
        opacity.value = withTiming(1, { duration: 300 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));




    return (
        <View style={{ flex: 1, backgroundColor }}>

            <>
                <DigitalTwinLimitsViewModal visible={showLimitsModal} onClose={() => setShowLimitsModal(false)} />
            </>

            <View className="flex-row items-start justify-start self-start ml-4 mt-6">
                <DrawerButton />
            </View>

            <View className="mt-4 mb-4 bg-gray-400 h-1" />

            {/* Main Page */}
            <View>
                <Text className="text-2xl text-white text-center mt-4">Settings</Text>
            </View>

            
            {/* Body  */}
            <Animated.View className="mt-4" style={animatedStyle}>
                <TouchableOpacity className="mt-12   w-full py-4 rounded-lg border-y border-white self-center" onPress={() => setShowLimitsModal(true)}>
                    <Text className="text-lg text-white text-center">Digital Twin Limits</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}