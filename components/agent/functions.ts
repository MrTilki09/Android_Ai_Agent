export const agentFunctions = [
    
        {
            type: "function",
            function: {
                name: "background_color_control",
                description: "Change the app's background color.",
                parameters: {
                    type: "object",
                    properties: {
                        color: { type: "string", description: "The new background color (e.g., '#ff0000')" }
                    },
                    required: ["color"]
                }
            }
        },
        {
            type: "function",
            function: {
                name: "send_sms",
                description: "Send an SMS message.",
                parameters: {
                    type: "object",
                    properties: {
                        phoneNumber: { type: "string", description: "The phone number to send the SMS to, it must be a string" },
                        messageText: { type: "string", description: "The text message to send" }
                    },
                    required: ["phoneNumber", "messageText"]
                }
            }
        },
        {
            type: "function",
            function: {
                name: "read_contacts",
                description: "Read the user's contacts and return a list of names and phone numbers.",
                parameters: {
                    type: "object",
                    properties: {
                        searchQuery: { type: "string", description: "Optional search query to filter contacts by name" }
                    },
                    required: []
                }
            }
        },
        {
            type: "function",
            function: {
                name: "read_usage_stats",
                description: "Read the user's usage statistics and return a list of app usage data for today.",
                parameters: {
                    type: "object",
                    properties: {
                        // startTime: { type: "double", description: "required start time to filter usage stats" },
                        // endTime: { type: "double", description: "required end time to filter usage stats" }
                    },
                    required: []
                }
            }
        },
        {
            type: "function",
            function: {
                name: "post_twitter",
                description: "Fill's a tweet on behalf of the user. The user will have the chance to edit and confirm before posting and has to click post",
                parameters: {
                    type: "object",
                    properties: {
                        tweetContent: { type: "string", description: "The content of the tweet to post" }
                    },
                    required: ['tweetContent']
                }
            }
        },
        {
            type: "function",
            function: {
                name: "set_usage_limits",
                description: "Set the usage limits for the Digital Twin service. This will update the limits stored in AsyncStorage and send the new limits to the native TwinAgent service. Available apps: Facebook (com.facebook.katana), Instagram (com.instagram.android), Snapchat (com.snapchat.android), Reddit (com.reddit.frontpage), Chrome (com.android.chrome), Twitter (com.twitter.android).",
                parameters: {
                    type: "object",
                    properties: {
                        twinLimits: { 
                            type: "object", 
                            description: "The usage limits for each app in minutes. Example: {\"com.google.android.youtube\": 30, \"com.instagram.android\": 20, \"com.snapchat.android\": 10, \"com.reddit.frontpage\": 25, \"com.android.chrome\": 0, \"com.twitter.android\": 0}" 
                        }
                    },
                    required: ['twinLimits']
                }
            }
        },
        
] 