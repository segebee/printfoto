(function () {
  "use strict";

  angular.module('users',['ui.bootstrap'])

  .controller('usersCtrl',function($scope,$state,$uibModal,$document,fetch) { //,$http,authenticate
      $scope.pageClass = 'page-users';
      $scope.sortType     = 'created'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.search   = '';     // set the default search/filter term
      // pagination
      $scope.users = [];
      $scope.curPage = 0;
      $scope.pageSize = 5;
      $scope.numberOfPages = function() 
      {
        return Math.ceil($scope.users.length / $scope.pageSize);
      };

      fetch.getCustomers().success(function(data) {
        console.log('users:',data);
        console.log('users length:',data.length);
        if (data.length<1) 
        {
          $scope.noUsers=true;
        }
        else
        {
          $scope.users = data;
        }
        
      })
      .error(function(err) {
          console.log('Error occured while fetching users: ' + err);
      });

      $scope.viewUser = function(user) {
        //$scope.order = order;

      };

      $scope.removeUser = function(user) {
        //console.log("id: ",order._id);
        //console.log("index: ",$scope.orders.indexOf(order));
        //confirm before removal
        var confirm = window.confirm("Are you sure you want to delete this user? This action will be recorded.");
        if (confirm === true) 
        {
          fetch.removeUser(user).success(function(data) {
            //remove user from scope
            $scope.users.splice($scope.users.indexOf(user),1);
            alert("user removed");
            console.log(data);
          }).error(function(err) {
            alert("user could not be removed due to an error.");
            console.log(err);
          });
        }

      };


  })

  .controller('userModalCtrl', function ($uibModal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;
  })

  .filter('pagination', function() {
    return function(input, start)
    {
      start = +start;
      return input.slice(start);
    };
  });
})();