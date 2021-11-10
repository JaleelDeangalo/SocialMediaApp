const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const { validationResult } = require("express-validator")

async function getCurrentUser(req, res) {

    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user) {
            return res.status(404).json({Message: "User not found"})
        }
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
    
}

async function updateUser(req, res) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    const { username, avatar } = req.body

    try {
        const user = await User.findById(req.user.id)
        const post = await Post.find({user: req.params.id})
        const comment = await Comment.find({user: req.params.id})
        if(post) {
            await post.updateMany({$set: {username: username, avatar: avatar}})
        }

        if(comment) {
            await comment.updateMany({$set: {username: username, avatar: avatar}})
        }
        await user.updateOne({$set: req.body})

        res.status(200).json(post, user)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

async function deleteUser(req, res) {

    try {

        const user = await User.findById(req.user.id)
        if(!user) {
            return res.status(400).json({Message: "User not found"})
        }
        await user.deleteOne()
        res.status(200).json({Message: "User Deleted"})

    } catch(error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

async function getAllUsersById(req, res) {

    try {
        const users = await User.find(req.params.id)
        if(!users) {
            return res.status(400).json({Message: "Users not found"})
        }
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

async function getAllUsers(req, res) {

    try {
      const users = await User.find().sort({ date: -1})
      res.status(200).json(users)  
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

async function followUser(req, res) {

    try {
        // Gets selected user
        const user = await User.findById(req.params.id)
        // Gets currentUser
        const currentUser = await  User.findById(req.user.id)
      
        if(currentUser.id.toString() === req.params.id.toString()) {
            return res.status(400).json({Message: "Error"})
        }

        await user.updateOne({$push : { followers: req.user.id}})
        await currentUser.updateOne({$push: {following: user.id}})

        res.status(200).json({Message: "User has been followed"})
        res.json(currentUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}


async function unFollowUser(req, res) {

    try {
        const user = await User.findById(req.query.id)
        const currentUser = await User.findById(req.user.id)

        if(currentUser.id.toString() === req.query.id.toString()) {
            return res.status(400).json({Message: "Cannot unfollow yourself"})
        }

        await user.updateOne({$pull: { followers: req.user.id }})
        await currentUser.updateOne({$pull: { following: user.id }})

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

async function getFollowing(req, res) {

    try {
    
        const user = await User.findById(req.user.id)
        const friends = await Promise.all( user.following.map(function(friendId) {
            return User.findById(friendId)
        }))
    
        let followingList = [];
    
        friends.map(function(friend) {
            const{ _id, username, avatar } = friend
            followingList.push({_id, username, avatar })
        })
    
        res.status(200).json(followingList)
    
    } catch(error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
    
    }

    async function getFollowers(req, res) {

        try {
            const user = await User.findById(req.user.id)
            const friends = await Promise.all(user.followers.map( function(friendId) {
                return User.findById(friendId)
            }))

            let followersList = []

            friends.map(function(friend) {
                const { _id, username, avatar } = friend
                followersList.push({ _id, username, avatar })
            })

            res.status(200).json(followersList)

        } catch(error) {
            console.log(error)
            res.status(500).json({Mesage: "Server Error"})
        }

    }


module.exports = { getCurrentUser, followUser, unFollowUser, getAllUsers, updateUser, getFollowing, deleteUser, getAllUsersById, getFollowers }