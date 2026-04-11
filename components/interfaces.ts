

export interface UsageStats{
    appName: string;
    packageName: string;
    icon: string;
    totalTime: number;
    limit: number;
}

export interface UsageLimit {
    packageName: string;
    limit: number;
}