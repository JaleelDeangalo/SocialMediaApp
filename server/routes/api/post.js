const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const  auth  = require("../../middleware/token")
const { createPost, getPostById, getAllPosts, deletePost, likePost, unlikePost, updatePost, getTimelinePost } = require("../../controllers/post")

router.post("/",
[
    check("description", "Text is required").notEmpty(),
    check("image", "Image is required").notEmpty()
]
, auth,
createPost)

router.get("/", getAllPosts)

router.get("/:id", auth, getPostById)

router.delete("/:id", auth, deletePost)

router.put("/:id", auth, updatePost)

router.put("/like/:id", auth, likePost)

router.put("/unlike/:id", auth, unlikePost)

module.exports = router
