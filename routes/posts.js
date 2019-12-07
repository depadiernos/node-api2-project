const express = require("express");
const cors = require("cors");
let db = require("../data/db");
const commentRouter = require("./comments");

const router = express.Router();

router.use("/:id/comments", commentRouter);

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      error: "Please provide title and/or contents for the post."
    });
  }
  try {
    const post = await db.insert(req.body);
    const newPost = await db.findById(post.id);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const posts = await db.findById(req.params.id);
    if (!posts) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postToDelete = await db.findById(req.params.id);
    if (!postToDelete) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    await db.remove(req.params.id);
    res.status(200).json(postToDelete);
  } catch (err) {
    res.status(500).json({ error: "The post could not be removed." });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ error: "Please provide title and/or contents for the post" });
  }
  try {
    const post = await db.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "The post with the specified" });
    }
    const computedPost = { title: req.body.title, contents: req.body.contents };
    const newPost = await db.update(computedPost);
    res.status(200).json(newPost);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
