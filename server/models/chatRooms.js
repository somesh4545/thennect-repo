const mongoose = require("mongoose");

const chatRoomsSchema = mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  isGroupChat: { type: Boolean, default: false },
  chats: { type: [String], default: [] },
  lastMsg: { type: String, default: null },
  lastMsgTime: { type: Date, default: Date.now() },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("chatRooms", chatRoomsSchema);
