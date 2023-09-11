const mongoose = require("mongoose");

const mentorApplicationSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true, trim: true },
  approvalStatus: { type: Boolean, default: null, trim: true },
  rating: { type: Number, default: null },
  comment: { type: String, default: null, trim: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("mentorApplication", mentorApplicationSchema);
