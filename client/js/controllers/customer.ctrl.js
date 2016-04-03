/*
*   Controllers for rendering customer list and adding/updating customer
*/

'use strict';

angular.module('consumerApp')

// Controller for rendering customer list. 
    .controller('customersCtrl', ['$scope', '$rootScope', '$log', 'consumerAPI', 'appConstants',
                     '$filter', 'customerDataService', '$location',
                     function($scope, $rootScope, $log, consumerAPI, appConstants, filter, customerDataService, $location) {
       var me = this;
       me.hasError = false;
       me.customerList = [];
       customerDataService.reset();
       (function () {
           $log.log("Retreiving customers");
            consumerAPI.retrieveCustomers().then( function(data) {
                    if(data && data.errMsg){
                        me.hasError = true;
                        me.errorMsg = data.errMsg;
                    }
                    else if(data && data.response){
                         me.hasError = false;
                         me.customerList = formatAddress(data.response);
                    }
                    else{
                        me.hasError = true;
                        me.errorMsg = appConstants.SERVICE_ERROR;
                    }
                })
                .catch(function(err){
                    $log.log("Error occurred while Retreiving customers", err);
                    me.hasError = true;
                    me.errorMsg = appConstants.SERVICE_ERROR;
                });         
       })();
       
       //Function for handling remove custmor event
       $scope.deleteCustomer = function (cust) {
           $log.log("Delete customer");
           var reqObject = {
               id : cust._id,
               email : cust.email
           };
            consumerAPI.deleteCustomer(reqObject).then( function(data) {
                    if(data && data.errMsg){
                        me.hasError = true;
                        me.errorMsg = data.errMsg;
                    }
                    else if(data && data.response){
                         me.hasError = false;
                         me.customerList = formatAddress(data.response);
                    }
                    else{
                        me.hasError = true;
                        me.errorMsg = appConstants.SERVICE_ERROR;
                    }
                })
                .catch(function(err){
                    $log.log("Error occurred while deleting customers", err);
                    me.hasError = true;
                    me.errorMsg = appConstants.SERVICE_ERROR;
                });   
       };
       
       //Function for handling edit custmor event
       $scope.editCustomer = function (cust) {
           customerDataService.setCustomer(cust);
           $rootScope.formHeader = 'Edit';
           $location.path('/customer');
       };
    }])
    

// Controller for Adding/updating customer details.     
     .controller('updateCustomerCtrl', ['$scope', '$rootScope', '$log', 'consumerAPI', 'appConstants', '$sce', 'customerDataService',
                     function($scope, $rootScope, $log, consumerAPI, appConstants, $sce, customerDataService) {
       var me = this;
       me.hasError = false;
       me.success = false;
       me.customer = customerDataService.getCustomer();
       
       $scope.updateCustomer = function (cust) {

          consumerAPI.updateCustomer(cust).then( function(data) {
                    if(data && data.errMsg){
                        me.hasError = true;
                        me.errorMsg = data.errMsg;
                    }
                    else if(data && data.response){
                        me.success = true;
                        me.hasError = false;
                        me.successMsg = $sce.trustAsHtml(appConstants.SUCCESS_MSG); //$sce for ensuring ng-bind-html expression is safe
                    }else{
                        me.hasError = true;
                        me.errorMsg = appConstants.SERVICE_ERROR;
                    }
                })
                .catch(function(err){
                    $log.log("Error occurred while saving/updating customers", err);
                    me.success = false;
                    me.hasError = true;
                    me.errorMsg = appConstants.SERVICE_ERROR;
                });  
       };
       
    }]);
    
//function for formatting address    
    function formatAddress(data){
        for(var i = 0; i <= data.length -1; i++){
            const addr = data[i]['address'];
            data[i]['address']['addrStr'] = addr.flat + ', ' + addr.street + ', ' + addr.city + ', ' + addr.state
                       + ', ' + addr.country + ' - ' + addr.zipcode;
        }     
        return data;
    };