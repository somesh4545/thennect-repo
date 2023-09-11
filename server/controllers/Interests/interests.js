const Interests = require("../../models/Interests");

const getInterests = async (req, res) => {
  const id = "63185bc4c901273356d9ca5a";
  const interest = await Interests.findById(id);
  res.status(200).json({ data: JSON.stringify(interest) });
};

const addInterest = async (req, res) => {
  const data = req.body;
  var arr = data.interests.split(",");
  const id = "63185bc4c901273356d9ca5a";
  arr = arr.map((s) => s.trim());
  const updated = await Interests.findByIdAndUpdate(
    id,
    { $push: { interests: { $each: arr } } },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ data: "Success" });
};

const removeInterest = async (req, res) => {
  const { remove } = req.query;
  const id = "63185bc4c901273356d9ca5a";
  const updatedInterests = await Interests.findByIdAndUpdate(
    id,
    { $pull: { interests: remove } },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ data: "Success" });
};

module.exports = { getInterests, addInterest, removeInterest };
