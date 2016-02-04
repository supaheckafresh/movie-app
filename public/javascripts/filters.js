(function () {

    'use strict';

    angular.module('customFilters', [])

        .filter('titlecase', function() {
            return function(input) {

                var title = [];

                if (input!== null) {
                    var inputCopy = input.toLowerCase().split(' ');

                    _.each(inputCopy, function (word) {
                        if (inputCopy.indexOf(word) === 0 || !isLower(word)) {
                            title.push(word.substring(0, 1).toUpperCase() + word.substring(1));
                        } else {
                            title.push(word);
                        }
                    });
                }
                return title.join(' ');
            };
        });

    function  isLower(word) {
        var lWords = ['of', 'the', 'a', 'in', 'at', 'and', 'an', 'but', 'or', 'to', 'the'];

        for (var i = 0, len = lWords.length; i < len; i++) {
            if (word === lWords[i]) {
                return true;
            }
        }
    }

}());