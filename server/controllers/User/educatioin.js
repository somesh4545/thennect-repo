const User = require("../../models/User");
const { generateRandomColor } = require("../../utils/utils");

const getEducationDetails = async (req, res) => {
  const { id: userID } = req.params;
  const educationDetails = await User.findOne({ _id: userID }).select(
    "_id education"
  );
  if (!educationDetails) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: educationDetails });
};

const addEducationDetails = async (req, res) => {
  const { id: userID } = req.params;
  const educationDetails = req.body;
  educationDetails.bgColor = generateRandomColor();
  const updatedEducationDetails = await User.findByIdAndUpdate(
    userID,
    { $push: { education: educationDetails } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedEducationDetails) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: JSON.stringify(updatedEducationDetails) });
};

const getEducationByID = async (req, res) => {
  const { id: userID, educationID: educationID } = req.params;

  const user = await User.findById(userID).select("_id education");
  if (!user) {
    res.status(404).json({ error: 404, msg: "No education detail" });
  }
  const educationDetail = user.education.id(educationID);
  res.status(200).json({ data: educationDetail });
};

const deleteEducationDetail = async (req, res) => {
  const { id: userID, educationID: educationID } = req.params;
  const updatedEducationDetailsAfterDelete = await User.findByIdAndUpdate(
    userID,
    { $pull: { education: { _id: educationID } } },
    { new: true }
  );
  if (!updatedEducationDetailsAfterDelete) {
    res.status(404).json({ error: 404, msg: "No education detail" });
  }
  res
    .status(200)
    .json({ data: JSON.stringify(updatedEducationDetailsAfterDelete) });
};

const updateEducationDetail = async (req, res) => {
  const { id: userID, educationID: educationID } = req.params;
  const body = req.body;

  const updatedEducationDetails = await User.findOneAndUpdate(
    { _id: userID, "education._id": educationID },
    { $set: { "education.$": body } },
    { new: true }
  );
  if (!updatedEducationDetails) {
    res.status(404).json({ error: 404, msg: "No education detail" });
  }
  res.status(200).json({ data: JSON.stringify(updatedEducationDetails) });
};

module.exports = {
  getEducationDetails,
  addEducationDetails,
  getEducationByID,
  deleteEducationDetail,
  updateEducationDetail,
};
