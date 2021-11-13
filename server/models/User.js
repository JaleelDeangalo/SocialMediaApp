const { model, Schema } = require("mongoose")

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

    followers: {
        type: Array,
        default: []
    },

    following: {
        type: Array,
        default: []
    },

    myPosts: {
        type: Array,
        default: []
    },

    date: {
        type: Number,
        default:  new Date().getTime()
    }

})


module.exports = model("User", UserSchema)