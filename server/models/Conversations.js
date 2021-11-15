const { model, Schema } = require("mongoose")

const ConversationSchema = new Schema({

members: {
    type: Array
},

sender: {
    type: String
}, 
receiver: {
    type: String
}

},{timestamps: true})


module.exports = model("Conversations", ConversationSchema)