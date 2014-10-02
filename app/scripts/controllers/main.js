'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('MainCtrl', function ($scope, $location, wpapi) {
    
	// SubNAV Control
	$scope.subnav = ['flyer','info', 'partecipating', 'submission'];
    $scope.selection = $scope.subnav[0];

    $scope.closebtn = function(){
    	$scope.selection = $scope.subnav[0];
    }

	

    
    


  });
