'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:ExhibitionsCtrl
 * @description
 * # ExhibitionsCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('ExhibitionsCtrl', function ($scope, wpapi, $document, $rootScope) {
    
  	$scope.returnString = function(i){
  		return 'ciao'+i
  	}

  	$scope.thumbPerPage = '12';
  	
  	// SubNAV Control
	$scope.subnav = ['front','pictures', 'info'];
    $scope.selection = $scope.subnav[0];


  	// Call the service wpapi.js
	// var getExhibiotns = wpapi.getExhibitions();

	// getExhibiotns.then(function(greeting) {
	// 	// console.log(greeting);
		$rootScope.exhibObj = $scope.exhibObj;
	// }, function(reason) {
	//   alert('Failed: ' + reason);
	// }, function(update) {
	//   alert('Got notification: ' + update);
	// });


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


	$scope.opaco = false;
	$scope.closeBtn = false;

	// PROD
	var imageGalleryTpl = './wp-content/themes/milkandlead/views/imagegallery.html' ;

	// DEV
	var imageGalleryTpl = '../../views/imagegallery.html' ;

	$scope.imageGallerySwitch =
      [ { name: '', url: ''},
        { name: 'imagegallery', url: '../../views/imagegallery.html'} ];
    
    $scope.imageGallery = $scope.imageGallerySwitch[0];

    $scope.openImageGallery = function(album, i){
    	

    	$scope.imageGallery = $scope.imageGallerySwitch[1];
    	$scope.galleryAlbum = toObject(album);

    	$scope.startAlbum (i)

    	// console.log($scope.galleryAlbum)
    	//$document.body.style.overflowY = "hidden";
    }

    $scope.closeImageGallery = function(){
    	$scope.imageGallery = $scope.imageGallerySwitch[0];
    }

    

	$scope.startAlbum = function (i){

		$scope.currentIndex = i; // Initially the index is at the first image


		$scope.next = function() {
		  $scope.currentIndex < $scope.galleryAlbum.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
		};
		 
		$scope.prev = function() {
		  $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.galleryAlbum.length - 1;
		};

		$scope.$watch('currentIndex', function(newval, oldval) {
		  $scope.galleryAlbum.forEach(function(image) {
		    image.visible = false; // make every image invisible
		    console.log(image);
		  });
		 
		  $scope.galleryAlbum[$scope.currentIndex].visible = true; // make the current image visible
		});	
	}
	

	// Functions
	function toObject(arr) {
	  var ra = [];
	  for (var i = 0; i < arr.length; ++i){
	  	var rv = {};
	    rv.source = arr[i];
	  	ra.push(rv);
	  }
	  return ra;
	}

  });
