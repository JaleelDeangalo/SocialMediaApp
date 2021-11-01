const { Schema, model } = require("mongoose")


const ChatSchema = new Schema({

    conversationId: {
        type: String
    },

    sender: {
        type: String
    },

    text: {
        type: String
    }

},{timestamps})


module.exports = model("Chat", ChatSchema)