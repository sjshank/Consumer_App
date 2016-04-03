/*
*	nodejs app configuration file.
*/
'use strict';
const bodyParser = require("body-parser"),		//Request body parser
	mongoose = require("mongoose"),
	morgan = require('morgan'),		//logger
	path = require("path");

module.exports = function(express, app){
	app.use(morgan('dev'));
    
/*
*	Built-in middleware express.static for making files such as images/css/js accessable
*/
	app.use(express.static('client'));
	app.use(express.static('node_modules'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
/*
*   Middleware to set request header. Added manually. Next method is called to jump into next middleware function
*/
	app.use(function(req, res, next){
		  res.set('X-Powered-By', 'Consumer Application');
		  next();
		});
}