'use strict';

/**
 * @ngdoc service
 * @name milkandleadApp.wpapi
 * @description
 * # wpapi
 * Service in the milkandleadApp.
 */
angular.module('milkandleadApp')
  .service('wpapi', function wpapi($http, $q) {

  	this.getExhibitions = function(){
  		var deferred = $q.defer();

		$http.get('././data/exhibtion.json').success (function(data){
		    deferred.resolve(data);
		});

		return deferred.promise;
  	}

  });
