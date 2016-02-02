(function () {

    'use strict';

    angular.module('textFilters', []).filter('capitalize', function() {
        return function(input) {
            if (input!== null)
                input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        };
    });

    //angular.module('textFilters', []).filter('capitalize', function() {
    //    return function(input) {
    //        if (input !== null)
    //            input = input.toLowerCase();
    //        input = input.split(' ');
    //
    //        for (var i = 0, len = input.length; i < len; i++) {
    //            //TODO capitalize each word unless of for etc.
    //            input.substring(0, 1).toUpperCase() + input.substring(1);
    //        }
    //    };
    //});

}());