'use strict';

/**
 * @ngdoc function
 * @name milkandleadApp.controller:ImagegalleryCtrl
 * @description
 * # ImagegalleryCtrl
 * Controller of the milkandleadApp
 */
angular.module('milkandleadApp')
  .controller('ImagegalleryCtrl', function ($scope) {
    
    $scope.images = $scope.galleryAlbum;

    console.log('gallery controller');

  });
