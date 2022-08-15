const Messages = require("../models/Messages")

const createMessage = async (req, res) => {

    try {
        const newMessage = new Messages(req.body);
        await newMessage.save();
        res.status(200).json({Message: "Message Added"});
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error});
    }

}

const readMessages = async (req,res) => {

    try {
        const messages = await Messages.find({
            conversationId: req.params.id
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error});
    }

}

module.exports = { createMessage, readMessages }