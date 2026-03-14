import { Alert, NativeModules } from "react-native";
import { FetchUsageStats } from "../userFunctions";


export class HandleToolCall {

    private async confirmAction(title: string, message: string): Promise<boolean> {
        return new Promise((resolve) => {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: "Cancel",
                        onPress: () => resolve(false),
                        style: "cancel"
                    },
                    {
                        text: "Confirm",
                        onPress: () => resolve(true)
                    }
                ],
                { cancelable: false }
            );
        });
    }

    async  handle(aiMessage:any,setBackgroundColor?: (color: string) => void): Promise<any[]>{
    var toolResults: any[] = [];
    for (const toolCall of aiMessage.tool_calls) {
            
        if (toolCall.type !== "function") continue; 

            const args = JSON.parse(toolCall.function.arguments);
            let localResult = "";


            switch (toolCall.function.name) {
                case "background_color_control":
                    const confirmed = await this.confirmAction(
                        "Background Color Change",
                        `Change background color to ${args.color}?`
                    );
                     if (confirmed) {
                    setBackgroundColor?.(args.color);
                    localResult = `Background color set to ${args.color}.`;
                    } else {
                        localResult = `Background color change cancelled by user.`;
                    }
                    break;
                case "send_sms":
                    const smsConfirmed = await this.confirmAction(
                        "Send SMS",
                        `Send SMS to ${args.phoneNumber}?\n\nMessage: "${args.messageText}"`
                    );
                    if (smsConfirmed) {
                        // Ensure phoneNumber is a string
                        const phoneNumberStr = String(args.phoneNumber);
                        this.sendSMS(phoneNumberStr, args.messageText);
                        localResult = `SMS sent to ${phoneNumberStr}: ${args.messageText}`;
                    } else {
                        localResult = `SMS sending cancelled by user.`;
                    }
                    break;
                case "read_contacts":
                    const contactsConfirmed = await this.confirmAction(
                        "Read Contacts",
                        `Allow AI to read contacts${args.searchQuery ? ` matching "${args.searchQuery}"` : ''}?`
                    );
                    if (contactsConfirmed) {
                        const contacts = await NativeModules.contactsModule.getContacts(args.searchQuery);
                        console.log("Search Query:", args.searchQuery);
                        console.log("Contacts:", contacts);
                        localResult = contacts;
                    } else {
                        localResult = `Contact access denied by user.`;
                    }
                    break;
                case "read_usage_stats":
                
                    const usageStats = await FetchUsageStats();
                    console.log("Usage Stats:", usageStats);
                    localResult = usageStats;
                    
                    break;
                
            }


            // Append the Observation
            toolResults.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: localResult
            });
    }

    return toolResults;
}


alertUser(message: string) {
    Alert.alert("Agent Alert", message, [{ text: "OK" }]);
    console.log(`[ALERT] ${message}`);
    return `Alert shown: "${message}"`;
}
// 3. Local Execution Functions
 sendSMS(phoneNumber: string, messageText: string) {
    
    NativeModules.smsModule.sendDirectSms(phoneNumber, messageText);
    console.log(`[SMS] Sending to ${phoneNumber}: "${messageText}"`);

    return `Success! Sent SMS.`;
}



}
