const { model, Schema } = require("mongoose")
const Post = require("./Post")

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },

    avatar: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min:6
    },

    bio: {
        type: String,
        default: "Bio"
    },

    posts: {
        type: Array,
        default: []
    },

    videos: {
        type: Array,
        default: null
    },

    followers: {
        type: Array,
        default: []
    },

    following: {
        type: Array,
        default: []
    },

    date: {
        type: Date,
        default:  new Date()
    }

})


module.exports = model("User", UserSchema)