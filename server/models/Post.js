const { model, Schema } = require("mongoose")

const PostSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

    comments: {
        type: Array,
        default: []
    },

    date: {
        type: Date,
        default: new Date()
    }

},{timestamps: true});

module.exports = model("Post", PostSchema);