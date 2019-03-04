const express = require("express");
const commentData = require("../data");
const shortId = require("shortid");
const moment = require("moment");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// create the database file if it doesn't exist and seed it with data
const adapter = new FileSync("db.json", {
  defaultValue: { comments: commentData }
});

const db = lowdb(adapter);

const router = express.Router();

// // get all comments
router.get("/", (req, res) => {
  let comments = db.get("comments").value();
  if (req.query.filter) {
    const filterText = req.query.filter;
    comments = comments.filter(comment =>
      comment.text.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  res.json(comments);
});

// GET /comments?filter="your text here"

// // get a single comment by id
router.get("/:id", (req, res) => {
  const myComment = db
    .get("comments")
    .find({ id: req.params.id })
    .value();
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
    text: req.body.text,
    id: shortId.generate(),
    timestamp: moment().format()
  };
  // add it to commentdata
  db.get("comments")
    .push(newComment)
    .write();
  // return all the comments make sure the new comment is included
  res.status(201).json({
    msg: "Comment successfully added",
    comments: db.get("comments").value()
  });
  //Bonus:  if request has no body text (or empty) send proper error code and maybe a message
});

router.patch("/:id", (req, res) => {
  if (
    !db
      .get("comments")
      .find({ id: req.params.id })
      .value()
  ) {
    res.status(404).json({ msg: "invalid Id" });
  } else if (!res.body.text === undefined) {
    res.status(400).json({ msg: "please send the new text with your update" });
  } else {
    db.get("comments")
      .find({ id: req.params.id })
      .assign({ text: req.body.text })
      .write();
    return res.status(200).json({ msg: "OK", comments: req.body.text });
  }
});

// Practice below
router.delete("/:id", (req, res) => {
  if (
    !db
      .get("comments")
      .find({ id: req.params.id })
      .value()
  ) {
    return res.status(404).json({ msg: "Invalid ID" });
  }

  db.get("comments")
    .remove({ id: req.params.id })
    .write();

  res.status(200).json({
    msg: "Comment successfully deleted",
    comments: db.get("comments").value()
  });
});

module.exports = router;
