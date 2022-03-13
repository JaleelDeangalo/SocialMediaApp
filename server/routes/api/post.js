const router = require("express").Router()
const { check } = require("express-validator")
const  token  = require("../../middleware/token")
const { createPost, readPost, readPosts, deletePost, likePost, unlikePost, updatePost, readTimelinePost, readPostComments } = require("../../controllers/post")


router.post("/",
[
    check("description", "Text is required").notEmpty(),
    check("image", "Image is required").notEmpty(),
    check("details", "Details is required").notEmpty()
]
, token,
createPost)

router.get("/", readPosts)

router.get("/:id", token, readPost)

router.delete("/:id", token, deletePost)

router.put("/:id", token, updatePost)

router.put("/like/:id", token, likePost)

router.put("/unlike/:id", token, unlikePost)

router.get("/postComments/:id", token, readPostComments)

router.get("/timeline", token, readTimelinePost)

module.exports = router
