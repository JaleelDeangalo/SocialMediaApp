const express = require("express")
const router = express.Router()
const auth = require("../../middleware/token")
const { 
    followUser,
    getCurrentUser,
    unFollowUser,
    updateUser,
    getAllUsers,
    getSelectedUser } = require("../../controllers/user")
const { check } = require("express-validator")    

router.get("/", auth, getCurrentUser)

router.get("/currentUser", auth, getCurrentUser)

router.get("/getUsers", auth, getAllUsers)

router.put("/follow/:id", auth, followUser)

router.put("/unfollow/:id", auth, unFollowUser)

router.put("/updateUser", auth, 
[
    check("username", "Please enter a username").notEmpty(),
    check("bio", "Please enter a bio").notEmpty()
],
updateUser)

router.get("/selectedUser", auth, getSelectedUser )

module.exports = router