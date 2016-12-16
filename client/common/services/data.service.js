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

    var removeOrder = function (order) {
      console.log('removing order');
      return $http.post('/api/removeOrder', {order:order}, {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    var removeUser = function (user) {
      console.log('removing user');
      return $http.post('/api/removeUser', {user:user}, {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    var updateOrder = function (order,fields) {
      console.log('updating order');
      return $http.post('/api/updateOrder', {order:order,fields:fields}, {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        }
      });
    };

    //return images as zip
    var downloadImages = function (orderId,images) {
      console.log('downloading images');
      return $http.post('/api/downloadImages', {orderId:orderId,images:images}, {
        headers: {
          Authorization: 'Bearer '+ authenticate.getToken()
        },
        responseType: 'arraybuffer'
      });
    };

    return {
      getProfile : getProfile,
      getOrders : getOrders,
      getCustomers : getCustomers,
      getUsers : getUsers,
      removeUser : removeUser,
      getPendingOrders : getPendingOrders,
      removeOrder : removeOrder,
      updateOrder : updateOrder,
      downloadImages : downloadImages,
    };

  });

})();