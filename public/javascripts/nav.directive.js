(function () {

    'use strict';

    angular.module('navDirective', [])
        .directive('navBar', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '='
                },
                templateUrl: 'partials/nav.html'
            };
        });
}());