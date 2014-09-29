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

	// Call the service wpapi.js
	var getExhibiotns = wpapi.getExhibitions();

	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};
	
	getExhibiotns.then(function(greeting) {
		console.log(greeting);
		for (var i=0; i < greeting.posts.length; i++){
	    	if (greeting.posts[i].id == '368'){
	    		//console.log(greeting.posts[i].custom_fields)
	    		//console.log(greeting.posts[i]["custom_fields"]["wpcf-gallery-image"][0])
	    		var filename = greeting.posts[i]["custom_fields"]["wpcf-gallery-image"][0];
	    		//console.log (filename.replace(/\.[^/.]+$/, ""));
	    		console.log (filename.splice(-4, 0, "-150x150"));
			};
	    };
	}, function(reason) {
	  alert('Failed: ' + reason);
	}, function(update) {
	  alert('Got notification: ' + update);
	});

    
    


  });
