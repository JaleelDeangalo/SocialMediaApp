const express = require("express")
const router = express.Router()
const auth = require("../../middleware/token")
const { followUser, getCurrentUser, unFollowUser, updateUser, getAllUsers, deleteUser, getFollowing, getFollowers, getAllUsersById} = require("../../controllers/user")
const { check } = require("express-validator")    

router.get("/", auth, getCurrentUser)

router.get("/getUsers", auth, getAllUsers)

router.get("/getUsers/:id", auth, getAllUsersById)

router.put("/follow/:id", auth, followUser)

router.put("/unfollow/:id", auth, unFollowUser)

router.put("/updateUser/:id", auth, 
[
    check("username", "Please enter a username").notEmpty(),
    check("bio", "Please enter a bio").notEmpty()
],
updateUser)

router.delete("/", auth, deleteUser)

router.get("/follwing", auth, getFollowing)

router.get("/followers", auth, getFollowers)

module.exports = router