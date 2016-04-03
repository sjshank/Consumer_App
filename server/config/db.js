/*
*	Configuring and creating mongodb connection using mongoose
*/
'use strict';
const Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    log4js = require('log4js'),
	URL = "mongodb://127.0.0.1:27017/consumerApp";
    
var log = log4js.getLogger("db");

mongoose.connectAsync(URL)
    .then(function(db){
        log.info("Connection established !");
        console.log("Connection established !");
    })
    .catch(function(err) {
        log.error("Unable to connect database ", err);
		process.exit(1);
    });
    
module.exports = mongoose;