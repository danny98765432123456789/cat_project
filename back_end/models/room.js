var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var room = new Schema({
  // _id: Number,
  // temp: Number,
  room: Number,
  timestamp: Number
});
module.exports = mongoose.model('room', room);
