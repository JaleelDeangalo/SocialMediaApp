const { model, Schema } = require("mongoose")

const CommentSchema = new Schema({

    id: {
        type: Number,
        default: Math.floor(Math.random()* 10000)
    },

    user: {
        type: Schema.Types.ObjectId
    },

    post: {
        type: Schema.Types.ObjectId
    },

    comment: {
        type: String,
        required: true,
        default: ""
    },

    avatar: {
        type: String
    },

    username: {
        type: String
    },

    date: {
        type: Number,
        default: new Date().getTime()
    }

})


module.exports = model("comments", CommentSchema)