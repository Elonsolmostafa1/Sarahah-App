import Joi from "joi"


export const sendMessageSchema = {
    body:Joi.object({
            message:Joi.string().min(2).max(500).required(),
            id:Joi.string().required()
    })
}
