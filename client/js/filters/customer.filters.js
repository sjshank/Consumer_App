'use strict';

angular.module('consumerApp')

.filter('convertDate', ['$rootScope', function($rootScope) {
						return function(input) {
							return (new Date(input)).toDateString();
						};
}]);