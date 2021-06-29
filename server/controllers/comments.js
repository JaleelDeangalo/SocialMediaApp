const User = require("../models/User")
const Comments = require("../models/Comment")
const Post = require("../models/Post")
const { validationResult } = require("express-validator")


const addComment = async(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).send({Message: errors.array()})
    }

    const { comment, post } = req.body

    try {

        const user = await User.findById(req.user.id)

        const newComment = new Comments({
            comment,
            user: user.id,
            avatar: user.avatar,
            post,
            username: user.username
        })

        await newComment.save()

        res.json({newComment})

    } catch(error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}


const getComments = async(req, res) => {

    try {
        const commments = await Comments.findById(req.params.id)
        res.json(commments)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}

const deleteComment = async(req, res) => {

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


const updateComment = async(req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).send({Message: errors.array()})
    }

    try {

        const comment = await Comments.findById(req.params.id)
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).send(`Not Authorized`)
        }
            await comment.updateOne({$set: req.body})
            res.json(comment)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error`)
    }
}


module.exports = { addComment, deleteComment, updateComment, getComments }