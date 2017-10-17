var express = require('express');
// var Pool = require('../models/pool');

var router = express.Router();

router.get('/', function(req, res) {
    // TODO: Read values from GPIO pins and return some useful data
    var gpioObj = {
      pump: true,
      light: false,
      heater: false
    };
    console.log('Handled GET request to \'/\' with action \'' + req.query.action + '\'');
    var action = req.query.action
    if (action) {
      if ("pump" === action) {
        console.log("Pump switching: " + gpioObj.pump + " to " + !gpioObj.pump);
        gpioObj.pump = !gpioObj.pump;
        //TODO: Toggle pump GPIO pin
      } else if ("light" === action) {
        console.log("Light switching: " + gpioObj.pump + " to " + !gpioObj.pump);
        gpioObj.pump = !gpioObj.pump;
      } else if ("heater" === action) {
        console.log("Heater switching: " + gpioObj.pump + " to " + !gpioObj.pump);
        gpioObj.pump = !gpioObj.pump;
      }
    }

    res.json(gpioObj);
});

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
