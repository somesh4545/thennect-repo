const express = require("express");
const { getCounts } = require("../controllers/admin/admin");
const {
  updateMentorApplicationById,
  getMentorApplications,
} = require("../controllers/admin/mentorApplication");

const adminRouter = express.Router();

// to add user in db and get users for search functionality
adminRouter.route("/").get(getCounts);

// route to get mentor applications and update them
adminRouter
  .route("/mentorApplications")
  .get(getMentorApplications)
  .patch(updateMentorApplicationById);

module.exports = adminRouter;
