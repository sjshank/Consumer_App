'use strict';

angular
    .module('app.config', [])
    .constant('appConstants', {
        SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
        DATE_REG_EX : /(^(((0[1-9]|[12][0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/g,
        EMAIL_REG_EX : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        MOBILENUMB_REG_EX : /^[0-9]{10}$/,
        ALPHA_REG_EX : /^[a-zA-Z]+$/,
        ZIPCODE_REG_EX : /^[0-9]{5,6}$/

    })
    .run(['$rootScope', function(rootScope){
        rootScope.subHeading = "A MEAN Stack based utility to add/update customers and generate consolidated billing report for each customer.";
        rootScope.formHeader = "Add";
        rootScope.NAME_ERR = "Please enter a valid name.";
        rootScope.CITY_ERR = "Please enter a valid city name.";
        rootScope.STATE_ERR = "Please enter a valid state name.";
        rootScope.FIELD_REQUIRED = "This field is required.";
        rootScope.DOB_ERR = "Please select a valid date.";
        rootScope.MOBILENUMB_ERR = "Please enter a valid mobile number.";
        rootScope.EMAIL_ERR = "Please enter a valid email address.";
        rootScope.ZIPCODE_ERR = "Please enter a valid zipcode.";
}]);