/*
*   Factory responsible for request and response to server
*
*/

'use strict';
angular.module('consumerApp')

    .value('urls',{
        retrieveCustomers : 'api/getCustomers.json',
        updateCustomer : 'api/updateCustomer.json'
    })
    
    .factory('consumerAPI', ['$q', '$http', 'urls', 'appConstants',
                 function($q, $http, urls, appConstants) {
        
            var consumerAPIObject = {};
            
            //Making Get request
            consumerAPIObject.retrieveCustomers = function() {
                var deferred = $q.defer();
                $http.get(urls.retrieveCustomers).
                    success(function(data, status, headers, config) {
                            deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
            //Making Add/Update request
            consumerAPIObject.updateCustomer = function(cust) {
                var deferred = $q.defer();
                $http.post(urls.updateCustomer, {customer : cust}).
                    success(function(data, status, headers, config) {
                            deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
            //Making Delete request
            consumerAPIObject.deleteCustomer = function(cust) {
                var deferred = $q.defer();
                $http.delete(urls.updateCustomer, {params : {customer : cust}}).
                    success(function(data, status, headers, config) {
                            deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
        return consumerAPIObject;
    }]);