import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, red: 'User'},
    recipient: {type: mongoose.Schema.Types.ObjectId, red: 'User'},
    text: String,
    file: String,
}, {timestamps: true})

export const MessageModel = mongoose.model('Messgae', messageSchema)
