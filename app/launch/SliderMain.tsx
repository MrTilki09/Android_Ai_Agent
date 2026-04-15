
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import One from "./pages/One";
import Two from "./pages/Two";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export const SliderMain = () => {

    const storage = createAsyncStorage("appDB");
    const [page, setPage] = useState(1);
    const numberOfPages = 2;
    const navigation = useNavigation();

    async function handleFinish() {

        await storage.setItem("first_launch", "true");
        navigation.navigate("Home");

    }



    return (
        <View className="flex-1 bg-black">
            {/* Your main app content goes here */}
            <View className="flex-1">
                {
                    page === 0 ? <One key={1} /> : <Two key={2} />
                }
            </View>

            <View className="absolute bottom-10 w-full items-between mb-8">
                {page > 0 && (
                    <TouchableOpacity
                        className="bg-blue-500 px-6 py-3 rounded-full absolute left-5"
                        onPress={() => setPage((prev) => prev - 1)}
                    >
                        <Text className="text-white text-lg font-semibold">Prev</Text>
                    </TouchableOpacity>
                )}
                {
                    page < numberOfPages - 1 ? (
                        <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-full absolute right-5" onPress={() => setPage((prev) => (prev + 1))} disabled={page === 1}>
                            <Text className="text-white text-lg font-semibold">Next</Text>
                        </TouchableOpacity>
                    )
                        :
                        (
                            <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-full absolute right-5" onPress={handleFinish} >
                                <Text className="text-white text-lg font-semibold">Done</Text>
                            </TouchableOpacity>
                        )
                }

            </View>

        </View>
    );
}