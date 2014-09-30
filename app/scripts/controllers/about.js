'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('AboutCtrl', function ($scope) {
    
  	$scope.subnav = ['about','support'];
    $scope.selection = $scope.subnav[0];

  });
