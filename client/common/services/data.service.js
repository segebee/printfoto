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

    var getCustomers = function () {
      console.log('fetching customers');
      //var customers;
      return $http.get('/api/customers', {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    var getUsers = function () {
      console.log('fetching users');
      return $http.get('/api/users', {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    var getPendingOrders = function () {
      console.log('fetching pending orders');
      return $http.get('/api/pending_orders', {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    return {
      getProfile : getProfile,
      getOrders : getOrders,
      getCustomers : getCustomers,
      getUsers : getUsers,
      getPendingOrders : getPendingOrders,
    };

  });

})();