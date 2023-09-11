const User = require("../../models/User");

const getCounts = async (req, res) => {
  let totalUsers = await User.find({}).count();
  let bothCount = await User.find({ "userType.type": "Both" }).count();
  let mentorsCount = await User.find({ "userType.type": "Mentor" }).count();
  let menteeCount = await User.find({ "userType.type": "Mentee" }).count();

  res.status(200).json({
    totalUsers,
    bothCount,
    mentorsCount,
    menteeCount,
  });
};

module.exports = { getCounts };
