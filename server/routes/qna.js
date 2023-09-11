const express = require("express");
const {
  getQNAs,
  addQNA,
  getQNAByID,
  addCommentToQNA,
} = require("../controllers/qna/qna");

const qnaRouter = express.Router();

qnaRouter.route("/").get(getQNAs).post(addQNA);

qnaRouter.route("/:qnaID").get(getQNAByID).post(addCommentToQNA);

module.exports = qnaRouter;
