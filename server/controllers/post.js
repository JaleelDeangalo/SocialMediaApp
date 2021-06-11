const User = require("../models/User")
const Post = require("../models/Post")
const { validationResult } = require("express-validator")

const createPost = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.stauts(400).json({Message: errors.array()})
    }

    const { text, image } = req.body

    try {
        const user = await User.findById(req.user.id).select("-password")    
        
        const newPost = new Post({
            text,
            image,
            date: new Date().getTime(),
            avatar: user.avatar,
            username: user.username,
            user: req.user.id
        })

        const posts = await newPost.save()

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.stauts(500).json({Message: "Server Error"})
    }

}

const findAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1})
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

const findPostById = async(req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        res.json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

const deletePost = async(req, res) => {
    try {
        
        const post = await Post.findById(req.params.id)
        
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({Message: "User not authorized"})
        }

        await post.remove()


    } catch (error) {
        console.log(error)
        res.stauts(500).json({Message: "Server Error"})
    }
}


const likePost = async(req, res) => {

    try {
        const posts = await Post.findById(req.params.id)

        if (posts.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ Message: "Post already liked" });
          }
    
          posts.likes.unshift({ user: req.user.id })
    
          await posts.save()
    
          return res.json(posts.likes)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
  
   
}

const unlikePost = async(req, res) => {
    try {
        const posts = await Post.findById(req.params.id)

      
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ Message: 'Post has not yet been liked' });
        }

        posts.like = posts.likes.filter(
            ({ user }) => user.toString() !== req.user.id
        )

        await posts.save()

        return res.json(posts.likes)

    } catch (error) {
        console.log(error)
        res.stauts(500).json({Message: "Server Error"})
    }
}


const addComment = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { text } = req.body

    try {
        const user = await User.findById(req.user.id).select("-password")
        const posts = await Post.findById(req.params.id)

        const newComment = {
            text,
            username: user.usermane,
            avatar: user.avatar,
            user: req.user.id
        }

        posts.comments.unshift(newComment)

        await posts.save()

        res.json(posts.comments)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}


const getComments = async(req, res) => {

    try {
        const posts = await Posts.findById(req.params.id)
        res.json(posts.commets)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }

}

const removeComment = async(req, res) => {

    try {
        const posts = await Post.findById(req.params.id)

        const comment = posts.comments.find(
            (comment) => comment.id === req.params.comment_id
        )

        if(!comment) {
            return res.stauts(404).json({ Message: "Comment not found"})
        }

        if(comment.user.toString() !== req.user.id) {
            return res.stauts(401).json({ Message: "User not authorized"})
        }

        posts.comments = posts.comments.filter(
            ({ id }) => id !== req.params.comment_id
        )


        await posts.save()

        return res.json(posts.comments)


    } catch (error) {
        console.log(error)
        res.stauts(500).json({Message: "Server Error"})
    }

}

module.exports = { createPost, findPostById, findAllPosts, deletePost, likePost, unlikePost, addComment, removeComment, getComments }