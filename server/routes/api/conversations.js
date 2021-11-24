const express = require("express")
const router = express.Router()
const { newConversation, getUserConversations } = require("../../controllers/conversation")
const token = require("../../middleware/token")


router.post("/", token, newConversation)

router.get("/", token, getUserConversations)


module.exports = router