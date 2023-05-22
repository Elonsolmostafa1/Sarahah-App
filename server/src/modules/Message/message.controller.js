import messageModel from "../../../database/models/messageModel.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";


export const sendMessage = catchAsyncError(async(req,res,next)=>{
    const {id,message} = req.body
    const userMessage = await messageModel.insertMany({sentToUserId:id,message})
    userMessage ? res.status(200).json({status:200,message:"success"}) : next(new AppError("Failed to send message",400))
})


export const getUserMessages = catchAsyncError(async(req,res,next)=>{
    const id = req.userId
    const messages = await messageModel.find({sentToUserId:id}).sort({createdAt: -1});
    res.status(200).json({status:200,message:"success",messages})
})


export const deleteUserMessage = catchAsyncError(async(req,res,next)=>{
    const id = req.userId
    const {_id} = req.params
    const message = await messageModel.findOneAndDelete({sentToUserId:id,_id});
    message ? res.status(200).json({status:200,message:"success"}) : next(new AppError("Failed to delete message",400))
})