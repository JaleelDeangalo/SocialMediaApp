const User = require("../models/User")
const Post = require("../models/Post")
const { validationResult } = require("express-validator")

async function createPost(req, res) {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    const { description, image } = req.body

    try {
        const user = await User.findById(req.user.id).select("-password")    
        
        const newPost = new Post({
            description,
            image,
            date: new Date().getTime(),
            user: req.user.id
        })

         await user.myPosts.push(newPost)
        
         await newPost.save()

        res.status(200).json({Message: "Post created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}


async function updatePost(req, res) {

try {
     
const post = await Post.findById(req.params.id)
if(post.user.toString() !== req.user.id.toString()) {
    return res.status(401).send("Not Authorized")
} 
    await post.updateOne({$set: req.body})
    res.status(200).json({Message: "Post has been updated"})
} catch(error) {
    console.log(error)
    res.status(500).send("Server Error")
}

}


async function getPostById(req, res) {

    try {
        const post = await Post.find({user: req.params.id})
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

async function deletePost(req, res) {
    try {
        
        const post = await Post.findById(req.params.id)
        
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({Message: "User not authorized"})
        }

        await post.remove()

        res.status(200).json({Message: "Post removed"})


    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}


async function likePost(req, res) {

    try {
        const post = await Post.findById(req.params.id)

        if (post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ Message: "Post already liked" });
          }
    
          await post.updateOne({$push: {likes: req.user.id}})
    
          res.status(200).json({Message: "Post has been liked"})
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
  
}

async function unlikePost(req, res) {
    try {
        const post = await Post.findById(req.params.id)
      
        if (!post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ Message: 'Post already unliked' });
        }

        await post.updateOne({$pull: { likes: req.user.id}})

         res.status(200).json({Message: "Post has been unliked"})

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().sort({ date: -1})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

async function getTimelinePost(req, res) {

    try {
        const currentUser = await User.findById(req.user.id)
        const userPost = await Post.find({user: currentUser.id})
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
               return Post.find({user: friendId})
            })
        )
        res.status(200).json(userPost.concat(...friendPosts))
    } catch(error) {
        console.log(error)
        res.status(500).send("Server Error")
    }

}

async function getPostComments(req, res) {

    try {

        const post = await Post.findById(req.params.id)
        const comments = await Promise.all(post.comments.map(userID => {
            return User.findById(userID)
        }))

        let commentsList = []

        comments.map(userComment => {
            const { _id, username, avatar, comment } = userComment
            commentsList.push({ _id, username, avatar, comment })
        })

        res.status(200).json(commentsList)


    } catch(error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

module.exports = { createPost, getPostById, getAllPosts, deletePost, likePost, unlikePost, updatePost, getTimelinePost, getPostComments}