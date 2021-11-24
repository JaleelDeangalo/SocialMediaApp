const express = require("express")
const router = express.Router()
const { createMessage, getMessages } = require("../../controllers/messages")
const token = require("../../middleware/token")


router.post("/", token, createMessage)

router.get("/:id", token, getMessages)


module.exports = router