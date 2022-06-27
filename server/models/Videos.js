const { model, Schema } = require("mongoose")


const VideoSchema = new Schema({

    username: {
        type: String
    },

    avatar: {
        type: String
    },

    user: {
        type: Schema.Types.ObjectId
    },

    video: {
        type: Buffer
    },

    details: {
        type: String
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


module.exports = model("Video", VideoSchema)