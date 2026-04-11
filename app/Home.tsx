import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import DrawerButton from "../components/buttons/DrawerButton";

export function Home() {
    const { backgroundColor } = useTheme();
    const navigation = useNavigation();
    
    return (
        <>
            <View style={{ flex: 1, backgroundColor, justifyContent: "center", alignItems: "center" }}>
                <View className="flex-row items-start justify-start self-start ml-4 mt-16">
                    <DrawerButton />
                </View>
                <View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text className="text-2xl text-white">Welcome to the AI Agent App!</Text>
                        <Text className="mt-4 text-gray-400">Go to the Chat to Start</Text>
                        <TouchableOpacity className="mt-12 bg-gray-400 px-16 py-4 rounded-3xl" onPress={() => navigation.navigate("Chat")}>
                            <Text className="text-lg text-white">Go to Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}