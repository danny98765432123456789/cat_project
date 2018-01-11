var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var change = new Schema({
  // _id: Number,
  // temp: Number,
  change: String,
  time: Number
});
module.exports = mongoose.model('change', change);
