const { model, Schema } = require("mongoose")

const CommentSchema = new Schema({

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{timestamps: true});


module.exports = model("comments", CommentSchema)