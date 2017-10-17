var bodyParser 		= require('body-parser');
var express 		  = require('express');
var mongoose		  = require('mongoose');
var helmet 			  = require('helmet');
var app 			    = express();

app.set('port', (process.env.PORT || 5001));

app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

if (process.env.PROD) {
	app.use(function(req, res, next) {
	    if (req.headers['x-forwarded-proto'] != 'https') {
	        res.redirect('https://' + req.headers.host + req.path);
	    }
	    else {
	        return next();
	    }
	});
}

//Create timer
var timer = {
  start: new Date(),
  stop: false
}

// API Requests
var poolRoutes = require('./app/routes/pool');

app.use('/api/pool', poolRoutes);

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});
