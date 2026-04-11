import { useEffect, useState } from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { GetDigitalTwinLimitRules } from "../userFunctions";
import { UsageLimit } from "../interfaces";


export default function DigitalTwinLimitsViewModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {

    const [currentRules, setCurrentRules] = useState<UsageLimit[]>([]);

    useEffect(() => {
        if (visible) {
            const fetch = async () => {
                const rules = await GetDigitalTwinLimitRules();
                setCurrentRules(rules);
                console.log("Rules set in Settings screen:", rules);
            }
            fetch();
        }
    }, [visible]);


    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={{ flex: 1 }} className="bg-black bg-opacity-25">
                <View className="flex-1 items-center justify-center px-6" pointerEvents="box-none">
                    <View className="w-full max-w-sm bg-white rounded-xl shadow-lg" pointerEvents="auto">
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
                    </View>
                </View>
            </View>
        </Modal>
    );
}