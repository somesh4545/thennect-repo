const chatRooms = require("../../models/chatRooms");
const User = require("../../models/User");

const testing = async (req, res) => {
  const chat_roms = await chatRooms.find({});
  res.status(200).json({ data: chat_roms });
};

const createChatRoom = async (req, res) => {
  const body = req.body;

  const check = await chatRooms
    .findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: body.senderID } } },
        { users: { $elemMatch: { $eq: body.receiverID } } },
      ],
    })
    .populate("users", "firstName img_url bgColor token _id")
    .select("_id");
  if (!check) {
    const data = {
      users: [body.senderID, body.receiverID],
      admin: body.senderID,
    };
    const chats = await chatRooms.create(data);
    const chatroom = await chatRooms
      .findById(chats._id)
      .populate("users", "firstName img_url bgColor _id")
      .select("_id");
    return res
      .status(200)
      .json({ data: JSON.stringify(chatroom), msg: "newly created" });
  }
  res.status(200).json({ data: JSON.stringify(check), msg: "already created" });
};

// for the initital chat screen fetching all the chat users of the current user
const allChats = async (req, res) => {
  const { id: userID } = req.params;
  const { sort, fields } = req.query;

  let result = chatRooms
    .find({
      users: { $elemMatch: { $eq: userID } },
    })
    .populate("users", "firstName bgColor img_url _id token");

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

  const chats = await result;
  res.status(200).json({ data: chats, total: chats.length });
};

const getChatRoomMsgs = async (req, res) => {
  const { id: chatRoomID } = req.params;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  var skip = (page - 1) * limit;

  const msgs = await chatRooms
    .findById(chatRoomID)
    .slice("chats", [skip, limit]);
  if (!msgs) {
    res.status(404).json({ error: 404, msg: "No chat room with this id" });
  }
  res
    .status(200)
    .json({ msg: JSON.stringify(msgs.chats), total: msgs.chats.length });
};

const deleteAllChatRoomMsgs = async (req, res) => {
  const { id: chatRoomID } = req.params;
  const msgs = await chatRooms.findByIdAndUpdate(
    chatRoomID,
    {
      $set: { chats: [], lastMsg: null },
    },
    { new: true }
  );
  if (!msgs) {
    res.status(404).json({ error: 404, msg: "No chat room with this id" });
  }
  res
    .status(200)
    .json({ msg: JSON.stringify(msgs.chats), total: msgs.chats.length });
};

const addMsgToChatRoom = async (req, res) => {
  const { id: chatRoomID } = req.params;
  const { sender_id, msg } = req.body;
  if (sender_id == null || msg == null) {
    res.status(404).json({ error: 404, msg: "All fileds are required" });
  }
  req.body.time = Date.now();
  req.body = JSON.stringify(req.body);
  const msgs = await chatRooms
    .findByIdAndUpdate(chatRoomID, {
      $push: { chats: { $each: [req.body], $position: 0 } },
      lastMsg: req.body,
      lastMsgTime: Date.now(),
    })
    .select("_id");
  if (!msgs) {
    res.status(404).json({ error: 404, msg: "No chat room with this id" });
  }
  res.status(200).json({ msg: "success", time: Date.now() });
};

const deleteAllChatRooms = async (req, res) => {
  await chatRooms.deleteMany({});
};

module.exports = {
  testing,
  createChatRoom,
  allChats,
  getChatRoomMsgs,
  addMsgToChatRoom,
  deleteAllChatRooms,
  deleteAllChatRoomMsgs,
};
