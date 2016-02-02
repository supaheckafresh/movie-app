
(function () {

    'use strict';

    angular.module('app')
        .controller('MoviesController', function (movies) {
            var vm = this;

            vm.movies = movies;
            console.log(movies);
        });

}());

