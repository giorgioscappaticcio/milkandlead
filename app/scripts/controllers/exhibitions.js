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
    
  	$rootScope.isExhibition = true;

  	// PROD
	var imageGalleryTpl = '../wp-content/themes/milkandlead/views/imagegallery.html' ;

	// DEV
	var imageGalleryTpl = '../../views/imagegallery.html' ;

  	$scope.returnString = function(i){
  		return 'ciao'+i
  	}

  	$scope.thumbPerPage = '12';
  	
  	// SubNAV Control
	$scope.subnav = ['front','pictures', 'info'];
    $scope.selection = $scope.subnav[0];


    // Infinite Scroll
    

    $scope.startInf = false;

    // Infinite scroll
    $document.on('scroll', function() {
    	
    	if ($rootScope.isExhibition){

	    	var excuted = false;
	    	
	    	if ($document.scrollTop() > getDocHeight() - 800 && $scope.startInf){

	    		$scope.startInf = false; 
	    		if ($scope.pageToDisplay < $rootScope.pages ){
	    			
	    			$scope.pageToDisplay += 1;
	    		} else {
	    			return;
	    		}

	    		
	    		//console.log('this is the bottom', getDocHeight(), $document.scrollTop());

	    		$rootScope.bodyStyle = {overflow: "hidden"};
	    		$rootScope.loading = true;
	  		
		  		var getExhibitions = wpapi.getExhibitions(3,$scope.pageToDisplay);
		  		

		    	getExhibitions.then(function(greeting) {
		         	console.log(greeting);
		         	$scope.startInf = true;
		         	$rootScope.loading = false;
		         	$rootScope.bodyStyle = {overflow: "visible"};
		        	for (var j = 0; j < greeting.posts.length; j++){
		        		$rootScope.exhibObj.push(greeting.posts[j]);
		        	}
		        	
			    }, function(reason) {
			      	alert('Failed: ' + reason);
			    }, function(update) {
			      	alert('Got notification: ' + update);
			    });
	    	}
      	}
    });
    
    

    
	// GET NEXT EXHIBITION DETAILS AND STORE IN THE ROOT

    if (Object.getOwnPropertyNames($rootScope.exhibObj).length > 0) {
    	return;
    } else{

    	$scope.pageToDisplay = 1;

	    var getExhibitions = wpapi.getExhibitions(3,$scope.pageToDisplay);

	    $rootScope.loading = true;
		$rootScope.bodyStyle = {overflow: "hidden"};
		

	    getExhibitions.then(function(greeting) {
	         console.log(greeting);
	        $rootScope.exhibObj = greeting.posts;
	        $rootScope.pages = greeting.pages;
	        $scope.startInf = true;
	        $rootScope.loading = false;
		    $rootScope.bodyStyle = {overflow: "visible"};
		    $rootScope.exhibObj = $scope.exhibObj;
	        //$rootScope
	    }, function(reason) {
	      alert('Failed: ' + reason);
	    }, function(update) {
	      alert('Got notification: ' + update);
	    });
		
	}

	

	String.prototype.splice = function( idx, rem, s ) {
	    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
	};


	$scope.opaco = false;
	$scope.closeBtn = false;

	

	$scope.imageGallerySwitch =
      [ { name: '', url: ''},
        { name: 'imagegallery', url: imageGalleryTpl} ];
    
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

		// console.log(i)

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
		    // console.log(image);
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

	function getDocHeight() {
	    return Math.max(
	        document.body.scrollHeight, document.documentElement.scrollHeight,
	        document.body.offsetHeight, document.documentElement.offsetHeight,
	        document.body.clientHeight, document.documentElement.clientHeight
	    );
	}

  });
