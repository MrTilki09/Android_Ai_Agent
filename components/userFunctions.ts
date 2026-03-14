import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";


export const FetchUsageStats = async () => {

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Current time
    const endOfSearch = now.getTime();
    var result = await NativeModules.UsageStats.getAllUsageStats(startOfDay, endOfSearch);
    return result;
}


export function formatUsageTime(milliseconds: number): string {
    if (!Number.isFinite(milliseconds) || milliseconds <= 0) {
        return "0m";
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }

    if (minutes > 0) {
        return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    }

    return `${seconds}s`;
}

export async function DigitalTwinLimitRules() {
    const twinRules = {
        "com.facebook.katana": 30,
        "com.instagram.android": 20,
        "com.snapchat.android": 10,
        "com.reddit.frontpage": 25,
        "com.twitter.android": 15
    };

    const storage = await createAsyncStorage("appDB");
    await storage.setItem("twinRules", JSON.stringify(twinRules));

    return twinRules;
}