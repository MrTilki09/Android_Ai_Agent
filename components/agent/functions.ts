export const agentFunctions = [
    {
            type: "function",
            function: {
                name: "check_netrise_status",
                description: "Check the current server status of a specific system.",
                parameters: {
                    type: "object",
                    properties: {
                        systemName: { type: "string", description: "The system to check, e.g., 'database', 'auth', or 'api'" }
                    },
                    required: ["systemName"]
                }
            }
        },
        {
            type: "function",
            function: {
                name: "add_to_calendar",
                description: "Add a new event or meeting to the calendar.",
                parameters: {
                    type: "object",
                    properties: {
                        eventTitle: { type: "string", description: "The name of the event" },
                        eventDate: { type: "string", description: "The date and time" }
                    },
                    required: ["eventTitle", "eventDate"]
                }
            }
        },
        {
            type: "function",
            function: {
                name: "send_whatsapp_message",
                description: "Send a WhatsApp text message.",
                parameters: {
                    type: "object",
                    properties: {
                        contactName: { type: "string", description: "The name of the person" },
                        messageText: { type: "string", description: "The text message to send" }
                    },
                    required: ["contactName", "messageText"]
                }
            }
        },
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
] 