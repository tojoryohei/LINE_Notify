const token = require('./token');
const LINE_NOTIFY_TOKEN = token;
const LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

function sendMessage() {
  const today = new Date();
  today.setHours(07);
  today.setMinutes(30);
  today.setSeconds(00);
  const tomorrow = new Date(Date.parse(today) + (24 * 60 * 60 * 1000));
  
  const monthNum = (today.getMonth())+1;
  const dateNum = today.getDate();
  const day = today.getDay();
  const dayArray = ['日','月','火','水','木','金','土'];
  const thisDate = monthNum + "月" + dateNum + "日";
  let sendMessage = "\n" + thisDate + "(" + dayArray[day] + ")"; 

  let events = CalendarApp.getEvents(today, tomorrow);
  let schedule = "";
  let messageArray = []; 

  for (let i in events) {
    const number = "\n" + (Number(i) + 1) + "つ目";
    const endHours = events[i].getEndTime().getHours();
    intHours = parseInt(endHours)
    if(intHours<8){
      intHours += 24
    }
    const endMinutes = "0" + events[i].getEndTime().getMinutes();
    const endTime = intHours +":"+ endMinutes.slice(-2);
    const time = "\n【期限】" + endTime;
    const title = "\n【課題】" + events[i].getTitle();

    const message = number + time + title;
    messageArray.push(message);
 }

 for(let j=0; j<=messageArray.length-1; j++){
   schedule += messageArray[j];
 }
 if(schedule != "" && schedule != null){
  sendMessage += "の課題です。\n" + schedule;

  const options =
    {
      "method"  : "post",
      "payload" : "message=" + sendMessage,
      "headers" : {"Authorization" : "Bearer "+ LINE_NOTIFY_TOKEN}
    };
  UrlFetchApp.fetch(LINE_NOTIFY_API, options);
 }
