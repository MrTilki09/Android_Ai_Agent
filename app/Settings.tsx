import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Pressable } from "react-native";
import DrawerButton from "../components/buttons/DrawerButton";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { DigitalTwinLimitRules, GetDigitalTwinLimitRules } from "../components/userFunctions";
import DigitalTwinLimitsViewModal from "../components/modals/DigitalTwinLimitsViewModal";

export default function Settings() {
    const { backgroundColor } = useTheme();

   const [showLimitsModal, setShowLimitsModal] = useState(false);


    return (
        <View style={{ flex: 1, backgroundColor }}>

            <>
                <DigitalTwinLimitsViewModal visible={showLimitsModal} onClose={() => setShowLimitsModal(false)} />
            </>

            <View className="flex-row items-start justify-start self-start ml-4 mt-6">
                <DrawerButton />
            </View>


                    {/* Main Page */}
            <View>
                <Text className="text-2xl text-white text-center mt-4">Settings</Text>
            </View>

                {/* Body  */}
            <View>
                <Pressable className="mt-12 bg-gray-400 px-16 py-4 rounded-3xl self-center" onPress={() => setShowLimitsModal(true)}>
                    <Text className="text-lg text-white">Digital Twin Limits</Text>
                </Pressable>
            </View>
        </View>
    );
}