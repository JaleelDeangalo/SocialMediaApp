const router = require("express").Router();
const token = require("../../middleware/token")
const { readFollowers,
        readFollowing,
        followUser,
        readCurrentUser,
        unFollowUser,
        readUser,
        readUsers,
        deleteCurrentUser,
        updateCurrentUser,
        getUserPosts } = require("../../controllers/user");

router.get("/", token, readCurrentUser);

router.get("/getUsers", token, readUsers);

router.get("/getUser/:id", token, readUser);

router.put("/follow/:id", token, followUser);

router.put("/unfollow/:id", token, unFollowUser);

router.put("/updateUser", token, updateCurrentUser);

router.delete("/", token, deleteCurrentUser);

router.get("/following", token, readFollowing);

router.get("/followers", token, readFollowers);

router.get("/getUserPosts", token, getUserPosts);

module.exports = router;