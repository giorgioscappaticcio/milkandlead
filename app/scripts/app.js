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
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).when('/exhibitions', {
        templateUrl: 'views/exhibitions.html',
        controller: 'ExhibitionsCtrl'
      }).when('/shop', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl'
      }).when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
