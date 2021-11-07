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

    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = model("User", UserSchema)