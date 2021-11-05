const { model, Schema } = require("mongoose")

const UserSchema = new Schema({

    id: {
        type: Number,
        default: Math.floor(Math.random() * 10000)
    },

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

    isAdmin: {
        type: Boolean,
        default: false
    },

    bio: {
        type: String,
        default: "Bio"
    },

    date: {
        type: Date,
        default: Date.now
    },

    followers: {
        type: Array,
        default: []
    },

    following: {
        type: Array,
        default: []
    },

})


module.exports = model("User", UserSchema)