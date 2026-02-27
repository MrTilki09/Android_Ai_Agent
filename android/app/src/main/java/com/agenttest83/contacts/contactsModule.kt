package com.agenttest83.contacts

import android.annotation.SuppressLint
import android.provider.ContactsContract
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments

class contactsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "contactsModule"

    // @ReactMethod exposes this function to your JavaScript code
    @SuppressLint("Range")
    @ReactMethod
    fun getContacts(searchQuery: String?, promise: Promise) {
        // We use WritableArray to send arrays back over the React Native bridge
        val contactsArray = Arguments.createArray()

        // 1. Verify the user has granted permission
        if (ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.READ_CONTACTS)
            != PackageManager.PERMISSION_GRANTED) {
            // Reject the promise if we don't have permission
            promise.reject("PERMISSION_DENIED", "Contacts permission was not granted")
            return
        }

        // 2. Define what data we want to retrieve
        val uri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI
        val projection = arrayOf(
            ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME,
            ContactsContract.CommonDataKinds.Phone.NUMBER
        )

        // 3. Set up the search filter
        // If searchQuery is null or empty, these stay null, returning ALL contacts.
        var selection: String? = null
        var selectionArgs: Array<String>? = null

        if (!searchQuery.isNullOrBlank()) {
            // SQL LIKE statement to find partial name matches
            selection = "${ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME} LIKE ?"
            selectionArgs = arrayOf("%$searchQuery%")
        }

        try {
            // 4. Query the ContentResolver
            val cursor = reactApplicationContext.contentResolver.query(uri, projection, selection, selectionArgs, null)

            // 5. Parse the results
            cursor?.use {
                while (it.moveToNext()) {
                    val name = it.getString(it.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME)) ?: "Unknown"
                    val number = it.getString(it.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER)) ?: ""

                    val cleanNumber = number.replace(Regex("[\\s-]"), "")

                    // Map the data to a WritableMap (React Native's version of a JS Object)
                    val contactMap = Arguments.createMap()
                    contactMap.putString("name", name)
                    contactMap.putString("phoneNumber", cleanNumber)

                    contactsArray.pushMap(contactMap)
                }
            }

            // Send the array back to JavaScript
            promise.resolve(contactsArray)

        } catch (e: Exception) {
            promise.reject("QUERY_ERROR", "Failed to get contacts", e)
        }
    }
}