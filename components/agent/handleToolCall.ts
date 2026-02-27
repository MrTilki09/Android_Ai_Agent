import { NativeModules } from "react-native";


export class HandleToolCall {


    async  handle(aiMessage:any,setBackgroundColor?: (color: string) => void){
    var chatHistory: any[] = [];
    for (const toolCall of aiMessage.tool_calls) {
            
        if (toolCall.type !== "function") continue; 

            const args = JSON.parse(toolCall.function.arguments);
            let localResult = "";

             if (toolCall.function.name === "background_color_control") {
                setBackgroundColor?.(args.color);
                localResult = `Background color set to ${args.color}.`;
            }
            else if (toolCall.function.name === "send_sms") {
                this.sendSMS(args.phoneNumber, args.messageText);
                localResult = `SMS sent to ${args.phoneNumber}: ${args.messageText}`;
            }
            else if (toolCall.function.name === "read_contacts") {
                // For simplicity, we return a static list. You can implement actual contact reading logic here.
                
                // localResult = await this.getContacts();
                const contacts = await NativeModules.contactsModule.getContacts(args.searchQuery);
               
                console.log("Search Query:", args.searchQuery);
                    console.log("Contacts:", contacts);
                    localResult = contacts;
                
             }
            // Append the Observation
            chatHistory.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: localResult
            });
    }

}

// async getContacts (): Promise<string> {
//     return new Promise((resolve) => {
//         NativeModules.contactsModule.getContacts((searchQuery: string) => {
//             console.log("Contacts:", contacts);
//             resolve(contacts);
//         });
// });
// }


// 3. Local Execution Functions
 sendSMS(phoneNumber: string, messageText: string) {
    
    NativeModules.smsModule.sendDirectSms(phoneNumber, messageText);
    console.log(`[SMS] Sending to ${phoneNumber}: "${messageText}"`);

    return `Success! Sent SMS.`;
}



}
