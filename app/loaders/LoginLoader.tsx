import { Activity } from "react";
import { View, Text, ActivityIndicator } from "react-native";


export default function LoginLoader() {




    return (
        <View className="flex-1 items-center justify-center bg-black">
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}