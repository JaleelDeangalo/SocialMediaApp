const User = require("../models/User")
const Messages = require("../models/Message")
const { validationResult } = require("express-validator")
const Message = require("../models/Message")



 const createMessage = async(req, res) => {

    try {
        const user = await User.findById(req.user.id)
        const newMessage = new Message({
            user: req.user.id,
            avatar: user.avatar,
            username: user.username,
            message: req.body.message,
            image: req.body.image,
            date: new Date().getTime()
        })

       await newMessage.save()

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }

}

const getMessages = async(req, res) => {

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

 const deleteMessage = async(req, res) => {

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


 const updateMessage = async(req, res) => {

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