const router = require("express").Router();
const { createMessage, readMessages } = require("../../controllers/messages");
const token = require("../../middleware/token");

router.post("/", token, createMessage);

router.get("/:id", token, readMessages);

module.exports = router;