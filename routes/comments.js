const express = require("express");
const commentData = require("../data");
const shortId = require("shortid");
const moment = require("moment");

const router = express.Router();

// // get all comments
router.get("/", (req, res) => {
  res.json(commentData);
});

// // get a single comment by id
router.get("/:id", (req, res) => {
  const myComment = commentData.find(
    comment => comment.id === parseInt(req.params.id)
  );
  if (myComment) {
    res.json(myComment);
  } else {
    res.status(404).json({ msg: "Invalid Id" });
  }
});

// create a comment
router.post("/", (req, res) => {
  if (!req.body.text) {
    res
      .status(400)
      .json({ msg: "Invalid syntax: please provide comment text" });
  }
  // create a new comment with the text'
  // timestamp : moment()
  // id should be shortid
  const newComment = {
    text: `${req.body.text}`,
    id: `${shortId.generate()}`,
    timestamp: `${moment().format()}`
  };
  // add it to commentdata
  commentData.push(newComment);
  // return all the comments make sure the new comment is included
  res
    .status(201)
    .json({ msg: "Comment successfully added", comments: commentData });
  //Bonus:  if request has no body text (or empty) send proper error code and maybe a message
});

router.patch("/:id", (req, res) => {
  const myComment = commentData.find(
    comment => comment.id === parseInt(req.params.id)
  );
  if (myComment && req.body.text) {
    myComment.text = req.body.text;
    myComment.timestamp = moment();
    res.status(200).json({ msg: "OK", comments: myComment });
  } else if (!req.body.text) {
    res.status(400).json({ msg: "Please send updated text" });
  } else {
    res.status(404).json({ msg: "Invalid Id" });
  }
});

// Practice below
router.delete("/:id", (req, res) => {
  const myComment = commentData.find(
    comment => comment.id === parseInt(req.params.id)
  );
  const indexComment = commentData.indexOf(myComment);
  if (myComment) {
    commentData.splice(indexComment, 1);
  } else {
    res.status(404).json({ msg: "Id not found" });
  }
});

module.exports = router;
