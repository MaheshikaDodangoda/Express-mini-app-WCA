import { Request, Response } from "express";
import { WebhookMessageDto, WebhookVerificationDto, WebhookVerificationResponseDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";
import { MessageService } from "./message.service";
export class WebhookService {

    private static instance: WebhookService;
    private messageService:MessageService;

    public static getInstance(): WebhookService {
        if(!WebhookService.instance){
            WebhookService.instance = new WebhookService();
        }
        return WebhookService.instance;
    }

    private constructor(){
        this.messageService = MessageService.getInstance();
    }

    public handleWebhookVerfifcation(data: WebhookVerificationDto):WebhookVerificationResponseDto{
    }

    public async handleReceiveMessage(data: WebhookMessageDto):Promise<boolean>{
        const message = data.entry[0].changes[0].value.messages[0].text.body;
        const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
        const name = data.entry[0].changes[0].value.contacts[0].profile.name;

        const replyMessage = `Hello ${name}, Your Message Recieved`;

        const isReplied = await this.messageService.sendMessage(phoneNumber, replyMessage);
        
        if(isReplied){
           return true;
        }

        return false;
    }   
}