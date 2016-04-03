/*
*   
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
            
            consumerAPIObject.updateCustomers = function(req) {
                var deferred = $q.defer();
                $http.post(urls.updateCustomer).
                    success(function(data, status, headers, config) {
                        if(data.results){
                            deferred.resolve(data.results);
                        }
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject([data, status, headers, config]);
                    });
                return deferred.promise;
            };
            
        return consumerAPIObject;
    }]);