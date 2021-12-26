const router = require("express").Router()
const token = require("../../middleware/token")
const { check } = require("express-validator")  
const { readFollowers, readFollowing, followUser, readCurrentUser, unFollowUser, readUser, readUsers, deleteCurrentUser, updateCurrentUser} = require("../../controllers/user")

router.get("/", token, readCurrentUser)

router.get("/getUsers", token, readUsers)

router.get("/getUser/:id", token, readUser)

router.put("/follow/:id", token, followUser)

router.put("/unfollow/:id", token, unFollowUser)

router.put("/updateUser",
[
    check("username", "username is required").notEmpty(),
    check("email", "email is required").notEmpty(),
    check("bio", "bio is required").notEmpty()
], token, updateCurrentUser)

router.delete("/", token, deleteCurrentUser)

router.get("/following", token, readFollowing)

router.get("/followers", token, readFollowers)

module.exports = router