package com.agenttest83 // Use your actual package name

import com.facebook.react.bridge.*
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.view.accessibility.AccessibilityManager
import android.accessibilityservice.AccessibilityServiceInfo

class TwinModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // This is the name you will use to import it in React Native
    override fun getName() = "TwinAgent"

    @ReactMethod
    fun setAppLimits(limits: ReadableMap) {
        val newLimits = mutableMapOf<String, Long>()
        val iterator = limits.keySetIterator()

        while (iterator.hasNextKey()) {
            val packageName = iterator.nextKey()
            // We pass minutes from JS, but Android calculates in milliseconds
            val limitInMinutes = limits.getInt(packageName)
            newLimits[packageName] = limitInMinutes * 60 * 1000L
        }

        // Save it to the static variable in our AccessibilityService
        DigitalTwinService.appLimits = newLimits
    }

    @ReactMethod
    fun getAppLimits(promise: Promise) {
        try {
            val currentLimits = Arguments.createMap()
            val staticLimits = DigitalTwinService.appLimits

            for ((packageName, limitInMillis) in staticLimits) {
                // Convert milliseconds back to minutes for JS
                val minutes = (limitInMillis / (60 * 1000)).toInt()
                currentLimits.putInt(packageName, minutes)
            }

            promise.resolve(currentLimits)
        } catch (e: Exception) {
            promise.reject("ERROR_GETTING_LIMITS", e.message)
        }
    }

    @ReactMethod
    fun isAccessibilityServiceEnabled(promise: Promise) {
        try {
            val context = reactApplicationContext
            val am = context.getSystemService(Context.ACCESSIBILITY_SERVICE) as AccessibilityManager

            // Get list of currently enabled services
            val enabledServices = am.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.FEEDBACK_ALL_MASK)

            // Check if any enabled service matches your component name
            val isServiceEnabled = enabledServices.any {
                it.resolveInfo.serviceInfo.packageName == context.packageName &&
                        it.resolveInfo.serviceInfo.name == "com.agenttest83.DigitalTwinService"
            }

            promise.resolve(isServiceEnabled)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to check accessibility service", e)
        }
    }

    @ReactMethod
    fun openAccessibilitySettings() {
        try {
            val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            reactApplicationContext.startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}