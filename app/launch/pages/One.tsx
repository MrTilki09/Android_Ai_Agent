import { useEffect } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { images } from "../../../components/uploads/images";




export default function One() {


    const translateY = useSharedValue(20);
    const translateYImage = useSharedValue(20);
    const opacity = useSharedValue(0);
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 200 });
        translateY.value = withSpring(0, { damping: 20, stiffness:200 });
        translateYImage.value = withSpring(0, { damping: 20, stiffness:500 });

    }, []);

    // Animated Styles
    const textStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const imageStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateYImage.value }],
    }));

    return (
        <Animated.View className="absolute inset-0 items-center justify-end pb-48" style={textStyle}>

            <Animated.Image source={images.Ai} style={imageStyle} />

            <View className=" items-center mt-12">
                <Text className="text-white text-2xl font-bold">Welcome</Text>
                <Text className="text-white text-2xl font-bold">to the App !!!!</Text>
                <Text className="text-white text-sm font-bold mt-2">Make sure to explore all the features!</Text>
            </View>
        </Animated.View>
    );
}