'use strict';

/**
 * @ngdoc overview
 * @name milkandleadApp
 * @description
 * # milkandleadApp
 *
 * Main module of the application.
 */
angular
  .module('milkandleadApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'duScroll',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($routeProvider) {

    // PROD
    var templateFolder = './wp-content/themes/milkandlead/';

    // DEV
    // var templateFolder = '';

    $routeProvider
      .when('/', {
        templateUrl: templateFolder+'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: templateFolder+'views/about.html',
        controller: 'AboutCtrl'
      }).when('/exhibitions', {
        templateUrl: templateFolder+'views/exhibitions.html',
        controller: 'ExhibitionsCtrl'
      }).when('/shop', {
        templateUrl: templateFolder+'views/shop.html',
        controller: 'ShopCtrl'
      }).when('/contact', {
        templateUrl: templateFolder+'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).filter('sliceThumb', function() {
    return function(input) {
      switch (input.split('.').pop()){
        case 'jpeg' :
          return input.splice(-5, 0, "-150x150");
        break;
        case 'jpg' :
          return input.splice(-4, 0, "-150x150");
        break;
        case 'png' :
          return input.splice(-4, 0, "-150x150");
        break;
        case 'gif' :
          return input.splice(-4, 0, "-150x150");
        break;
      }
    };
  });
