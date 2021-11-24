const router = require("express").Router()
const { check } = require("express-validator")
const  token  = require("../../middleware/token")
const { createPost, getPostById, getAllPosts, deletePost, likePost, unlikePost, updatePost, getTimelinePost, getPostComments } = require("../../controllers/post")


router.post("/",
[
    check("description", "Text is required").notEmpty(),
    check("image", "Image is required").notEmpty()
]
, token,
createPost)

router.get("/", getAllPosts)

router.get("/:id", token, getPostById)

router.delete("/:id", token, deletePost)

router.put("/:id", token, updatePost)

router.put("/like/:id", token, likePost)

router.put("/unlike/:id", token, unlikePost)

router.get("/postComments/:id", token, getPostComments)

router.get("/timeline", token, getTimelinePost)

module.exports = router
