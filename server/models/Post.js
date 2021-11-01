const { model, Schema } = require("mongoose")

const uuid = require("uuidv4")


const PostSchema = new Schema({

    id: {
        type: Number,
        required: true,
        default: Math.floor(Math.random() * 10000)
    },

    user: {
        type: Schema.Types.ObjectId
    },

    image: {
        type: String,
        default: ""
    },

    text: {
        type: String,
        required: true
    },

    username: {
        type: String
    },

    avatar: { 
        type: String,
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId
            }
        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId
            },

            text: {
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