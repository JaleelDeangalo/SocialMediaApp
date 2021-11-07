const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { addComment, deleteComment, updateComment, getCommentsById, getAllComments } = require("../../controllers/comments")
const auth = require("../../middleware/token")


router.post("/", [check("comment", "Comment is required").notEmpty()], auth, addComment)

router.get("/:id", auth, getCommentsById)

router.put("/:id", [check("comment", "Comment is required").notEmpty()], auth, updateComment)

router.delete("/:id", auth, deleteComment)

router.get("/", auth, getAllComments)


module.exports = router