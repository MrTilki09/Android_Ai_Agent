import { Alert, NativeModules, PermissionsAndroid, Platform } from "react-native";

export async function CheckUsageStatsPermission() {
    // Call your custom Kotlin check instead of PermissionsAndroid
    return await NativeModules.UsageStats.hasUsagePermission();
}


export async function RequestPermissions() {

    PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        'android.permission.SYSTEM_ALERT_WINDOW' as any,
        'android.permission.INTERNET' as any,
        'android.permission.SCHEDULE_EXACT_ALARM' as any,
        'android.permission.USE_EXACT_ALARM' as any,
        'android.permission.READ_CONTACTS' as any,
    ])
        .then((results) => {
            const allGranted = Object.values(results).every(
                (result) => result === PermissionsAndroid.RESULTS.GRANTED
            );
            if (allGranted) {
                const { agentFeatures } = NativeModules;
                console.log('module:', agentFeatures);
                agentFeatures.scheduleNotification("Scheduled!", "This was delayed", 10);
                console.log(JSON.stringify(NativeModules.agentFeatures));
            } else {
                console.log("Some permissions denied:", results);
            }
        })
        .catch((error) => {
            console.error("Error requesting permissions:", error);
        });
}


export async function CheckAndRequestUsageStatsPermission() {
    const hasPermission = await CheckUsageStatsPermission();
    if (!hasPermission) {
        await RequestPermissions();
    }
}

export async function handleRequiredPermissionsLaunch (){
    await RequestPermissions();
    await CheckAssessibilityPermission();
    await CheckAndRequestUsageStatsPermission();
}


export async function CheckAssessibilityPermission(): Promise<boolean> {
    try {
        const isEnabled = await NativeModules.TwinAgent.isAccessibilityServiceEnabled();
        console.log("Accessibility Service Enabled:", isEnabled);
        if (isEnabled) {
            return true;
        }
        if (Platform.OS === "android") {
            return new Promise((resolve) => {
                Alert.alert(
                    "Enable Accessibility Service",
                    "The Digital Twin service needs accessibility permissions to monitor app usage. Please enable it in Settings.",
                    [
                        {
                            text: "Cancel",
                            onPress: () => {
                                console.log("User declined");
                                resolve(false);
                            },
                            style: "cancel",
                        },
                        {
                            text: "Open Settings",
                            onPress: () => {
                                NativeModules.TwinAgent.openAccessibilitySettings();
                                resolve(true);
                            },
                        },
                    ],
                    { cancelable: false }
                );
            });
        }
        return false;
    } catch (error) {
        console.error("Error checking accessibility service:", error);
        return false;
    }

}