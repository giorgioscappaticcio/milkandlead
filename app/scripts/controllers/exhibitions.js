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
	// var imageGalleryTpl = '../../views/imagegallery.html' ;

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

	

	$rootScope.imageGallerySwitch =
      [ { name: '', url: ''},
        { name: 'imagegallery', url: imageGalleryTpl} ];
    
    $rootScope.imageGallery = $rootScope.imageGallerySwitch[0];

    $rootScope.openImageGallery = function(album, i){
    	

    	$rootScope.imageGallery = $rootScope.imageGallerySwitch[1];
    	$rootScope.galleryAlbum = toObject(album);

    	$rootScope.startAlbum (i)

    	// console.log($scope.galleryAlbum)
    	//$document.body.style.overflowY = "hidden";
    }

    $rootScope.closeImageGallery = function(){
    	$rootScope.imageGallery = $rootScope.imageGallerySwitch[0];
    }

    

	$rootScope.startAlbum = function (i){

		// console.log(i)

		$rootScope.currentIndex = i; // Initially the index is at the first image


		$rootScope.next = function() {
		  $rootScope.currentIndex < $rootScope.galleryAlbum.length - 1 ? $rootScope.currentIndex++ : $rootScope.currentIndex = 0;
		};
		 
		$rootScope.prev = function() {
		  $rootScope.currentIndex > 0 ? $rootScope.currentIndex-- : $rootScope.currentIndex = $rootScope.galleryAlbum.length - 1;
		};

		$rootScope.$watch('currentIndex', function(newval, oldval) {
		  $rootScope.galleryAlbum.forEach(function(image) {
		    image.visible = false; // make every image invisible
		    // console.log(image);
		  });
		 
		  $rootScope.galleryAlbum[$rootScope.currentIndex].visible = true; // make the current image visible
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
