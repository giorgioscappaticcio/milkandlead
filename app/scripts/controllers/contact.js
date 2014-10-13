'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('ContactCtrl', function ($scope, wpapi, $rootScope) {
    
    $rootScope.isExhibition = false;

  	// SubNAV Control
	   $scope.subnav = ['contact','team'];
    $scope.selection = $scope.subnav[0];

    $scope.closebtn = function(){
    	$scope.selection = $scope.subnav[0];
    }

    // GET HOMEPAGE DETAILS AND STORE IN THE ROOT

	var getHomepageDetails = wpapi.getHomepageDetails();

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
