const { model, Schema } = require("mongoose")

const LikesSchema = new Schema({

    postId: {
        type: String
    },

    likes: {
        type: [String],
        default: []
    }
})

module.exports = model("Likes", LikesSchema)