var express = require('express');
var Gpio = require('onoff').Gpio;
// var Pool = require('../models/pool');

var router = express.Router();

var pump = new Gpio(16, 'out');

router.get('/', function(req, res) {
  console.log('Handled GET request to \'/\' with action \'' + req.query.action + '\'');

  var gpioObj = {};

  //Read values from GPIO pins and return some useful data
  console.log("currentValue: " + pump.read());
  gpioObj.pump = pump.read();

  var action = req.query.action;
  var originalState;

  if (action) {
    if ("pump" === action) {
      originalState = gpioObj.pump;
      gpioObj.pump = originalState == 1 ? 0 : 1;
      pump.writeSync(gpioObj.pump);
      console.log("Pump switching: " + formatValue(originalState) + " to " + formatValue(gpioObj.pump));
    } else if ("light" === action) {
      console.log("Light switching: " + gpioObj.pump + " to " + !gpioObj.pump);
      gpioObj.pump = !gpioObj.pump;
    } else if ("heater" === action) {
      console.log("Heater switching: " + gpioObj.pump + " to " + !gpioObj.pump);
      gpioObj.pump = !gpioObj.pump;
    }
  }

  //cleanup

  res.json(gpioObj);
});

function formatValue(value) {
  return value == 1 ? 'ON' : 'OFF';
}

// router.post('/', function(req, res) {
//     var newsPost = new News();
//     newsPost.date = new Date();
//     newsPost.title = req.body.title;
//     newsPost.content = req.body.content;
//
//     newsPost.save(function(err, newsPost) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(newsPost);
//     });
// });
//
// router.delete('/', function(req, res) {
//     News.remove({}, function(err) {
//         if (err) {
//             res.send(err);
//         }
//         res.json({message: "All news deleted."});
//     });
// });
//
// router.get('/:news_id', function(req, res) {
//     News.findById(req.params.news_id, function(err, newsPost) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(newsPost);
//     });
// });
//
// router.put('/:news_id', function(req, res) {
//     News.findById(req.params.news_id, function(err, newsPost) {
//         if (err) {
//             res.send(err);
//         }
//
//         var origNewsPost = JSON.parse(JSON.stringify(newsPost));
//
//         if (req.body.title != newsPost.title) {
//             newsPost.title = req.body.title;
//         }
//         if (req.body.content != newsPost.content) {
//             newsPost.content = req.body.content;
//         }
//
//         if (origNewsPost != newsPost) {
//             newsPost.date = new Date();
//         }
//
//         newsPost.save(function(err, newsPost) {
//             if (err) {
//                 res.send(err);
//             }
//
//             res.json(newsPost);
//         });
//     });
// });
//
// router.delete('/:news_id', function(req, res) {
//     News.remove(req.params.news_id, function(err) {
//         if (err) {
//             res.send(err);
//         }
//         res.json({message: "Deleted news post."});
//     });
// });

module.exports = router;
