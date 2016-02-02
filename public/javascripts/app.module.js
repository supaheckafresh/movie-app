(function () {

  'use strict';

  angular.module('app', ['ui.router', 'ui.bootstrap'])
      .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
          /**
           * Default state
           */
          $urlRouterProvider.otherwise('/movies');

          /**
           * State
           */
          $stateProvider
              .state('movies', {
                  url: '/movies',
                  templateUrl: 'build/partials/movies/movies.html',
                  controller: 'MoviesController',
                  controllerAs: 'movies'
              })
              .state('movies.movie', {
                  url: '/movie',
                  templateUrl: 'build/partials/movies/movie.html',
                  controller: 'MovieController',
                  controllerAs: 'movie'
              });

      });

}());
