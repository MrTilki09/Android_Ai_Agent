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
        
] 