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
    
	$rootScope.isExhibition = false;

	// SubNAV Control
	$scope.subnav = ['flyer','info', 'partecipating', 'submission'];
    $scope.selection = $scope.subnav[1];

    $scope.closebtn = function(){
    	$scope.selection = $scope.subnav[1];
    }

	$scope.loading = function(){
		$rootScope.loading = true;
	}

	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};

	if (Object.getOwnPropertyNames($rootScope.nextExhibObj).length > 0) {
    	return;
    } else{
		
		$rootScope.loading = true;
		$rootScope.bodyStyle = {overflow: "hidden"};
		
		// Call the service wpapi.js
		var getNextExhib = wpapi.getnextExhibition();

		getNextExhib.then(function(greeting) {
			
			$rootScope.nextExhibObj = greeting.posts[0];
			$scope.nextExhibObj = $rootScope.nextExhibObj
			
			$rootScope.loading = false;
			$rootScope.bodyStyle = {overflow: "visible"};
			
		}, function(reason) {
		  alert('Failed: ' + reason);
		}, function(update) {
		  alert('Got notification: ' + update);
		});
	};

    
    


  });
