const { model, Schema } = require("mongoose")

const ConversationSchema = new Schema({

members: {
    type: Array
},

senderId: {
    type: String
}, 
recieverId: {
    type: String
}

},{timestamps: true})


module.exports = model("Conversations", ConversationSchema)