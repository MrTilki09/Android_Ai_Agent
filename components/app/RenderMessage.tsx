import { Text, View } from "react-native";


export default function RenderMessage(msg: any, i: number) {
 const colorMatch = msg.content.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}\b|(?:red|blue|green|yellow|orange|purple|pink|brown|black|white|gray|grey|cyan|magenta|lime|indigo|violet|navy|teal|olive|maroon|aqua|fuchsia|silver|gold)\b/i);
                    const detectedColor = colorMatch ? colorMatch[0] : null;


    return (
        <View
            key={i}
            className={`my-1 max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user"
                ? "self-end rounded-br-sm bg-blue-600"
                : "self-start rounded-bl-sm bg-[#21262d]"
                }`}
        >
            <Text className={msg.role === "user" ? "text-white" : "text-gray-200"}>
                {msg.content}
            </Text>
            {detectedColor && (
                <View className="flex-row items-center mt-2 pt-2 border-t border-gray-600">
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: detectedColor,
                            borderRadius: 6,
                            marginRight: 8,
                            borderWidth: 1,
                            borderColor: '#444'
                        }}
                    />
                    <Text className="text-xs text-gray-400">{detectedColor}</Text>
                </View>
            )}
        </View>
    )
}