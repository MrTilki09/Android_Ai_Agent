import { useEffect } from "react";
import { Text } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";




export default function Two() {


  const translateY = useSharedValue(20);
    const opacity = useSharedValue(0);
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 200 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });

    }, []);

    // Animated Styles
        const textStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        }));


    return (
        <Animated.View className="absolute inset-0 items-center justify-end pb-64" style={textStyle}>
            <Text className="text-white text-2xl font-bold">Welcssssome</Text>
            <Text className="text-white text-2xl font-bold">to the App !!!!</Text>
            <Text className="text-white text-sm font-bold mt-2">Make sure to explore all the features!</Text>
        </Animated.View>
    );
}