const User = require("../models/User")
const Post = require("../models/Post")
const Comments = require("../models/Comment")
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
            avatar: user.avatar,
            username: user.username,
            user: req.user.id
        })

        const posts = await newPost.save()

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

 async function findAllPosts(req, res) {
    try {
        const posts = await Post.find().sort({ date: -1})
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

async function findPostById(req, res) {

    try {
        
        const post = await Post.findById(req.query.id)
        res.json(post)
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


    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}


async function likePost(req, res) {

    try {
        const posts = await Post.findById(req.params.id)

        if (posts.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ Message: "Post already liked" });
          }
    
          posts.likes.push(req.user.id.toString())

          //posts.likes.unshift(req.user.id.toString())
    
          await posts.save()
    
          return res.json(posts.likes)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
  
   
}

async function unlikePost(req, res) {
    try {
        const posts = await Post.findById(req.params.id)

      
        if (!posts.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ Message: 'Post has not yet been liked' });
        }



        posts.like.pop(req.user.id.toString())
        
        /*

        posts.like = posts.likes.filter(
            ({ user }) => user.toString() !== req.user.id
        )
        */

        await posts.save()

        return res.json(posts.likes)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}


async function addComment(req, res) {

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

       const comment = new Comments({
            comment: text,
            post: posts.id,
            user: req.user.id,
            avatar: user.avatar,
            username: user.username,
            date: new Date().getTime()

        })

        await comment.save()
        posts.comments.unshift(newComment)

        await posts.save()

        res.json(posts.comments)

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}


async function getComments(req, res) {

    try {
        const comments = await Comments.find({_id: req.param.id})
        res.json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }

}

 async function removeComment(req, res) {

    try {
        const posts = await Post.findById(req.params.id)

        const comment = posts.comments.find(
            (comment) => comment.id === req.params.comment_id
        )

        if(!comment) {
            return res.status(404).json({ Message: "Comment not found"})
        }

        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ Message: "User not authorized"})
        }

        posts.comments = posts.comments.filter(
            ({ id }) => id !== req.params.comment_id
        )


        await posts.save()

        return res.json(posts.comments)


    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }

}

module.exports = { createPost, findPostById, findAllPosts, deletePost, likePost, unlikePost, addComment, removeComment, getComments }