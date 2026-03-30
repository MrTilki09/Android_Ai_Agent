package com.agenttest83.agentfeatures

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.app.AlarmManager
import android.app.PendingIntent
import com.facebook.react.bridge.Promise
import android.content.Intent
import android.net.Uri
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Toast
// If you use the URI fallback (recommended)
import java.net.URLEncoder


class agentFeaturesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        android.util.Log.d("AgentFeatures", "agentFeaturesModule initialized!")
    }

    override fun getName() = "agentFeatures"




//    @ReactMethod
//    fun sendWhatsAppAutomation(phoneNumber: String, message: String) {
//        val context = reactApplicationContext
//        try {
//            val url = "https://api.whatsapp.com/send?phone=$phoneNumber&text=${Uri.encode(message + " [DT]")}"
//            val intent = Intent(Intent.ACTION_VIEW).apply {
//                data = Uri.parse(url)
//                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) // Required for non-activity context
//                addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP) // Forces the app to front
//            }
//
//            // Final check before launch
//            if (intent.resolveActivity(context.packageManager) != null) {
//                context.startActivity(intent)
//            } else {
//                // If the app check fails, launch via Browser as last resort
//                val webIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
//                webIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
//                context.startActivity(webIntent)
//            }
//        } catch (e: Exception) {
//            android.util.Log.e("AgentFeatures", "CRASH: ${e.message}")
//        }
//    }

    @ReactMethod
    fun openTwitterComposer(message: String) {
        try {
            // We use ACTION_VIEW with a twitter:// URI scheme.
            // This is often more reliable for opening the app's internal composer directly.
            val tweetUrl = "twitter://post?message=${Uri.encode(message)}"
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(tweetUrl))

            // This flag is MANDATORY when starting an activity from a non-activity context
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

            // Check if the X app can handle this specific URI
            if (intent.resolveActivity(reactApplicationContext.packageManager) != null) {
                reactApplicationContext.startActivity(intent)
            } else {
                // Fallback to the web-based intent if the app isn't found or fails
                val webUrl = "https://twitter.com/intent/tweet?text=${Uri.encode(message)}"
                val webIntent = Intent(Intent.ACTION_VIEW, Uri.parse(webUrl))
                webIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(webIntent)
            }
        } catch (e: Exception) {
            android.util.Log.e("AgentFeatures", "Twitter failed: ${e.message}")
        }
    }


    @ReactMethod
    fun openYouTube(promise: Promise) {
        try {
            val intent = reactApplicationContext.packageManager.getLaunchIntentForPackage("com.google.android.youtube")
            if (intent != null) {
                intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(intent)
                promise.resolve("YouTube Launched Successfully")
            } else {
                promise.reject("ERROR", "YouTube is not installed.")
            }
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }

    @ReactMethod
    fun scheduleNotification(title: String, message: String, delayInSeconds: Double) {
        val context = reactApplicationContext
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

        val intent = Intent(context, NotificationReceiver::class.java).apply {
            putExtra("title", title)
            putExtra("message", message)
        }

        val pendingIntent = PendingIntent.getBroadcast(
            context, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val triggerTime = System.currentTimeMillis() + (delayInSeconds * 1000).toLong()
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerTime, pendingIntent)
    }


    @ReactMethod
    fun sendCoolNotification(title: String, message: String) {
        val context = reactApplicationContext
        val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel("COOL_CHANNEL", "Cool Notifications", NotificationManager.IMPORTANCE_HIGH)
            notificationManager.createNotificationChannel(channel)
        }

        val notification = NotificationCompat.Builder(context, "COOL_CHANNEL")
            .setContentTitle(title)
            .setContentText(message)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .build()

        notificationManager.notify(1, notification)
    }
}