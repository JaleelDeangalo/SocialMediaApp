const express = require("express")
const router = express.Router()
const auth = require("../../middleware/token")
const { 
    followUser,
    getCurrentUser,
    unFollowUser,
    getAllUsers } = require("../../controllers/user")


router.get("/", auth, getCurrentUser)

router.get("/currentUser", auth, getCurrentUser)

router.get("/getUsers", auth, getAllUsers)

router.put("/follow/:id", auth, followUser)

router.put("/unfollow/:id", auth, unFollowUser)

module.exports = router