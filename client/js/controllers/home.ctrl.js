 'use strict';

angular.module('consumerApp')
 
 .controller('homeCtrl', ['customerDataService',
                     function(customerDataService) {
       var me = this;
       customerDataService.reset();
}]);