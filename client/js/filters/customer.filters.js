'use strict';

angular.module('consumerApp')

.filter('address', [ function() {
						return function(addr) {
                            addr.addrStr = addr.flat + ', ' + addr.street + ', ' + addr.city + ', ' + addr.state
                                   + ', ' + addr.country + ' - ' + addr.zipcode;
							return addr.addrStr;
						};
}]);