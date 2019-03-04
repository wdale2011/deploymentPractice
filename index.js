require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const logger = require("./middleware/logger");
const commentData = require("./data");
const commentsRouter = require("./routes/comments");
const cors = require("cors");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* setup middleware */

//cors
app.use(cors());

// body parser middleware
app.use(express.json());
// form data
app.use(
  express.urlencoded({
    extended: false
  })
);

// logger middleware
app.use(logger);

// static middleware
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/api/comments", commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
