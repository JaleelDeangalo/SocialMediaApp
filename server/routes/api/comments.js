const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { addComment, deleteComment, updateComment, getComments } = require("../../controllers/comments")
const auth = require("../../middleware/token")


router.post("/", [check("comment", "Comment is required").notEmpty()], auth, addComment)

router.get("/", auth, getComments)

router.put("/", [check("comment", "Comment is required").notEmpty()], auth, updateComment)

router.delete("/", auth, deleteComment)





module.exports = router