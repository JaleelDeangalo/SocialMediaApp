const User = require("../models/User")
const { validationResult } = require("express-validator")

const readCurrentUser = async(req, res) => {

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

const readUser = async(req, res) => {

try {

    const user = await User.findById(req.params.id)

    const { password, updatedAt, ...other} = user._doc
    res.status(200).json(other)

} catch(error) {
    console.log(error)
    res.status(500).json({Message: "Server Error"})
}

}

const updateCurrentUser = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select("-password")
  
        await user.updateOne({$set: req.body})

        res.status(200).json({Message: "Profile updated successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

const deleteCurrentUser = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
        if(!user) {
            return res.status(400).json({Message: "User not found"})
        }
        await user.deleteOne()
        res.status(200).json({Message: "User deleted"})

    } catch(error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const readUsers = async(req, res)  => {

    try {
      const users = await User.find().sort({ date: -1})
      res.status(200).json(users)  
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

const followUser = async(req, res) => {

    try {
        // Gets selected user
        const user = await User.findById(req.params.id)
        // Gets currentUser
        const currentUser = await  User.findById(req.user.id)
      
        if(currentUser.id.toString() === req.params.id) {
            return res.status(400).json({Message: "Error"})
        }

        await user.updateOne({$push : { followers: req.user.id}})
        await currentUser.updateOne({$push: {following: user.id}})

        res.status(200).json({Message: "User has been followed"})
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

const unFollowUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.user.id)

        if(currentUser.id.toString() === req.params.id) {
            return res.status(400).json({Message: "Cannot unfollow yourself"})
        }

        await user.updateOne({$pull: { followers: req.user.id }})
        await currentUser.updateOne({$pull: { following: user.id }})

        res.status(200).json({Message: "User has been unfollowed"})

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

const readFollowing = async (req, res) => {

    try {
    
        const user = await User.findById(req.user.id)
        const friends = await Promise.all(user.following.map(friendId => {
            return User.findById(friendId)
        }))
    
        let followingList = [];
    
        friends.map(friend => {
            const{ _id, username, avatar } = friend
            followingList.push({ _id, username, avatar })
        })
    
        res.status(200).json(followingList)
    
    } catch(error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
    
    }

   const readFollowers = async (req, res) => {

        try {
            const user = await User.findById(req.user.id)
            const friends = await Promise.all(user.followers.map(friendId => {
                return User.findById(friendId)
            }))

            let followersList = []

            friends.map(friend => {
                const { _id, username, avatar } = friend
                followersList.push({ _id, username, avatar })
            })

            res.status(200).json(followersList)

        } catch(error) {
            console.log(error)
            res.status(500).json({Mesage: "Server Error"})
        }

    }

module.exports = { readCurrentUser, followUser, unFollowUser, readUsers, updateCurrentUser, readFollowing, deleteCurrentUser, readFollowers, readUser }