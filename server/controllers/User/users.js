const User = require("../../models/User");
const { generateRandomColor } = require("../../utils/utils");

const getUsers = async (req, res) => {
  const { searchTerm, sort, fields } = req.query;

  const queryObject = {
    $or: [
      { firstName: { $regex: searchTerm, $options: "i" } },
      { lastName: { $regex: searchTerm, $options: "i" } },
      { emailID: { $regex: searchTerm, $options: "i" } },
    ],
    vStatus: true,
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

const addUser = async (req, res) => {
  const data = req.body;
  data.bgColor = generateRandomColor();
  const newUser = await User.create(req.body);
  res.status(201).json({ data: "User created successfully" });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: user });
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const data = req.body;

  const updatedUser = await User.findOneAndUpdate({ _id: userID }, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: JSON.stringify(updatedUser) });
};

const updateVerification = async (req, res) => {
  const emailID = req.params.emailID;
  const updatedUser = await User.findOneAndUpdate(
    { emailID: emailID },
    { $set: { vStatus: true } },
    {
      runValidators: true,
      new: true,
    }
  ).select("_id");
  if (!updatedUser) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: "Updated successfully" });
};

const loginUser = async (req, res) => {
  const emailID = req.params.emailID;
  const body = req.body;
  const user = await User.findOneAndUpdate(
    { emailID: emailID },
    { $set: { token: body.token } },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!user) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: JSON.stringify(user) });
};

const logoutUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { token: null } },
    {
      runValidators: true,
      new: true,
    }
  ).select("_id");
  if (!user) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: "Logout successfull" });
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  updateVerification,
  loginUser,
  logoutUser,
};
