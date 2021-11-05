const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { addComment, deleteComment, updateComment, getComments, getCommentsByPostId } = require("../../controllers/comments")
const auth = require("../../middleware/token")


router.post("/", [check("comment", "Comment is required").notEmpty()], auth, addComment)

router.get("/:id", auth, getComments)

router.put("/:id", [check("comment", "Comment is required").notEmpty()], auth, updateComment)

router.delete("/:id", auth, deleteComment)


module.exports = router