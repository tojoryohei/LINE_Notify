const token = require('./token');
const LINE_NOTIFY_TOKEN = token;
const LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

function sendMessage() {
  const options =
    {
      "method"  : "post",
      "payload" : "message=" + "a",
      "headers" : {"Authorization" : "Bearer "+ LINE_NOTIFY_TOKEN}
    };
  UrlFetchApp.fetch(LINE_NOTIFY_API, options);
}
