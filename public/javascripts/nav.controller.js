
(function () {

    'use strict';

    angular.module('app')
        .controller('NavController', function () {
            var vm = this;

            vm.info = {
                name: 'nav controller content',
                other: 'stuff'
            };

        });

}());

