const express = require("express")
const router = express.Router()
const Conversation = require("../../models/Conversation")



router.post("/", async function(req, res) {

    try {
        const conversation = new Conversation({
            members: [req.body.senderId, req.body.recieverId]
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error" })
    }
})




