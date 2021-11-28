const router = require("express").Router()
const { createConversation, findConversations } = require("../../controllers/conversation")
const token = require("../../middleware/token")


router.post("/create", token, createConversation)

router.get("/read/:id", token, findConversations)


module.exports = router