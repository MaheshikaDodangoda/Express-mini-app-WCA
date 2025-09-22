import express from "express";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";

const app = express();
app.use(express.json());

const messageController = new MessageController();
const webhookController = new WebhookController();

//app.post("/send-message", messageController.sendMessage); 

//to subscrribe webhook
app.get("/webhook", webhookController.webhook);

//to handle recieving messages
app.post("/webhook", webhookController.webhookMessage);

app.get('/health',(req, res) => {
    res.send('OK');
});

app.listen(8558, () => {
    console.log("Server is running on port 8558");
});

