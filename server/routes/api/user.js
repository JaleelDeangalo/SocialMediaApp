const express = require("express")
const router = express.Router()
const token = require("../../middleware/token")
const { followUser, getCurrentUser, unFollowUser, updateUser, getAllUsers, deleteUser, getFollowing, getFollowers, getAllUsersById, getUser, getSelectedUser} = require("../../controllers/user")
const { check } = require("express-validator")    

router.get("/", token, getCurrentUser)

router.get("/getUsers", token, getAllUsers)

router.get("/getUsers/:id", token, getAllUsersById)

router.get("/getUser/:id", token, getUser)

router.get("/selectedUser/:id", token, getSelectedUser)

router.put("/follow/:id", token, followUser)

router.put("/unfollow/:id", token, unFollowUser)

router.put("/updateUser",
[
    check("username", "username is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("bio", "bio is required").notEmpty()
], token, updateUser)

router.delete("/", token, deleteUser)

router.get("/following", token, getFollowing)

router.get("/followers", token, getFollowers)

module.exports = router