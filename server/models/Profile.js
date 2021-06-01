const { model, Schema } = require("mongoose")

const ProfileSchama = new Schema({

    bio: {
        type: String,
        default: "",
        max: 500
    },

    skills: {
        type: [String]
    },

    location: {
        type: String
    },

    education: [
        {
            school: {
                type: String
            },
            degree: {
                type: String
            },
            fieldofstudy: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],

    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },

    date: {
        type: Date,
        default: Date.now
    }

})



module.exports = model("Profile", ProfileSchama)