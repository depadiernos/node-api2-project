const express = require("express");
const cors = require("cors");
let db = require("../data/db");
const commentRouter = require("./comments");

const router = express.Router();

router.use("/:id/comments", commentRouter);

router.post("/", async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({
        error: "Please provide title and contents for the post."
      });
  }
  try {
    const post = await db.insert(req.body);
    const newPost = await db.findById(post.id);
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({
      error: "There was an error while saving the post to the database" 
    });
  }
});

router.get("/", async (req, res) => {
    try {
        const posts = await db.find()
        res.json(posts)
    }
    catch (err){
        return res.status(500).json({
            error: "The posts information could not be retrieved."
          });
    }
});

router.get("/:id", async () => {});

router.delete("/:id", async () => {});

router.put("/:id", async () => {});

module.exports = router;
