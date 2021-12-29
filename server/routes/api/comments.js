const router = require("express").Router()
const { check } = require("express-validator")
const { createComment, deleteComment, updateComment, readComment, readComments, unlikeComment, likeComment} = require("../../controllers/comments")
const token = require("../../middleware/token")

router.post("/:id", [check("comment", "Comment is required").notEmpty()], token, createComment)

router.get("/:id", token, readComment)

router.put("/:id", [check("comment", "Comment is required").notEmpty()], token, updateComment)

router.delete("/:id", token, deleteComment)

router.get("/", token, readComments)

router.put("/like/:id", token, likeComment)

router.put("/unlike/:id", token, unlikeComment)

module.exports = router