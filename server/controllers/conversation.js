const Conversation = require("../models/Conversations")

const createConversation = async (req, res) => {

    try {
        
        const conversation = new Conversation({
            members: [req.body.senderId, req.body.recieverId]
        });

         await conversation.save();

         res.status(200).json({Message: "Conversation Saved"});

         
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error});
    }

}

const readConversations = async (req, res) => {

    try {

        const conversations = await Conversation.find({
            members: { $in: [req.user.id]}
        });
        
        if(!conversations) {
            return res.status(404).json({Message: "Conversations not found"});
        }
        
        
        res.status(200).json(conversations);

    } catch (error) {
        console.log(error);
        res.status(500).json({Message: error});
    }
}

module.exports = { createConversation, readConversations }