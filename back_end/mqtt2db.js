var mqtt = require('mqtt');
var mongoose = require('mongoose');
var typeOf = require('typeOf')

// var client1 = mqtt.connect('mqtt://test.mosquitto.org');
// var client2 = mqtt.connect('mqtt://test.mosquitto.org');
var client1 = mqtt.connect('http://140.112.41.157');
var client2 = mqtt.connect('http://140.112.41.157');
var hum = require('./models/hum');
var temp = require('./models/temp');

var hum ;
var mes1;
var mes2;
mongoose.connect('mongodb://localhost/cat_project');

// When the connection is established
client1.on('connect', function() {
  // Subscribe from MQTT topics
  client1.subscribe('7697-Hum');
})

client1.on('message', function(topic, message) {
  console.log("Topic: " + topic.toString());
  console.log("Message: " + message.toString() + "\n");
})

// When we received messages from MQTT brokers
client1.on('message', function(topic, message) {
  // console.log(message);
  mes = '{ "hum": '+ message.toString() +' }';
  json_packet = JSON.parse(mes.toString());
  newDocument = new hum(json_packet);
  newDocument.save(function(err, result) {
    // console.log(err);
  });
})

// When the connection is established
client2.on('connect', function() {
  // Subscribe from MQTT topics
  client2.subscribe('7697-Temp');
})

client2.on('message', function(topic, message) {
  console.log("Topic: " + topic.toString());
  console.log("Message: " + message.toString() + "\n");
})

// When we received messages from MQTT brokers
client2.on('message', function(topic, message) {
  // console.log(message);
  mes2 = '{ "temp": '+ message.toString() +' }';
  json_packet = JSON.parse(mes2.toString());
  newDocument = new temp(json_packet);
  newDocument.save(function(err, result) {
    // console.log(err);
  });
})
