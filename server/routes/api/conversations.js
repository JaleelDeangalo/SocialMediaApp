const express = require("express")
const router = express.Router()
const { newConversation, getUserConversations } = require("../../controllers/conversation")
const auth = require("../../middleware/token")


router.post("/", auth, newConversation)

router.get("/", auth, getUserConversations)


module.exports = router