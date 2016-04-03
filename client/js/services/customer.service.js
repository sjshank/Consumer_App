/*
*   Service responsible for persisting customer data
*
*/


'use strict';
angular.module('consumerApp')

.factory('customerDataService', 
			function() {
				 var _init = {
                        name : "",
                        mobile : "",
                        phone : "",
                        dob : "",
                        email : "",
                        address : {
                            flat : "",
                            street :"",
                            city : "",
                            state : "",
                            country : "India"
                        }
                };
                
                var _cust = {};
                var _reset = function() {  
                    _cust = angular.copy(_init);
                    return _cust;
                };
				var _setCustomer = function(obj) {
					_cust = obj;
                    _cust.dob = getFormattedDate(_cust);
				};
				var _getCustomer = function() {
					return _cust;
				};
                
				return {
                    'getCustomer': _getCustomer,
                    'setCustomer': _setCustomer,
                    'reset': _reset
                };
	});
    
    
 function getFormattedDate(cust) {
    var d = new Date(cust.dob)
    var month = d.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
    var day = d.getDate();
        day = day < 10 ? '0' + day : day;
    var year = d.getFullYear();
    return day + "/" + month + "/" + year;
 };
