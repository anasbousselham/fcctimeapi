// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var moment = require('moment')
moment().format()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API',author:'anas bousselham'});
});

app.get('/api/timestamp', (req, res) => {
  const currentDate = new Date()
  
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  })
})






app.get('/api/timestamp/:date_string', function(req, res) {
 
  let dateString = req.params.date_string;

 
  let date = (/\D/.test(dateString)) ? new Date(dateString) : new Date(parseInt(dateString));

  console.log(date.toString())
  if(date.toString() === "Invalid Date") {
    res.json({
      "error": date.toString()
    })
  }
  
  else {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }


});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});