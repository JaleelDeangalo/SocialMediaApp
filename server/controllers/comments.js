const User = require("../models/User")
const Comments = require("../models/Comment")
const Post = require("../models/Post")
const { validationResult } = require("express-validator")


async function addComment(req, res) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).send({Message: errors.array()})
    }

    const { comment, postID } = req.body

    try {

        const user = await User.findById(req.user.id).select("-password")
        const posts = await Post.findOne({ _id: postID})

        if(!posts) {
            return res.status(404).json({Message: "Post not found"})
        }

        const newComment = new Comments({
            comment,
            user: user.id,
            avatar: user.avatar,
            postID,
            username: user.username
        })

        posts.comments.unshift(newComment)

        await posts.save()

        await newComment.save()

        res.json(newComment)

    } catch(error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}


    async function getAllComments(req, res) {

        try {

            const comments = await Comments.find()
            res.json(comments)

        } catch(error) {

            console.log(error)
            res.status(500).send("Server Error")
        }
    }

 async function getCommentsById(req, res) {

    try {

        const comments = await Comments.find({postID: req.params.id})

        if(!comments) {
            return res.status(404).json({Message: "Comments not found"})
        }
        res.json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}

async function deleteComment(req, res) {

    try {

        const comment = await Comments.findById(req.params.id)
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).send(`Not Authorized`)
        }

        await comment.remove()

    } catch(error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}


async function updateComment(req, res) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).send({Message: errors.array()})
    }

    try {

        const comment = await Comments.findById(req.params.id)
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).send(`Not Authorized`)
        }
           const updatedComment = await comment.updateOne({$set: req.body})
            res.json(updatedComment)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}


module.exports = { addComment, deleteComment, updateComment, getCommentsById, getAllComments}