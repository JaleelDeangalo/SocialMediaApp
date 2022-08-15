const router = require("express").Router();
const { createConversation, readConversations } = require("../../controllers/conversation");
const token = require("../../middleware/token");

router.post("/create/:id", token, createConversation);

router.get("/read", token, readConversations);

module.exports = router;