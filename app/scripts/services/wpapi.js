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

  	

    // PROD
  	var next_exhib_wpapi = 'http://www.milkandlead.com/?json=posts&post_type= next_exhibition&count=-1';
    var homepage_api = 'http://www.milkandlead.com/?json=get_page&page_id=576';
  	
    // DEV
  	var next_exhib_wpapi = '././data/next_exhb.json';
    var homepage_api = '././data/homepage_api.json';

  	this.getHomepageDetails = function(){
      var deferred = $q.defer();

    $http.get(homepage_api).success (function(data){
        deferred.resolve(data);
    });

    return deferred.promise;
    }

    this.getExhibitions = function(countPost,pagePost){

      // PROD
      var exhib_wpapi = 'http://www.milkandlead.com/?json=posts&post_type= exhibition&count='+countPost+'&page='+pagePost;

      // DEV
      var exhib_wpapi = '././data/exhib_page_count_'+countPost+'_page_'+pagePost+'.json';

  		var deferred = $q.defer();

		$http.get(exhib_wpapi).success (function(data){
		    deferred.resolve(data);
		});

		return deferred.promise;
  	}

  	this.getnextExhibition = function(){
  		var deferred = $q.defer();

		$http.get(next_exhib_wpapi).success (function(data){
		    deferred.resolve(data);
		});

		return deferred.promise;
  	}

  });
