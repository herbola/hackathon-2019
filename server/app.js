const express = require('express');
const path = require('path');
const app = express();
const translate = require('@k3rn31p4nic/google-translate-api');
const say = require('say');
console.log("SERVER IS ONLINE");
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "hackathon-2019")));

       
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post("/post-message", (req, res, next) => {
  var msg = req.body;
  console.log('sent word:', msg);
  translate(msg.message, { to: msg.to }).then(textRes => {
    console.log(textRes);
    console.log('translated word:', textRes.text); 
    console.log('from', textRes.from.language.iso );
    res.status(201).json({
      message: textRes.text,
      from: textRes.from.language.iso,
      to: msg.to
    });
  }).catch(err => {
    console.error(err);
  });
});

app.get("/", (req, res, next) => {
  console.log('next');
})


app.use((req, res , next) => {

  res.sendFile(path.join(__dirname, "hackathon-2019", "index.html"));
})

module.exports = app;
