(function () {

   'use strict';

   angular.module('app')
       .controller('NavController', function (){
           var vm = this;

           vm.whatever = {
               name: 'Neil',
               age: '33'
           };


       });

}());