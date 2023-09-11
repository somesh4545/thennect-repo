require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectToDB = require("./db/connect");
const admin = require("firebase-admin");
const cors = require("cors");

const userRouter = require("./routes/users");
const interestsRouter = require("./routes/interests");
const chatsRouter = require("./routes/chats");
const qnaRouter = require("./routes/qna");
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handlers");

var serviceAccount = require("./config/serviceAccountKey.json");
const { parse } = require("dotenv");
const adminRouter = require("./routes/admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());

// middleware
app.use(express.json());

// routes
app.get("/api/v1/", (req, res) => {
  res.json({ msg: "running" });
});

// users - add, update, get, get id,
//   - users education, by id add delete, get
app.use("/api/v1/users", userRouter);

// route for getting and adding interests which would be used for mapping
app.use("/api/v1/interests", interestsRouter);

// router for chats
app.use("/api/v1/chats", chatsRouter);

// router for qna
app.use("/api/v1/qna", qnaRouter);

// router for admin
app.use("/api/v1/admin-api-xyz", adminRouter);

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI);
    const server = app.listen(port, () => {
      console.log("listening on port " + port);
    });

    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
      },
    });

    var users = new Map();

    io.on("connection", (socket) => {
      socket.on("setup", (userData) => {
        // console.log("connection created " + JSON.stringify(userData));
        socket.join(userData._id);
        users.set(userData._id, socket);
        socket.emit("connected");
      });

      socket.on("join_room", (room) => {
        socket.join(room);
        console.log(
          "user joined to chat room " + room + " socket connected " + socket.id
        );
      });

      socket.on("exit_room", (room) => {
        socket.leave(room);
        // console.log(
        //   "user left the chat room " +
        //     room +
        //     " socket disconnected " +
        //     socket.id
        // );
      });

      socket.on("new_message", (payload) => {
        var chat = JSON.parse(payload);
        payload = JSON.parse(payload);

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
          if (user._id == payload.sender_id) return;
          // console.log(socket.connected);
          if (users.has(user._id)) {
            var s = users.get(user._id);
            // console.log(s.connected);
            if (s.connected) {
              socket
                .in(user._id)
                .emit("message_recieved", JSON.stringify(payload));
            } else {
              sendNotification(
                user.token,
                user._id,
                payload.chatName,
                payload.chatRoomID,
                payload.msg
              );
              // console.log("user has gone need to send notification");
            }
            // send notification to user now
          } else {
            sendNotification(
              user.token,
              user._id,
              payload.chatName,
              payload.chatRoomID,
              payload.msg
            );
            // console.log("you are alone need to send notification");
            // now send notification to all
          }
        });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
    // var route,
    //   routes = [];

    // app._router.stack.forEach(function (middleware) {
    //   if (middleware.route) {
    //     // routes registered directly on the app
    //     routes.push(middleware.route);
    //   } else if (middleware.name === "router") {
    //     // router middleware
    //     middleware.handle.stack.forEach(function (handler) {
    //       route = handler.route;
    //       route && routes.push(route);
    //     });
    //   }
    // });
    // console.log(routes);
  } catch (error) {
    console.error(error);
  }
};

start();

function sendNotification(token, id, groupName, chatRoomID, msg) {
  // Define who to send the message to

  // Define the message payload
  if (msg.replace(/\s+/g, "").length > 40) {
    msg = msg.slice(0, 40) + "...";
  }

  let payload = {
    notification: {
      title: "Message from " + groupName,
      body: msg,
      channelId: "default",
      android_channel_id: "default",
    },

    data: {
      openScreen: "true",
      screen: "Chats",
      id: chatRoomID,
    },
  };

  let options = {
    contentAvailable: true,
    priority: "high",
  };

  // Send a message to the condition with the provided payload
  if (token) {
    admin
      .messaging()
      .sendToDevice(token, payload, options)
      .then(function (response) {
        // console.log("Successfully sent message! Server response:", response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
      });
  } else {
    admin
      .messaging()
      .sendToTopic(id, payload, options)
      .then(function (response) {
        // console.log("Successfully sent message! Server response:", response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
      });
  }
}
