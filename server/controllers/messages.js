const User = require("../models/User")
const { validationResult } = require("express-validator")
const Message = require("../models/Message")



 async function createMessage(req, res) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).send({ Message: errors.array() })
    }
        const { message, image } = req.body

    try {
        const user = await User.findById(req.user.id)
        const newMessage = new Message({
            user: req.user.id,
            avatar: user.avatar,
            username: user.username,
            message,
            image,
            date: new Date().getTime()
        })

       await newMessage.save()

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }

}

async function getMessages(req, res) {

    try {
        const message = await Message.find({_id: req.param.id})
        if(!message) {
            return res.status(400).send("No messages")
        }

        res.json(message)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
    
}

 async function deleteMessage(req, res) {

    try {
        const message = await Message.findById(req.params.id)
        if(message.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}


 async function updateMessage(req, res) {

    try {
        const message = await Message.findById(req.params.id)
        if(message.user.toString() !== req.user.id) {
            return res.status(401).send("Not authorized")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}



module.exports = { createMessage, updateMessage, deleteMessage, getMessages }