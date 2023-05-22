import { Router } from "express";
import userAuth from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import * as messageController from "./message.controller.js";
import { sendMessageSchema } from "./message.validation.js";
const messageRouter = Router();


messageRouter.post("/",validation(sendMessageSchema),messageController.sendMessage)
messageRouter.get("/",userAuth,messageController.getUserMessages)
messageRouter.delete("/:_id",userAuth,messageController.deleteUserMessage)

export default messageRouter