const express = require("express")
const router = express.Router()
const auth = require("../../middleware/token")
const { followUser, getCurrentUser, unFollowUser, updateUser, getAllUsers, deleteUser, getFollowing, getFollowers, getAllUsersById, getUser, getSelectedUser} = require("../../controllers/user")
const { check } = require("express-validator")    

router.get("/", auth, getCurrentUser)

router.get("/getUsers", auth, getAllUsers)

router.get("/getUsers/:id", auth, getAllUsersById)

router.get("/getUser/:id", auth, getUser)

router.get("/selectedUser/:id", auth, getSelectedUser)

router.put("/follow/:id", auth, followUser)

router.put("/unfollow/:id", auth, unFollowUser)

router.put("/updateUser",
[
    check("username", "username is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("bio", "bio is required").notEmpty()
], auth, updateUser)

router.delete("/", auth, deleteUser)

router.get("/following", auth, getFollowing)

router.get("/followers", auth, getFollowers)

module.exports = router