const express = require("express");

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  updateVerification,
  loginUser,
  logoutUser,
} = require("../controllers/User/users");
const {
  getCurrentOperation,
  updateCurrentOperation,
} = require("../controllers/User/currentOperation");
const {
  getEducationDetails,
  addEducationDetails,
  getEducationByID,
  deleteEducationDetail,
  updateEducationDetail,
} = require("../controllers/User/educatioin");
const {
  findMentors,
  mentorApplicationStatus,
  addMentorApplication,
} = require("../controllers/User/mentor");

const userRouter = express.Router();

// to add user in db and get users for search functionality
userRouter.route("/").get(getUsers).post(addUser);

// to find user by id and update user by id
userRouter.route("/:id").get(getUser).patch(updateUser);

userRouter.route("/:emailID/verify_email").post(updateVerification);
userRouter.route("/:emailID/login").post(loginUser);
userRouter.route("/:id/logout").post(logoutUser);

// to get and update the current operation the user is doing
userRouter
  .route("/:id/currentOperation")
  .get(getCurrentOperation)
  .patch(updateCurrentOperation);

// to get and update the education details of the user
userRouter
  .route("/:id/education")
  .get(getEducationDetails)
  .post(addEducationDetails);

// for particular education detail get, delete
userRouter
  .route("/:id/education/:educationID")
  .get(getEducationByID)
  .delete(deleteEducationDetail)
  .patch(updateEducationDetail);

// route for suggestion mentors to user
userRouter.route("/:id/suggestMentors").get(findMentors);

// route for mentor applications
userRouter
  .route("/:id/mentor")
  .get(mentorApplicationStatus)
  .post(addMentorApplication);

module.exports = userRouter;
