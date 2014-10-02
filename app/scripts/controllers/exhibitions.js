'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:ExhibitionsCtrl
 * @description
 * # ExhibitionsCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('ExhibitionsCtrl', function ($scope, wpapi) {
    
  	// SubNAV Control
	$scope.subnav = ['front','pictures', 'info'];
    $scope.selection = $scope.subnav[0];


  	// Call the service wpapi.js
	var getExhibiotns = wpapi.getExhibitions();

	getExhibiotns.then(function(greeting) {
		console.log(greeting);
		$scope.exhibObj = greeting.posts;
	}, function(reason) {
	  alert('Failed: ' + reason);
	}, function(update) {
	  alert('Got notification: ' + update);
	});


	$scope.set_flyerBg = function (i) {
		var fbBanner = $scope.exhibObj[i].custom_fields["wpcf-facebook-banner"];
		if (fbBanner != undefined){
			return { 'background-image': 'url('+$scope.exhibObj[i].custom_fields["wpcf-facebook-banner"][0]+')' }
		}
	}


	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};

	$scope.spiceThumb = function(thumb){
		switch (thumb.split('.').pop()){
			case 'jpeg' :
				return thumb.splice(-5, 0, "-150x150");
			break;
			case 'jpg' :
				return thumb.splice(-4, 0, "-150x150");
			break;
			case 'png' :
				return thumb.splice(-4, 0, "-150x150");
			break;
			case 'gif' :
				return thumb.splice(-4, 0, "-150x150");
			break;
		}
	}


  });
