'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'CghEYN3OeZ7zDozttx0bj/kEB9YY499kFK7y7qUPGgvVQ9SILuHiOTe9xWEUqg//jnbeUyNrqx3M8Jveht17AIW3zbbEg/vPUv43H9O02i8IQemwhwmr3z549xbPZyHyT8CxUDrxij4KjbzS7we5IgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'c51dc7f8d2919ffe4919b7c1ba69a414',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
//app.post('/callback', line.middleware(config), (req, res) => {
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  var message_1 = event.message.text
  console.log('受けたメッセージ：',message_1)

  switch (message_1){
    case 'ナナ朝ごはん食べた？':
      var text = 'まだ～'
      const echo1 = { type: 'text', text: text};
      console.log(echo1);
      return client.replyMessage(event.replyToken, echo1);
      break;
    case 'ナナ散歩行った？':
      var text = '行ってない～'
      const echo2 = { type: 'text', text: text};
      console.log(echo2);
      return client.replyMessage(event.replyToken, echo2);
      break;
    case 'ナナ今何してる？':
//      var NodeWebcam = require( "node-webcam" );

//      var opts = {
//        width: 320,
//        height: 240,
//        quality: 100,
//        delay: 0,
//        saveShots: true,
//        output: "jpeg",
//        device: "GEMBIRD",
//        callbackReturn: "location",
//        verbose: false
//      };

//      var Webcam = NodeWebcam.create( opts );
//      Webcam.capture( "nana_picture", function( err, data ) {} );
//      NodeWebcam.capture( "nana_picture", opts, function( err, data ) {
//      });

//      Webcam.list( function( list ) {
//        var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
//      });

//      var opts = {
//        callbackReturn: "base64"
//      };

//      NodeWebcam.capture( "nana_picture", opts, function( err, data ) {
//        var image = "<img src='" + data + "'>";
////        return client.replyMessage(event.replyToken, {type: 'image', image: image});
//      });


// nanaphoto.sh シェルで画像取得　--＞
      const { exec } = require('child_process')
      exec('sudo ./nanaphoto.sh',(err, stdout, stderr) => {
          if (err) {
            console.log('stderr: ${stderr}')
          return
          }
          console.log('stdout: ${stdout}')
      })
// nanaphoto.sh シェルで画像取得　＜--
//      var text3 = '知らん'
//      const echo3 = { type: 'text', text: text3};
//      console.log(echo3);
//      return client.replyMessage(event.replyToken, echo3);
      break;
    default:
      var text2 = event.message.text
      const echo3 = { type: 'text', text: text2 + 'ちゃうわ！'};
      console.log(echo3);
      return client.replyMessage(event.replyToken, echo3);
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
