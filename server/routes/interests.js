const express = require("express");
const {
  getInterests,
  addInterest,
  removeInterest,
} = require("../controllers/Interests/interests");

const interestsRouter = express.Router();

interestsRouter
  .route("/")
  .get(getInterests)
  .post(addInterest)
  .delete(removeInterest);

module.exports = interestsRouter;
