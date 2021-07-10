const User = require("../models/User")
const Post = require("../models/Post")
const { validationResult } = require("express-validator")

async function getCurrentUser(req, res) {

    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user) {
            return res.status(404).json({Message: "Null"})
        }
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
    
}



async function followUser(req, res) {

    try {
        const user = await User.findById(req.params.id)
        const currentUser = await  User.findById(req.user.id)
      
        if(currentUser.id.toString() === req.params.id.toString()) {
            return res.status(400).json({Message: "Cannot follow yourself"})
        }

        await user.updateOne({$push : { followers: req.user.id}})
        await currentUser.updateOne({$push: {following: user.id}})

        res.status(200).json({Message: "User has been followed"})
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

async function getSelectedUser(req, res) {

    try {
        const user = await User.findById(req.query.id)
        if(!user) {
            return res.status(400).json({Message: "User not found"})
        }

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}

async function updateUser(req, res) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id)
        const post = await Post.find(req.user.id)
        if(post) {
            await post.updateOne({$set: {username: req.body, avatar: req.body, bio: req.body}})
        }
        await user.updateOne({$set: req.body})

        res.json(post, user)
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


async function getAllUsers(req, res) {

    try {
      const users = await User.find().sort({ date: -1})
      res.json(users)  
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}


module.exports = { getCurrentUser, followUser, unFollowUser, getAllUsers, updateUser, getSelectedUser }