const { RTMClient } = require('@slack/client');
require('dotenv').config();
const token = process.env.TOKEN;

const moment = require('moment-timezone');

const rtm = new RTMClient(token);
rtm.start();

rtm.on('message', (message) => {
  let text = message.text
  
  if (text == ("야")) {
    rtm.sendMessage("왜", message.channel);
  }

  else if (text.includes("시간")) {
    rtm.sendMessage(moment().tz('Asia/Seoul').format('h:mm'), message.channel);
  }

  else if (text.includes("출석")) {
    rtm.sendMessage("확인", message.channel);
    time = moment().tz('Asia/Seoul').format('h:mm');
    time_num = time.split(':');
    minutes = (Number)(time_num[0]) * 60 + (Number)(time_num[1]);
    late = minutes - 600;
    if (late > 0) {
      rtm.sendMessage(late + "분 지각", message.channel)
    }
  }

}
);