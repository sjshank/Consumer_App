'use strict';

angular.module('consumerApp')

//Directive for renering header and displaying active page
.directive('ngCustomers', function() {
    return {
        templateUrl : '../views/customerList.tpl.html',
        scope : {
            customers : "=",
            removeCustomer : '&',
            updateCustomer : '&'
        },
        link : function(scope, element, attrs, controller) {
            
        }
    }
})

// Directive for convert ISO date into Date String
  .directive("ngconvertDate", function() {
			    return  {
			        link : function(scope, element, attrs, controller) {
			        	const d = (new Date(scope.cust.dob)).toDateString();
			        	element.text(d);
			        }
			    };
})

 .directive("ngDobpicker",
				function() {
                    
					return {
						restrict : "A",
						require : "ngModel",
						link : function(scope, elem, attrs, ngModelCtrl) {
                            var currentDate = new Date();
							var updateModel = function(dateText) {
								scope.$apply(function() {
									ngModelCtrl.$setViewValue(dateText);
								});
							};
							$(elem).datepicker({
                                dateFormat : "dd/mm/yy",
                                maxDate : new Date(currentDate.setDate(currentDate.getDate()
                                        - currentDate.getDay())),
                                autoSize : true,
                                onSelect : function(dateText) {
                                            updateModel(dateText);
                                        }
                            });
						}
					};
});