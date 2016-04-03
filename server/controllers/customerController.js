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
            var customer = reqObject.body.customer;
            customer.dob = new Date(customer.dob);
            CustomerModel.findOneAndUpdateAsync(
                    { _email: customer.email },
                    {
                        $set: customer
                    },
                    {
                        upsert: true,
                        new : true
                    })
            .then(function(customer){
                resOject.json({response : customer});
            })
            .catch(function(err){
                log.error("Error occurred while saving customer details", err);
                resOject.json({errMsg : "Failed to add-update customer. Please try after sometime."});
            });

    }catch(err){
        log.error("Error occurred while adding or updating customer", err);
         resOject.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
    }
};


//Get all customers from Customer Collection. 
exports.getCustomers = function(reqObject, resObject) {
    log.debug("Inside getCustomers methond");
    try{
        CustomerModel.findAsync({})
            .then(function(customers){
                resObject.json({response : customers});
            })
            .catch(function(err){
                log.error("Error occurred while retrieving customer details", err);
                resObject.json({errMsg : "Failed to find records. Please try after sometime."});
            });

    }catch(err){
        log.error("Error occurred while retrieving customers", err);
    }
};


//Delete customer from collection based on id and email
exports.deleteCustomer = function(reqObject, resObject) {
    log.debug("Inside deleteCustomer methond");
    try{
        const cust = JSON.parse(reqObject.query.customer);
                
        var deleteCustomer = function(){
            return new Promise(function(resolve, reject){
                CustomerModel.findByIdAndRemoveAsync({_id : cust.id, email : cust.email})
                        .then(function(result){
                            return CustomerModel.findAsync({});
                        })
                        .then(function(customers) {
                            resolve(customers);
                        })
                        .catch(function(err){
                            log.error("Error occurred while removing customer ", err);
                            resObject.json({errMsg : "Failed to delete record. Please try after sometime."});
                        });         
                });
        };
        
        (function(){
            deleteCustomer()
                .then(function(customers){
                     resObject.json({response : customers});
                })
                .catch(function(err){
                     log.error("Error occurred while retrieving customer after removing customer", err);
                     resObject.json({errMsg : "Failed to delete record. Please try after sometime."});
                });
        })();
   
    }catch(err){
        log.error("Error occurred while retrieving customers", err);
        resObject.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
    }
};