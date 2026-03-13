package com.agenttest83

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

import com.agenttest83.agentfeatures.agentFeaturesModule
import com.agenttest83.sms.smsModule
import com.agenttest83.contacts.contactsModule
import com.agenttest83.TwinModule
import com.agenttest83.digitaltwin.UsageStats

class CustomModules : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {

        val modules: MutableList<NativeModule> = ArrayList()

        modules.add(agentFeaturesModule(reactContext))
        modules.add(smsModule(reactContext))
        modules.add(contactsModule(reactContext))
        modules.add(TwinModule(reactContext))
        modules.add(UsageStats(reactContext))
        return modules
    }
}