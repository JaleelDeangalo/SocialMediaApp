const User = require("../models/User")


const getCurrentUser = async(req, res) => {

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



const followUser = async(req, res) => {

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


const unFollowUser = async(req, res) => {

    try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.user.id)

        if(currentUser.id.toString() === req.params.id.toString()) {
            return res.status(400).json({Message: "Cannot unfollow yourself"})
        }

        await user.updateOne({$pull: { followers: req.user.id }})
        await currentUser.updateOne({$pull: { following: user.id }})

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}


const getAllUsers = async(req, res) => {

    try {
      const users = await User.find().sort({ date: -1})
      res.json(users)  
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}



module.exports = { getCurrentUser, followUser, unFollowUser, getAllUsers }