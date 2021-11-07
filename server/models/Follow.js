const { model, Schema } = require("mongoose")


const FollowSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    followedAvatar: {
        type: [String],
        default: []
    },

    followedUsername: {
        type: [String],
        default: []
    },

    followedID: {
        type: [String],
        default: []
    },

    followerUsername: {
        type: [String],
        default: []
    },

    followerAvatar: {
        type: [String],
        default: []
    },

    followerID: {
        type: [String],
        default: []
    }

}, {timestamps: true})


module.exports = model("Follow", FollowSchema)