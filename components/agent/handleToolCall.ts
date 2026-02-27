import { NativeModules } from "react-native";


export class HandleToolCall {


handle(aiMessage:any,setBackgroundColor?: (color: string) => void){
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
            // Append the Observation
            chatHistory.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: localResult
            });
    }

}



// 3. Local Execution Functions
 sendSMS(phoneNumber: string, messageText: string) {
    
    NativeModules.smsModule.sendDirectSms(phoneNumber, messageText);
    console.log(`[SMS] Sending to ${phoneNumber}: "${messageText}"`);

    return `Success! Sent SMS.`;
}



}
