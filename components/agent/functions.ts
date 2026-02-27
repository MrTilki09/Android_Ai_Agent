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
                        phoneNumber: { type: "string", description: "The phone number to send the SMS to" },
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
        }
] 