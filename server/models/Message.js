
const { model, Schema } = require("mongoose")

const MessageSchema = new Schema({

    user: { 
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    avatar: {
        type: String
    },

    username: {
        type: String
    },

    message: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    date: {
        type: Number,
        default: new Date().getTime()
    }
})

module.exports = model("Messages", MessageSchema)