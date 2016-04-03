'use strict';

angular.module('consumerApp')
    
    .controller('customersCtrl', ['$scope', '$rootScope', '$log', 'consumerAPI', 'appConstants',
                     function($scope, $rootScope, $log, consumerAPI, appConstants) {
       var me = this;
       me.hasError = false;
       me.customerList = [];
       (function () {
           $log.log("Retreiving customers");
            consumerAPI.retrieveCustomers().then( function(data) {
                    if(data && data.response){
                        me.customerList = data.response;
                    }
                })
                .catch(function(err){
                    $log.log("Error occurred while Retreiving customers", err);
                    me.hasError = true;
                    me.errorMsg = appConstants.SERVICE_ERROR;
                });         
       })();
       
       $scope.deleteCustomer = function (cust) {
           $log.log(cust);
       };
       
       $scope.editCustomer = function (cust) {
           $rootScope.formHeader = 'Edit'
           $log.log(cust);
       };
    }])
    
    
     .controller('updateCustomerCtrl', ['$scope', '$rootScope', '$log', 'consumerAPI', 'appConstants',
                     function($scope, $rootScope, $log, consumerAPI, appConstants) {
       var me = this;
       me.hasError = false;
       
       $scope.updateCustomer = function () {
          
       };
       
    }]);