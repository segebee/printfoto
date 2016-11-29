(function() {
  "use strict";
  angular.module('dataService',['authService'])

  .factory('fetch', function($http,authenticate) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    var getOrders = function () {
      console.log('fetching orders');
      //var orders;

      return $http.get('/api/orders', {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
      
      //console.log('Service->orders:',orders);
      //return orders;

    };

    return {
      getProfile : getProfile,
      getOrders : getOrders,
    };

  });

})();