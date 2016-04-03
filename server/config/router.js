/*
*	Routing configuration file
*/
'use strict';
var express = require("express"),
    customerCtrl = require("../controllers/customerController.js"),
    router = express.Router();

router.route('/updateCustomer.json')
    .post(function(req, res) {
        customerCtrl.updateCustomer(req, res);
    })
    .delete(function(req, res) {
        customerCtrl.deleteCustomer(req, res);
    });
    
router.route('/getCustomers.json')
    .get(function(req, res) {
        customerCtrl.getCustomers(req, res);
    });

module.exports = router;