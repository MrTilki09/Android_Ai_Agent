package com.agenttest83.digitaltwin

import android.app.usage.UsageStatsManager // Import the system manager
import android.content.Context
import com.facebook.react.bridge.*
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.util.Base64
import java.io.ByteArrayOutputStream
// Rename to UsageStats to avoid conflicts
class UsageStats(val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName() = "UsageStats"


    @ReactMethod
    fun getAllUsageStats(startTime: Double, endTime: Double, promise: Promise) {
        val usageManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val packageManager = context.packageManager

        try {
            val stats = usageManager.queryAndAggregateUsageStats(startTime.toLong(), endTime.toLong())
            val results = Arguments.createArray() // Using Array for a more structured list

            if (stats != null && stats.isNotEmpty()) {
                for (entry in stats.entries) {
                    val usage = entry.value
                    val totalTime = usage.totalTimeInForeground

                    if (totalTime > 0) {
                        val appInfo = Arguments.createMap()
                        val packageName = entry.key

                        appInfo.putString("packageName", packageName)
                        appInfo.putDouble("totalTime", totalTime.toDouble())

                        // Fetch the App Icon and convert to Base64
                        try {
                            val icon = packageManager.getApplicationIcon(packageName)
                            val bitmap = drawableToBitmap(icon)
                            val base64Icon = bitmapToBase64(bitmap)
                            appInfo.putString("icon", "data:image/png;base64,$base64Icon")

                            // Also useful for the user's "Actual Self" reflection:
                            val appName = packageManager.getApplicationLabel(
                                packageManager.getApplicationInfo(packageName, 0)
                            ).toString()
                            appInfo.putString("appName", appName)

                        } catch (e: Exception) {
                            appInfo.putString("icon", "") // Fallback if icon fetch fails
                        }

                        results.pushMap(appInfo)
                    }
                }
                promise.resolve(results)
            } else {
                promise.resolve(Arguments.createArray())
            }
        } catch (e: Exception) {
            promise.reject("ERROR_USAGE_STATS", e.message)
        }
    }


    @ReactMethod
    fun hasUsagePermission(promise: Promise) {
        val appOps = context.getSystemService(Context.APP_OPS_SERVICE) as android.app.AppOpsManager
        val mode = appOps.checkOpNoThrow(
            android.app.AppOpsManager.OPSTR_GET_USAGE_STATS,
            android.os.Process.myUid(),
            context.packageName
        )
        promise.resolve(mode == android.app.AppOpsManager.MODE_ALLOWED)
    }

    // Helper: Convert Drawable to Bitmap
    private fun drawableToBitmap(drawable: android.graphics.drawable.Drawable): Bitmap {
        if (drawable is BitmapDrawable) return drawable.bitmap
        val bitmap = Bitmap.createBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }

    // Helper: Convert Bitmap to Base64 String
    private fun bitmapToBase64(bitmap: Bitmap): String {
        val byteArrayOutputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }
}