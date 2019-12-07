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
        errorMessage: "Please provide title and contents for the post."
      });
  }
  try {
    const post = await db.insert(req.body);
    const newPost = await db.findById(post.id);
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({
      errorMessage: "There was an error while saving the post to the database"
    });
  }
});

router.get("/", () => {});

router.get("/:id", () => {});

router.delete("/:id", () => {});

router.put("/:id", () => {});

module.exports = router;
