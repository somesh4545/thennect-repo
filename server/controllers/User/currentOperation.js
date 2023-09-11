const User = require("../../models/User");

const getCurrentOperation = async (req, res) => {
  const { id: userID } = req.params;

  const currentOperation = await User.findOne({ _id: userID }).select(
    "_id currentOperations"
  );
  if (!currentOperation) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }
  res.status(200).json({ data: currentOperation });
};

const updateCurrentOperation = async (req, res) => {
  const { id: userID } = req.params;
  const data = req.body;

  const updatedCurrentOperation = await User.findByIdAndUpdate(
    userID,
    { $set: { currentOperations: data } },
    {
      new: true,
      runValidators: true,
    }
  ).select("_id currentOperations");

  if (!updatedCurrentOperation) {
    res.status(404).json({ error: 404, msg: "User not found" });
  }

  res.status(200).json({ data: updatedCurrentOperation });
};

module.exports = {
  getCurrentOperation,
  updateCurrentOperation,
};
