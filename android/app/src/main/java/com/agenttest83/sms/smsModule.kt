package com.agenttest83.sms

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.telephony.SmsManager
import android.widget.Toast
import androidx.core.content.ContextCompat

class smsModule (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {


    override fun getName() = "smsModule"


    @ReactMethod
    fun sendDirectSms(phoneNumber: String, message: String) {
        val context = reactApplicationContext
        // 1. Check if the user has granted the SEND_SMS permission
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.SEND_SMS)
            == PackageManager.PERMISSION_GRANTED) {

            try {
                // 2. Get the SmsManager based on the Android version
                val smsManager: SmsManager = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    context.getSystemService(SmsManager::class.java)!!
                } else {
                    @Suppress("DEPRECATION")
                    SmsManager.getDefault()
                }

                // 3. Send the message
                smsManager.sendTextMessage(phoneNumber, null, message, null, null)
                Toast.makeText(context, "SMS Sent successfully!", Toast.LENGTH_SHORT).show()

            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(context, "Failed to send SMS.", Toast.LENGTH_SHORT).show()
            }
        } else {
            // Handle the case where permission is not granted (Request it from the user)
            Toast.makeText(context, "SMS Permission is required.", Toast.LENGTH_SHORT).show()
        }
    }

}
