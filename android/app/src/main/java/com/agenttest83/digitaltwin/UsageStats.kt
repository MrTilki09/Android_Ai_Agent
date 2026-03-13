package com.agenttest83.digitaltwin

import android.app.usage.UsageStatsManager // Import the system manager
import android.content.Context
import com.facebook.react.bridge.*

// Rename to UsageStats to avoid conflicts
class UsageStats(val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName() = "UsageStats"

    @ReactMethod
    fun getAllUsageStats(startTime: Double, endTime: Double, promise: Promise) {
        // Explicitly use the Android system UsageStatsManager
        val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

        try {
            val stats = usageStatsManager.queryAndAggregateUsageStats(startTime.toLong(), endTime.toLong())
            val results = Arguments.createMap()

            if (stats != null && stats.isNotEmpty()) {
                for (entry in stats.entries) {
                    val usage = entry.value
                    val totalTime = usage.totalTimeInForeground

                    if (totalTime > 0) {
                        results.putDouble(entry.key, totalTime.toDouble())
                    }
                }
                promise.resolve(results)
            } else {
                promise.resolve(Arguments.createMap())
            }
        } catch (e: Exception) {
            promise.reject("ERROR_USAGE_STATS", e.message)
        }
    }
}