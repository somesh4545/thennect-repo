const mongoose = require("mongoose");

// type=bussiness, other, job, education
// post/branch=computer engineering, manger
// field/domain=btech,analyst
// institute=name of institute

const currentOperationSchema = mongoose.Schema({
  profession: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
    default: "",
  },
  domain: {
    type: String,
    required: true,
    default: "",
  },
  institution: {
    type: String,
    required: true,
    default: "",
  },
});

const educationSchema = mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  startYear: {
    type: String,
    required: true,
  },
  endYear: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    default: "",
  },
  bgColor: { type: String, required: true },
});

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: String,
  emailID: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNo: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  interests: {
    type: [String],
    default: [],
  },
  oneLiner: { type: String, trim: true, default: null },
  description: { type: String, trim: true, default: null },
  userType: { type: Object, default: null },
  rating: { type: Number, default: 0 },
  currentOperations: {
    type: currentOperationSchema,
    default: null,
  },
  education: {
    type: [educationSchema],
    default: [],
  },
  token: { type: String, default: null },
  img_url: { type: String, default: null },
  bgColor: { type: String, required: true },
  vStatus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", userSchema);
