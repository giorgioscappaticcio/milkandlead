'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('ShopCtrl', function ($scope, $window, wpapi, $rootScope) {
    
    // SubNAV Control
	$scope.subnav = ['flyer','info'];
    $scope.selection = $scope.subnav[0];

    $scope.closebtn = function(){
    	$scope.selection = $scope.subnav[0];
    }
    
    $scope.go = function ( path ) {
	  $window.open ( path,'_blank' );
	};

	// GET HOMEPAGE DETAILS AND STORE IN THE ROOT

	var getHomepageDetails = wpapi.getHomepageDetails();

	if (Object.getOwnPropertyNames($rootScope.homeDetObj).length > 0) {
    	return;
    } else{
    	getHomepageDetails.then(function(greeting) {
	         // console.log(greeting);
	        $rootScope.homeDetObj = greeting.page;
	        $scope.homeDetObj = $rootScope.homeDetObj;
	    }, function(reason) {
	      alert('Failed: ' + reason);
	    }, function(update) {
	      alert('Got notification: ' + update);
	    });
    };

  });
