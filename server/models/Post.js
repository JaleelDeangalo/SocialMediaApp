const { model, Schema } = require("mongoose")

const PostSchema = new Schema({

    username: {
        type: String
    },

    avatar: {
        type: String
    },

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


    details: {
        type: String,
        required: true,
        default: ""
    },
    
    likes: {
        type: Array,
        default: []
    },

    comments: {
        type: Array,
        default: []
    },

    date: {
        type: Date,
        default: new Date()
    }

})

module.exports = model("Post", PostSchema)