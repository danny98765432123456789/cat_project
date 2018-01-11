var express = require('express');
var mongoose = require('mongoose');
var request = require('request');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({
  extended: false
});

var hum = require('../models/hum');
var temp = require('../models/temp');
var room = require('../models/room');
var change = require('../models/change');


var router = express.Router();

//==================================GoogleMap API==================================


// router.route('/hum/:hum_id')
//
//   .get(function(req, res) {
//     hum.findOne({
//       _id: req.params.sensor_id
//         }).exec(function(err, result) {
//       res.send(result);
// // console.log(result);
//      })
//     })

router.route('/hum')

  .get(function(req, res) {

    hum.find({

    }).exec(function(err, result) {
      res.send(result);
      // console.log(result);
    })
  })
router.route('/temp')

  .get(function(req, res) {
    temp.find({

    }).exec(function(err, result) {
      res.send(result);
      // console.log(result);
    })
  })
router.route('/room')

  .get(function(req, res) {
    room.find({

    }).exec(function(err, result) {
      res.send(result);
      // console.log(result);
    })
  })

router.route('/change')

  .get(function(req, res) {
    change.find({

    }).exec(function(err, result) {
      res.send(result);
      // console.log(result);
    })
  })
router.post('/change', parseUrlencoded, function(request, response) {
    var jsonCMD = {
      change: request.body.change
    }
    console.log(request.body);
    jsonCMD.timestamp = +new Date();
    newCMD = new change(jsonCMD);
    newCMD.save(function(err) {
      if (!err) {
        response.send("Success!");
      }
      else{
        console.log(err);
      }
    });
  })
module.exports = router;
