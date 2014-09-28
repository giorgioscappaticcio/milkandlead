'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('MainCtrl', function ($scope, $http, $q) {
    // $http.get('././data/exhibtion.json').success (function(data){
    //     $scope.exhibtionObj = data;

    //     console.log($scope.exhibtionObj);
    // });

     

	// for (var i=0; i < $scope.exhibtionObj.posts.length; i++){
 //    	if ($scope.exhibtionObj[i].id == '48'){
 //    		console.logo ($scope.exhibtionObj[i])
 //    	}
 //    }


 	function asyncGreet() {
	  var deferred = $q.defer();

	  $http.get('././data/exhibtion.json').success (function(data){
	        deferred.resolve(data);

	    });

	  return deferred.promise;
	}

	var promise = asyncGreet();

	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};
	
	promise.then(function(greeting) {
		console.log(greeting);


		for (var i=0; i < greeting.posts.length; i++){
	    	if (greeting.posts[i].id == '368'){
	    		//console.log(greeting.posts[i].custom_fields)
	    		//console.log(greeting.posts[i]["custom_fields"]["wpcf-gallery-image"][0])
	    		var filename = greeting.posts[i]["custom_fields"]["wpcf-gallery-image"][0];
	    		//console.log (filename.replace(/\.[^/.]+$/, ""));
	    		console.log (filename.splice(-4, 0, "-150x150"));

	    	}
	    }
	}, function(reason) {
	  alert('Failed: ' + reason);
	}, function(update) {
	  alert('Got notification: ' + update);
	});

    
    


  });
