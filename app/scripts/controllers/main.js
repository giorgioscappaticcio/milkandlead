'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('MainCtrl', function ($scope, $location, wpapi, $rootScope) {
    
	// SubNAV Control
	$scope.subnav = ['flyer','info', 'partecipating', 'submission'];
    $scope.selection = $scope.subnav[1];

    $scope.closebtn = function(){
    	$scope.selection = $scope.subnav[1];
    }

	

	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};

	if (Object.getOwnPropertyNames($rootScope.nextExhibObj).length > 0) {
    	return;
    } else{
	
		// Call the service wpapi.js
		var getNextExhib = wpapi.getnextExhibition();

		getNextExhib.then(function(greeting) {
			
			$rootScope.nextExhibObj = greeting.posts[0];
			$scope.nextExhibObj = $rootScope.nextExhibObj
			// console.log($scope.nextExhibObj);
			
		}, function(reason) {
		  alert('Failed: ' + reason);
		}, function(update) {
		  alert('Got notification: ' + update);
		});
	};

    
    


  });
