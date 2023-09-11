const mongoose = require("mongoose");

// type=bussiness, other, job, education
// post/branch=computer engineering, manger
// field/domain=btech,analyst
// institute=name of institute

const commentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comment: { type: String, required: true, trim: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const qnaSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  comments: {
    type: [commentSchema],
    default: [],
  },
  commentsCount: { type: Number, default: 0 },
  categories: { type: [], required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("QNA", qnaSchema);
