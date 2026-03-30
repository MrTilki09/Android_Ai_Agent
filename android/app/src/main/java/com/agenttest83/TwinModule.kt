package com.agenttest83 // Use your actual package name

import com.facebook.react.bridge.*
import android.content.Context
import android.content.Intent
import android.provider.Settings

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
    fun isAccessibilityServiceEnabled(promise: Promise) {
        try {
            val context = reactApplicationContext
            
            // Get the enabled services string
            val enabledServices = Settings.Secure.getString(
                context.contentResolver,
                Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
            ) ?: ""

            // Check if our DigitalTwinService is in the enabled services
            val isServiceEnabled = enabledServices.contains("com.agenttest83/.DigitalTwinService")
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