'use strict';

// constants
var PORT 	= 8080;
var SERVER	= "0.0.0.0";

// variables
var express     = require('express');
var bodyParser  = require('body-parser');
var mysql       = require('mysql');

var app         = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(express.static('/root/fm-client/dist'));

// support URL-encoded bodies
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.use(allowCrossDomain);

// routes
['api'].forEach(function(route){
    require('./app/routes/' + route)(app);
});


app.listen(PORT, SERVER, function (){
    console.log("Server started on " + SERVER + ":" + PORT);
});
