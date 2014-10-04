'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('NavigationCtrl', function ($scope, $location, wpapi, $rootScope) {
    
    $rootScope.homeDetObj = {};
    $rootScope.nextExhibObj = {};

    $scope.changePanel = function(section){
    	$scope.navActive = section;
        var section = 'slide-'+section
    	var someElement = angular.element(document.getElementById(section));
    	var tenda = angular.element(document.getElementById('tenda_wrapper'));
    	tenda.scrollToElementAnimated(someElement,0,1000);
    }

    // console.log($location.path())

    switch($location.path()){
    	case '/about' : 
    		$scope.changePanel('about');
    	break;
    	case '/exhibitions' :
    		$scope.changePanel('exhibition');
    	break;
    	case '/shop' :
    		$scope.changePanel('shop');
    	break;
    	case '/contact' :
    		$scope.changePanel('contact');
    	break;
    	default :
    		$scope.changePanel('home');
    	break;
    }

    // GET NEXT EXHIBITION DETAILS AND STORE IN THE ROOT

    var getExhibitions = wpapi.getExhibitions();

    getExhibitions.then(function(greeting) {
        // console.log(greeting);
        $rootScope.exhibObj = greeting.posts;
    }, function(reason) {
      alert('Failed: ' + reason);
    }, function(update) {
      alert('Got notification: ' + update);
    });

    

  });
