'use strict';

angular.module('consumerApp')

//Directive for validating date
.directive("ngvalidateDate", ['$log', 'appConstants', function ($log, appConstant) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
            validateInput('ngvalidateDate', appConstant.DATE_REG_EX, ngModel);
        }           
    };
}])

//Directive for validating alphabet inputs
.directive("ngvalidateCharacter", ['$log', 'appConstants', function ($log, appConstant) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
                validateInput('ngvalidateCharacter', appConstant.ALPHA_REG_EX, ngModel);
        }           
    };
}])

//Directive for validating mobile number
.directive("ngvalidateMobile", ['$log', 'appConstants', function ($log, appConstant) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
               validateInput('ngvalidateMobile', appConstant.MOBILENUMB_REG_EX, ngModel);
        }           
    };
}])

//Directive for validating email
.directive("ngvalidateEmail", ['$log', 'appConstants', function ($log, appConstant) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
               validateInput('ngvalidateEmail', appConstant.EMAIL_REG_EX, ngModel);
        }           
    };
}])

//Directive for validating zipcode
.directive("ngvalidateZipcode", ['$log', 'appConstants', function ($log, appConstant) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, element, attributes, ngModel) {
               validateInput('ngvalidateZipcode', appConstant.ZIPCODE_REG_EX, ngModel);
        }           
    };
}]);

function validateInput(dirName, regEx, ngModel){
    try{
            ngModel.$validators[dirName] = function (val) {
                    if (typeof val === 'undefined' || val === "" || (!regEx.test(val))) {
                        return false;
                    }
                    else{
                        return true;
                    }
                };
    }catch(err){
        $log.error("Error occurred while validating "+ dirName +"content", err);
    }
};