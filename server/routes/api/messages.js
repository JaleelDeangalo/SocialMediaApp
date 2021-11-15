const express = require("express")
const router = express.Router()
const { createMessage, getMessages } = require("../../controllers/messages")
const auth = require("../../middleware/token")


router.post("/", auth, createMessage)

router.get("/:id", auth, getMessages)


module.exports = router