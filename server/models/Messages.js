const { model, Schema } = require("mongoose")

const MessageSchema = new Schema({

conversationId: {
    type: String
},

sender: {
    type: String
},

message: {
    type: String
}

},{timestamps: true})


module.exports = model("Messages", MessageSchema)