const { model, Schema } = require("mongoose")

const CommentSchema = new Schema({

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
        default: Date.now()
    }

})


module.exports = model("comments", CommentSchema)