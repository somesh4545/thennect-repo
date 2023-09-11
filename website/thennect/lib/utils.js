function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

function convertDateToFormat(date) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var now = new Date(date);
  return (
    now.getDate() + " " + months[now.getMonth()] + ", " + now.getFullYear()
  );
}

function convertDateToSimpleFormat(date) {
  var now = new Date(date);
  return now.getHours() + ":" + now.getMinutes();
}

export { generateRandomColor, convertDateToFormat, convertDateToSimpleFormat };
