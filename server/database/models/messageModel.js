import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    message:
    {
        type:String ,
        minLength:[3,"message is too short"],
        required:true
    },

    sentToUserId:
    {
        type:mongoose.Types.ObjectId,
        required:true
    }
},
  
{timestamps:true })

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;

