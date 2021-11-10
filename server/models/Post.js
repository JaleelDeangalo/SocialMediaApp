const { model, Schema } = require("mongoose")

const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId
    },

    image: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        required: true
    },

    username: {
        type: String
    },

    avatar: { 
        type: String,
    },

    likes: {
        type: Array,
        default: []
    },

    comments: [
        {

            user: {
                type: Schema.Types.ObjectId
            },

            comment: {
                type: String,
                required: true
            },
            
            username: {
                type: String
            },

            avatar: {
                type: String
            },

            date: {
                type: Number,
                default: new Date().getTime()
            }
        }
    ],

    date: {
        type: Number,
        default: new Date().getTime()
    }

})

module.exports = model("Post", PostSchema)