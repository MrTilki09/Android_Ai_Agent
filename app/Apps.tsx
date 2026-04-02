import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { FetchUsageStats, formatUsageTime } from "../components/userFunctions";
import { UsageStats } from "../components/interfaces";
import DrawerButton from "../components/buttons/DrawerButton";
import { CheckUsageStatsPermission } from "../components/RequestPermissions";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";





export function Apps() {
    const [apps, setApps] = useState<UsageStats[]>([]);

    useEffect(() => {
        const fetchApps = async () => {
            CheckUsageStatsPermission().then((hasPermission) => {
                if (!hasPermission) {
                    console.log("Usage stats permission not granted");
                } else {
                    console.log("Usage stats permission granted");
                    return;
                }
            });
            const appData = await FetchUsageStats();


            const storage = await createAsyncStorage("appDB");
            const existingRules = await storage.getItem("twinRules").then((rules) => {
                return rules ? JSON.parse(rules) : {};
            });
            console.log("Existing Twin Rules from Storage:", existingRules);

            const enrichedApps = appData.map((item: UsageStats) => ({
                ...item,
                limit: existingRules[item.packageName] || 0
            }));
            console.log('app data ', enrichedApps);

            setApps(enrichedApps);
        };
        fetchApps();
    }, [])



    return (
        <ScrollView className="flex-1 bg-slate-100">
            <View className="gap-3 p-4">
                <View className="flex-row items-center px-4">
                    <DrawerButton color="black" />
                </View>

                {apps.length === 0 ? (

                    <View className="flex-1 items-center justify-center mt-16">
                        <Text className="text-base font-medium text-gray-500">You need to enable Usage Stats</Text>
                        <Text className="text-base font-medium text-gray-500"> Permission on your Device.</Text>
                        <Text className="text-sm text-gray-400">Go to Settings &gt; Apps &gt; Special App Access &gt; Usage Access</Text>

                        <Text className="text-base font-medium text-gray-500 mt-8">Until you enable it</Text>
                        <Text className="text-base font-medium text-gray-500 "> no usage data can be displayed.</Text>

                    </View>

                ) : (
                    <>
                        <View className="flex-row items-center gap-3 px-4 py-2">
                            <View className="w-[42px]" />
                            <Text className="flex-1 text-sm font-semibold text-slate-600">
                                App
                            </Text>
                            <Text className="flex-1 text-sm font-semibold text-slate-600">
                                Limit
                            </Text>
                            <Text className="ml-2 text-sm font-semibold text-slate-600">
                                Usage
                            </Text>
                        </View>
                        {apps.map((app: UsageStats, index) => (
                            <View
                                key={`${app.packageName}-${index}`}
                                className="flex-row items-center rounded-xl border border-slate-200 bg-white p-3 gap-3"
                            >
                                {app.icon ? (
                                    <Image
                                        source={{ uri: app.icon }}
                                        className="h-[42px] w-[42px] rounded-[10px]"
                                    />
                                ) : (
                                    <View className="h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-blue-100">
                                        <Text className="text-base font-bold text-blue-700">
                                            {(app.appName || "?").charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                )}
                                <Text className="flex-1 text-base font-medium text-slate-900" numberOfLines={1}>
                                    {app.appName || "Unknown App"}
                                </Text>
                                <Text className="flex-1 text-base font-medium text-slate-900" numberOfLines={1}>
                                    {app.limit.toString() || "Unknown Limit"}
                                </Text>
                                <Text className="ml-2 text-sm text-slate-500">
                                    {formatUsageTime(app.totalTime)}
                                </Text>
                            </View>
                        ))}
                    </>
                )}
            </View>
        </ScrollView>
    )

}
