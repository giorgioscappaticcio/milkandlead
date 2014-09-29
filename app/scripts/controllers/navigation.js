'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('NavigationCtrl', function ($scope, $location) {
    
    $scope.changePanel = function(section){
    	var section = 'slide-'+section
    	var someElement = angular.element(document.getElementById(section));
    	var tenda = angular.element(document.getElementById('tenda_wrapper'));
    	tenda.scrollToElementAnimated(someElement,0,1000);
    }

    console.log($location.path())

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

  });
