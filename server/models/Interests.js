const mongoose = require("mongoose");

const interestsSchema = mongoose.Schema({
  interests: { type: [String], default: [] },
});

module.exports = mongoose.model("interest", interestsSchema);
