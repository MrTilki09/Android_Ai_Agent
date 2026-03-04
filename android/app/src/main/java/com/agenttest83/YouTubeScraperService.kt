package com.agenttest83

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.util.Log

class YouTubeScraperService : AccessibilityService() {

    // 1. The Memory Buffer: We store the titles here.
    // A Set automatically prevents duplicates and is incredibly fast to search.
    private val scrapedTitles = mutableSetOf<String>()

    // This fires automatically whenever the YouTube UI changes or scrolls
    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        val rootNode = rootInActiveWindow ?: return

        // Start the recursive extraction
        extractYouTubeText(rootNode)
    }

    private fun extractYouTubeText(node: AccessibilityNodeInfo?) {
        if (node == null) return

        // Grab text and trim any weird hidden whitespace Google might add
        val visibleText = node.text?.toString()?.trim() ?: node.contentDescription?.toString()?.trim()
        val className = node.className?.toString() ?: "Unknown"

        if (!visibleText.isNullOrBlank() && visibleText.length > 10) {

            // 2. The Filter: The .add() function tries to add the text to our Set.
            // If the text is already in the Set, it returns false and does nothing.
            // If it is brand new, it adds it, returns true, and fires the Log!
            if (scrapedTitles.add(visibleText)) {
                Log.d("AGENT_DEBUG", "[$className] NEW TITLE: $visibleText")
                Log.d("AGENT_DEBUG", "Total Unique Videos Scraped: ${scrapedTitles.size}")
            }
        }

        // Keep recursively digging
        for (i in 0 until node.childCount) {
            extractYouTubeText(node.getChild(i))
        }
    }

    // Required by Android, but we don't need to do anything here for now
    override fun onInterrupt() {}
}