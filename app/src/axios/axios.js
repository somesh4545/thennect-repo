import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://radiant-plateau-59096.herokuapp.com/api/v1',
  // baseURL: 'http://localhost:5000/api/v1',
});

export default instance;

//cd  C:\Users\somes\AppData\Local\Android\Sdk\platform-tools>adb devices
// List of devices attached
// 62ea45730806    device

// C:\Users\somes\AppData\Local\Android\Sdk\platform-tools>adb -s 62ea45730806 reverse tcp:5000 tcp:5000
// adb -s emulator-5554 reverse tcp:5000 tcp:5000
