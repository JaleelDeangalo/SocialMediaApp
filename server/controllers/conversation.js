const Conversation = require("../../models/Conversations")



const newConversation = async (req, res) => {

    try {
        
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.recieverId],
            sender: req.body.senderId,
            reciever: req.body.recieverId
        })

         await newConversation.save()

         res.status(200).json({Message: "Conversation Saved"})

         
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: error})
    }

}

const getUserConversations = async (req, res) => {

    try {
        
        /*
        const conversations = await Conversation.find({
            members: { $in: [req.user.id]}
        })
        */
        const conversations = await Conversation.find({
            sender: req.user.id,
            reciever: req.user.id
        })

        res.status(200).json(conversations)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: error})
    }
}


module.exports = { newConversation, getUserConversations }