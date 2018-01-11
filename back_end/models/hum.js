var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hum = new Schema({
  // _id: Number,
  // temp: Number,
  hum: Number
});
module.exports = mongoose.model('hum', hum);
