'use strict';

// constants
var PORT 	= 80;
var SERVER	= "0.0.0.0";
var ENV = "dev"; // dev | prod

// modules
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// configuration
// var config = require('./app/config/api')(ENV);
// console.log(config);

// team
var app = express();

// allow access for AJAX calls from any domain
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

// the client app lives here
app.use(express.static('/root/fm-client/dist'));

// support URL-encoded bodies
app.use(bodyParser.urlencoded({     
    extended: true
}));

// routes
['api'].forEach(function(route){
    require('./app/routes/' + route)(app);
});

// Run Forrest, run!
app.listen(PORT, SERVER, function (){
    console.log("Server started on " + SERVER + ":" + PORT);
});