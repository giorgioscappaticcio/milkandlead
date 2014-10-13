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
    
    $rootScope.isExhibition = false;

	// GET HOMEPAGE DETAILS AND STORE IN THE ROOT

	var getHomepageDetails = wpapi.getHomepageDetails();

	if (Object.getOwnPropertyNames($rootScope.homeDetObj).length > 0) {
    	return;
    } else{

    	$rootScope.loading = true;
        $rootScope.bodyStyle = {overflow: "hidden"};

    	getHomepageDetails.then(function(greeting) {
	         // console.log(greeting);
	        $rootScope.homeDetObj = greeting.page;
	        $scope.homeDetObj = $rootScope.homeDetObj;

	        $rootScope.loading = false;
        	$rootScope.bodyStyle = {overflow: "visible"};

	    }, function(reason) {
	      alert('Failed: ' + reason);
	    }, function(update) {
	      alert('Got notification: ' + update);
	    });
    };

  });
