import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:
    {
        type:String ,
        minLength:[3,"Name is too short"],
        maxLength:[20 , "Name is too long"],
        required:true
    },

    email:
    {
        type:String,
        unique:true,
        required:true
    },

    password:
    {
        type:String,
        required:true,
        //maxLength:[20,"Password is too long"],
        minLength:[3,"Password is too short"],
    },

    isVerified:
    {
        type:Boolean,
        default:false
    },

    profilePic:
    {
        type:String,
        default:"6f15ef9b-c7b7-4ffe-8033-d9d6cafc3792-6d68089e-1b33-4082-863a-81868e308f6e-Heart face _Two Color.png"
    }
},
  
{timestamps:true })

const userModel = mongoose.model('user', userSchema);

export default userModel;

