const express = require("express");
const cors = require("cors");
let db = require("../data/db");

const router = express.Router({ mergeParams:true })

router.post("/", async (req, res)=>{
    if (!req.params.id){
        return res.status(404).json({message: "The post with the specified ID does not exist."})
    }
    if (!req.body.text) {
        return res.status(400).json({error: "Please provide text for the comment."})
    }
    try {
        const computedComment = { text: req.body.text, post_id: req.params.id }
        const commentId = await db.insertComment(computedComment)
        const newComment = await db.findCommentById(commentId.id)
        res.status(201).json(newComment)
    }
    catch (err){
        res.status(500).json({error: "There was an error while saving the comment to the database."})
    }
})

router.get("/", async (req, res)=>{
    if (!req.params.id){
        return res.status(404).json({message: "The post with the specified ID does not exist."})
    }
    try {
        const comments = await db.findPostComments(req.params.id)
        res.status(200).json(comments)
    }
    catch (err){
        res.status(500).json({error: "The comment information could not be retrieved."})
    }
})

router.get("/:commentId", async (req, res)=>{
    if (!req.params.id || !req.params.commentId){
        return res.status(404).json({message: "The post or comment with the specified ID does not exist."})
    }
    try {
        const comment = await db.findCommentById(req.params.commentId)
        res.status(200).json(comment)
    }
    catch(err){
        res.status(500).json({error: "The comment with the specified ID could not be retrieved."})
    }
})

module.exports = router