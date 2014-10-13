'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('AboutCtrl', function ($scope, $rootScope, wpapi) {
   
    $rootScope.isExhibition = false;

  	$scope.subnav = ['about','support'];
    $scope.selection = $scope.subnav[0];

    // GET HOMEPAGE DETAILS AND STORE IN THE ROOT
    
    var getHomepageDetails = wpapi.getHomepageDetails();

    // console.log($rootScope.homeDetObj);

    if (Object.getOwnPropertyNames($rootScope.homeDetObj).length > 0) {
    	return;
    } else{

      $rootScope.loading = true;
      $rootScope.bodyStyle = {overflow: "hidden"};

    	getHomepageDetails.then(function(greeting) {

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
