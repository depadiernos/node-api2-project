const express = require("express");
const cors = require("cors");
const welcomeRouter = require("./routes/welcome");
const postsRouter = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
const host = "127.0.0.1";

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

app.use("/", welcomeRouter);
app.use("/api/posts", postsRouter);
