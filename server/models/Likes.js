const { model, Schema } = require("mongoose")

const LikesSchema = new Schema({

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
},{timestamps: true});

module.exports = model("Likes", LikesSchema);