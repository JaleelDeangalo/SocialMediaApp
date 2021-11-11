const { model, Schema } = require("mongoose")

const CommentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId
    },

    likes: {
        type: Array,
        default: []
    },

    postID: {
        type: Schema.Types.ObjectId,
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