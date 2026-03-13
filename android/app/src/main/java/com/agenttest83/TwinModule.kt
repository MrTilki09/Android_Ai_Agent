package com.agenttest83 // Use your actual package name

import com.facebook.react.bridge.*

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
}