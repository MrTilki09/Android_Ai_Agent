import { PermissionsAndroid } from "react-native";
import { NativeModules } from "react-native";

export async function CheckUsageStatsPermission() {
    // Call your custom Kotlin check instead of PermissionsAndroid
    return await NativeModules.UsageStats.hasUsagePermission();
}