var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temp = new Schema({
  // _id: Number,
  // temp: Number,
  temp: Number,
  time: Number
});
module.exports = mongoose.model('temp', temp);
