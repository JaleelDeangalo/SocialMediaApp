const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const auth = require("../../middleware/token")
const { createPost, 
        findPostById,
        findAllPosts, 
        deletePost,
        likePost,
        unlikePost,
        addComment,
        removeComment } = require("../../controllers/post")

router.post("/",
[
    check("text", "Text is required").notEmpty()
]
, auth,
createPost)

router.get("/", findAllPosts)

router.get("/:id", auth, findPostById)

router.delete("/:id", auth, deletePost)

router.put("/like/:id", auth, likePost)

router.put("/unlike/:id", auth, unlikePost)

router.post("/comment/:id", 
[
    check("text", "Text is required").notEmpty()
],
auth,
addComment)

router.delete("/comment/:id/:comment_id", auth, removeComment)

module.exports = router
