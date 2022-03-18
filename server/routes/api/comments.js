const router = require("express").Router()
const { check } = require("express-validator")
const { createComment, deleteComment, updateComment, readComment, readAllComments, unlikeComment, likeComment} = require("../../controllers/comments")
const token = require("../../middleware/token")

router.post("/postComment/:id", [check("comment", "Comment is required").notEmpty()], token, createComment)

router.get("/readComment/:id", token, readComment)

router.put("/:id", [check("comment", "Comment is required").notEmpty()], token, updateComment)

router.delete("/:id", token, deleteComment)

router.get("/", token, readAllComments)

router.put("/like/:id", token, likeComment)

router.put("/unlike/:id", token, unlikeComment)

module.exports = router