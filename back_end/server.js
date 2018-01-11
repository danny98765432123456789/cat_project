var express = require('express');
var mongoose = require('mongoose');
var temp = require('./models/temp');
var app = express();

// mongoose.connect('mongodb://140.112.41.157:27018/smarthome-central');
mongoose.connect('mongodb://localhost/cat_project');
mongoose.connection.once('open', function(cb) {
  return console.log('Database inited');
});
mongoose.connection.on('error', function(err) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log('  There is something wrong with the connection');
  console.log('  ', err);
  console.log('  Maybe try restarting the MongoServer?');
  console.log('  Exiting Process Now');
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!.');
  return process.exit(1);
});



console.log("===========================Server is starting===========================");

app.all('*', function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 });

app.use(express.static('../front_end'));

var sensor = require('./routes/api_sensor');


app.use('/', sensor);



app.get('/123', function(request, response) {
  response.send("123")
  console.log('Hello~');
});


app.listen('3001', function(request, response) {
  console.log('listening to 3001 port');
});
