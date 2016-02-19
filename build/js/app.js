(function () {

    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'customFilters', 'navMenu'])
        .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {
            /**
             * Default state
             */
            $urlRouterProvider.otherwise('/movies');

            /**
             * State provider
             */
            $stateProvider
                .state('movies', {
                    url: '/movies',
                    templateUrl: 'build/partials/movies/movies.html',
                    controller: 'MoviesController',
                    controllerAs: 'movies',
                    resolve: {
                        movies: ["MoviesService", function (MoviesService) {
                            return MoviesService.getMovies();
                        }]
                    }
                })
                .state('movies.movie', {
                    url: '/:movie_title',
                    templateUrl: 'build/partials/movies/movie.html',
                    controller: 'MovieController',
                    controllerAs: 'movie',
                    resolve: {
                        movie: ["movies", "MoviesService", "$stateParams", function (movies, MoviesService, $stateParams) {
                            return MoviesService.find($stateParams.movie_title);
                        }]
                    }
                });
        }]);
}());


(function () {

    'use strict';

    angular.module('customFilters', []);

}());

(function () {

    'use strict';

    angular.module('app')
        .controller('NavController', function () {
            var vm = this;

            vm.views = {
                movies: 'Home',
                contact: 'Contact'
            };

        });

}());
(function () {

    'use strict';

    angular.module('navMenu', [])
        .directive('navbar', function () {
            return {
                restrict: 'E',
                scope: {
                    info: '='
                },
                templateUrl: 'build/partials/navbar.html'
            };
        });
}());
(function () {

    'use strict';

    angular.module('app')
        .factory('Movie', function () {
            function Movie(data) {
                _.merge(this, {
                    title: '',
                    runTime: '',
                    releaseYear: '',
                    genre: '',
                    description: '',
                    checkedIn: true
                }, data || {});
            }

            Movie.prototype = {
                shortDesc: function () {
                    return this.description.substr(0, 25).replace(/\s$/, '') + '...';
                },
                checkInOut: function () {
                    if (this.checkedIn) {
                        alert('This movie is available...');
                        this.checkedIn = !confirm('Would you like to check it out?');
                    }
                    else {
                        alert('This movie is currently unavailable...');
                        this.checkedIn = confirm('Would you like to check it in?');
                    }
                }
            };

            return Movie;
        });
}());
(function () {

    'use strict';

    angular.module('customFilters')
        .filter('titlecase', function() {
            return function(input) {

                var title = [];

                if (input!== null) {
                    var inputCopy = input.toLowerCase().split(' ');

                    var i = 0;
                    _.each(inputCopy, function (word) {
                        if (i === 0 || !isLower(word)) {
                            title.push(word.substring(0, 1).toUpperCase() + word.substring(1));
                        } else {
                            title.push(word);
                        }
                        i++;
                    });
                }
                return title.join(' ');
            };
        });

    function  isLower(word) {
        var lWords = ['of', 'the', 'a', 'in', 'at', 'and', 'an', 'but', 'or', 'to', 'into'];

        return lWords.indexOf(word) > -1;
    }

}());
(function () {

    'use strict';

    angular.module('customFilters')
        .filter('runningHours', function () {
            return function (input) {
                return Math.floor(input / 60) + 'hr ' + (input % 60) + 'min ';
            };
    });
}());
(function () {

    'use strict';

    angular.module('app')
        .controller('MovieController', ["movie", function (movie) {
            var vm = this;

            vm.movie = movie;
        }]);

}());

(function () {

    'use strict';

    angular.module('app')
        .controller('MoviesController', ["movies", "MoviesService", function (movies, MoviesService) {
            var vm = this;

            vm.movies = movies;
        }]);

}());


(function () {

    'use strict';

    angular.module('app')
        .service('MoviesService', ["Movie", "$http", function (Movie, $http) {

            var vm = this;

            vm.movies = [];

            vm.makeMovies = function (data) {
                _.each(data, function (l) {
                    vm.movies.push(new Movie(l));
                });
                return vm.movies;
            };

            vm.getMovies = function () {
                return $http.get('build/data/movies.json')
                    .then(function (res) {
                        return vm.makeMovies(res.data);
                    }, function (err) {
                        console.log(err);
                        return 'Sorry, there has been an error...';
                    });
            };

            vm.find = function (movie_title) {
                return _.find(vm.movies, {title: movie_title});
            };
            
        }]);
}());