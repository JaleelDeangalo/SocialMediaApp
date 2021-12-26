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

    date: {
        type: Date,
        default: new Date()
    }

})


module.exports = model("comments", CommentSchema)