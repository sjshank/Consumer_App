/*
*	Importing required modules in app.js
*/
const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	log4js = require('log4js'),
    route = require('./server/config/router'),
	app = express();

const server = require('./server')(app),
      appConfig = require('./server/config/appConfig')(express, app);
      
var log = log4js.getLogger("app");

var landingPageCB = function(req, res){
    res.sendFile(__dirname + '/server/views/landingPage.html');
};

//Render landing page
app.get('/', landingPageCB);

app.use('/api', route);

Render landing page
app.use('*', landingPageCB);

/*
*	Error Handler. Development error handler.
*/
if (app.get('env') === 'development') {
		  app.use(function(err, req, res, next) {
		  	log.error("unexpected error occur ", err);
		  	console.log(err);
			res.status(err.status || 500);
			res.json({errMsg: "Currently we are experiencing technical difficulties. Please try after some time."});
		  });
}

