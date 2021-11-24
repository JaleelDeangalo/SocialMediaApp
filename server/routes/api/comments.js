const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { addComment, deleteComment, updateComment, getCommentsById, getAllComments} = require("../../controllers/comments")
const token = require("../../middleware/token")

router.post("/:id", [check("comment", "Comment is required").notEmpty()], token, addComment)

router.get("/:id", token, getCommentsById)

router.put("/:id", [check("comment", "Comment is required").notEmpty()], token, updateComment)

router.delete("/:id", token, deleteComment)

router.get("/", token, getAllComments)

module.exports = router