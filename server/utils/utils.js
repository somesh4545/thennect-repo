const admin = require("firebase-admin");

function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

function sendNotificationToTopic(
  topic,
  title,
  body,
  openScreen,
  screen,
  screenID
) {
  let payload = {
    notification: {
      title: title,
      body: body,
      channelId: "default",
      android_channel_id: "default",
    },

    data: {
      openScreen: openScreen,
      screen: screen,
      id: screenID,
    },
  };

  let options = {
    contentAvailable: true,
    priority: "high",
  };

  admin
    .messaging()
    .sendToTopic(topic, payload, options)
    .then(function (response) {
      // console.log("Successfully sent message! Server response:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
}

module.exports = { generateRandomColor, sendNotificationToTopic };
