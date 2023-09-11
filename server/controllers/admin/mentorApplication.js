const MentorApplication = require("../../models/mentorApplication");
const User = require("../../models/User");
const { sendNotificationToTopic } = require("../../utils/utils");

const getMentorApplications = async (req, res) => {
  const { approvalStatus, sort, fields } = req.query;

  //   res.status(200).json({ data: user });
  let queryObject = {};
  if (approvalStatus) {
    queryObject.approvalStatus = approvalStatus;
  } else {
    queryObject.approvalStatus = null;
  }

  let result = MentorApplication.find(queryObject);

  // sorting features
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // selecting required fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit).populate("user", "firstName");

  const applications = await result;

  res.status(200).json({
    data: JSON.stringify(applications),
    count: applications.length,
    page,
    limit,
    skip,
  });
};

const updateMentorApplicationById = async (req, res) => {
  const { id, user_id, approvalStatus, rating, comment } = req.body;
  if (id && approvalStatus != null && rating && comment) {
    await MentorApplication.findByIdAndUpdate(id, req.body);
    await User.findByIdAndUpdate(user_id, { rating: rating });
    if (approvalStatus == "false") {
      sendNotificationToTopic(
        user_id,
        "Mentor application",
        "Your application is not approved",
        "true",
        "Profession",
        ""
      );
    } else {
      sendNotificationToTopic(
        user_id,
        "Mentor application",
        "Congratulations your application is been approved 🎉",
        "true",
        "Profession",
        ""
      );
    }
    res.status(200).json({ data: "Success" });
  } else {
    res.status(400).json({ error: 400, msg: "Bad input" });
  }
};

module.exports = { getMentorApplications, updateMentorApplicationById };
