require("dotenv").config();

const connectToDB = require("./db/connect");
const User = require("./models/User");

const jsonUsers = require("./uses.json");

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    await User.deleteMany();
    await User.create(jsonUsers);
    console.error("su");
  } catch (error) {
    console.error(error);
  }
};

start();
