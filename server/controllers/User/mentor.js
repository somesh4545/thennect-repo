const User = require("../../models/User");
const MentorApplication = require("../../models/mentorApplication");

const findMentors = async (req, res) => {
  const { id: userID } = req.params;
  const { sort, fields } = req.query;

  const user = await User.findById(userID).select("userType");
  if (!user) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  //   res.status(200).json({ data: user });

  const queryObject = {
    _id: { $ne: userID },
    "userType.fields": { $in: user.userType.fields },
    $or: [{ "userType.type": "Mentor" }, { "userType.type": "Both" }],
  };

  let result = User.find(queryObject);

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

  result = result.skip(skip).limit(limit);

  const users = await result;

  res.status(200).json({
    data: JSON.stringify(users),
    count: users.length,
    page,
    limit,
    skip,
  });
};

const addMentorApplication = async (req, res) => {
  const body = req.body;
  await MentorApplication.deleteOne({ user: body.user });
  const data = await MentorApplication.create(body);
  res.status(201).json({ data: "Success" });
};

const mentorApplicationStatus = async (req, res) => {
  const { id: userID } = req.params;
  // res.send(userID);
  const application = await MentorApplication.findOne({ user: userID });
  if (!application) {
    res.status(404).json({ error: 404, msg: "Application not found" });
  }
  res.status(200).json({ data: application });
};

module.exports = {
  findMentors,
  mentorApplicationStatus,
  addMentorApplication,
};
