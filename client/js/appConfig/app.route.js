'use strict';

angular
    .module('app.routes', ['ngRoute'])
    
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl:'views/home.html'
            })
            .when('/list', {
                templateUrl:'views/customers.html',
                controller:'customersCtrl',
                controllerAs:'me'
            })
            .when('/customer', {
                templateUrl:'views/addCustomer.html',
                controller:'updateCustomerCtrl',
                controllerAs:'me'
            })
            .otherwise({
                redirectTo:'/home'
            });
   }]);