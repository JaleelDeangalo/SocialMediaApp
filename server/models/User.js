const { model, Schema } = require("mongoose");

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    avatar: {
        type: String,
        required: false,
        default: ""
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    stripe: {
        type: String,
        required: false,
        default: null
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    bio: {
        type: String,
        default: ""
    },

    stripeEmail: {
        type: String,
        required: false,
        default: null
    },

    isStripeConnected: {
        type: Boolean,
        required: true,
        default: false
    },

    deletedAt: {
        type: Date,
        required: false,
        default: null
    },

    emailVerifiedAt: {
        type: Date,
        required: false,
        default: null
    }

},{timestamps: true});


module.exports = model("User", UserSchema);