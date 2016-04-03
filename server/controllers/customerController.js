/*
*	
*/
'use strict';
const log4js = require('log4js'),
      log = log4js.getLogger("customerController"),
      Promise = require('bluebird'),
      CustomerModel = Promise.promisifyAll(require("../models/customer"));

//Add new or update existing customer object in Customer Collection. 
exports.updateCustomer = function(reqObject, resOject) {
    log.debug("Inside updateCustomer methond");
    try{
        //if(typeof req.body.custObj !== 'undefined' && req.body.custObj !== ""){
            var custObj = {};
            
            custObj = {
                name : 'shankariya',
                mobile : '2222222222',
                phone : '3333333333',
                dob : '08/08/2015',
                email : 'shankariya@mail.com',
                address : {
                    flat : 'n205',
                    street : 'Prashanth Nagar',
                    city : 'Hyderabad',
                    state : 'AP',
                    country : 'India',
                    zipcode : '500049'
                }
            };
            
            
            CustomerModel.findOneAndUpdateAsync(
                    { email: custObj.email },
                    {
                        $set: custObj
                        },
                    {
                        upsert: true,
                        new : true
                    })
            .then(function(result){
                console.log(result);
                resOject.json({response : "success"});
            })
            .catch(function(err){
                log.error("Error occurred while saving customer details", err);
                resOject.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
            });
       /* }else{
            resOject.json({validationMsg : "Request is empty"});
        }*/
    }catch(err){
        log.error("Error occurred while adding or updating customer", err);
    }
};


//Get all customers from Customer Collection. 
exports.getCustomers = function(reqObject, resOject) {
    log.debug("Inside getCustomers methond");
    try{
        CustomerModel.findAsync({})
            .then(function(customers){
                resOject.json({response : customers});
            })
            .catch(function(err){
                log.error("Error occurred while retrieving customer details", err);
                resOject.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
            });

    }catch(err){
        log.error("Error occurred while retrieving customers", err);
    }
};