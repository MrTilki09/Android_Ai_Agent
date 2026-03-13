package com.agenttest83

import android.accessibilityservice.AccessibilityService
import android.app.usage.UsageStatsManager
import android.content.Context
import android.view.accessibility.AccessibilityEvent
import android.util.Log
import android.widget.Toast
import java.util.Calendar

import android.os.Handler
import android.os.Looper
import android.graphics.Color
import android.graphics.PixelFormat
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.content.Intent
import android.net.Uri

class DigitalTwinService : AccessibilityService() {

    companion object {
        // This is updated live by your React Native bridge
        var appLimits = mapOf<String, Long>()
    }
    private val handler = Handler(Looper.getMainLooper())
    private var activeKickRunnable: Runnable? = null
    private var currentlyMonitoredApp: String? = null



//    private var isOverlayShowing = false
//    private var overlayView: LinearLayout? = null

    private fun showNuclearOverlay(packageName: String) {
        // 1. Create the Deep Link URI targeting your agenttest83 app
        val deepLinkUri = Uri.parse("agenttest83://intervention?app=$packageName")
        val hijackIntent = Intent(Intent.ACTION_VIEW, deepLinkUri)

        // 2. Add aggressive flags to force it to the very front
        hijackIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        hijackIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        hijackIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)

        // 3. Execute the Hijack (This is the line you were missing to make it open!)
        applicationContext.startActivity(hijackIntent)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event == null || event.eventType != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return

        val openedPackageName = event.packageName?.toString() ?: return
        val timeLimitMillis = appLimits[openedPackageName]

        // 1. If they open an app we DO NOT monitor (like the Home Screen or your IDE)
        if (timeLimitMillis == null) {
            // Defuse the bomb if they left Chrome early!
            if (currentlyMonitoredApp != null) cancelTimeBomb()
            return
        }

        // 2. If they open an app we DO monitor (like Chrome)
        val usageToday = getTodayUsage(openedPackageName)

        if (usageToday >= timeLimitMillis) {
            // Instant Nuke (They are already out of time)
            cancelTimeBomb()
            if (android.provider.Settings.canDrawOverlays(this)) {
                showNuclearOverlay(openedPackageName)
            } else {
                performGlobalAction(GLOBAL_ACTION_HOME)
            }
        } else {
            // They have time left! Start the countdown.
            val timeRemainingMillis = timeLimitMillis - usageToday

            val remainingMins = timeRemainingMillis / 60000
            Toast.makeText(applicationContext, "Ideal Twin: You have $remainingMins minutes left.", Toast.LENGTH_SHORT).show()

            startTimeBomb(openedPackageName, timeRemainingMillis)
        }
    }
    private fun startTimeBomb(packageName: String, timeRemainingMillis: Long) {
        cancelTimeBomb() // Clear any old timers just in case

        currentlyMonitoredApp = packageName

        activeKickRunnable = Runnable {
            Log.d("TWIN_AGENT", "TIME BOMB DETONATED for $packageName!")

            // The time is up! Drop the overlay.
            if (android.provider.Settings.canDrawOverlays(this@DigitalTwinService)) {
                showNuclearOverlay(packageName)
            } else {
                performGlobalAction(GLOBAL_ACTION_HOME)
            }
        }

        // Tell the Android OS to run that bomb logic exactly when the time runs out
        handler.postDelayed(activeKickRunnable!!, timeRemainingMillis)
    }

    private fun cancelTimeBomb() {
        activeKickRunnable?.let {
            handler.removeCallbacks(it)
            Log.d("TWIN_AGENT", "Time bomb canceled. User left $currentlyMonitoredApp safely.")
        }
        currentlyMonitoredApp = null
    }
    // Helper function to calculate time spent in an app since midnight
    private fun getTodayUsage(packageName: String): Long {
        val usageStatsManager = getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

        val calendar = Calendar.getInstance()
        val endTime = calendar.timeInMillis
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        val startTime = calendar.timeInMillis

        val stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime)
        for (stat in stats) {
            if (stat.packageName == packageName) {
                return stat.totalTimeInForeground
            }
        }
        return 0L
    }

    override fun onInterrupt() {}
}