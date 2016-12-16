(function () {
  "use strict";

  angular.module('orders',['ui.bootstrap'])

  .controller('ordersCtrl',function($scope,$state,$uibModal,$document,fetch) { //,$http,authenticate
      $scope.pageClass = 'page-orders';
      $scope.sortType     = 'created'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.search   = '';     // set the default search/filter term
      // pagination
      $scope.orders = [];
      $scope.curPage = 0;
      $scope.pageSize = 5;
      $scope.numberOfPages = function() 
      {
        return Math.ceil($scope.orders.length / $scope.pageSize);
      };

      fetch.getOrders().success(function(data) {
        console.log('orders:',data);
        console.log('orders length:',data.length);
        if (data.length<1) 
        {
          $scope.noOrders=true;
        }
        else
        {
          $scope.orders = data;
        }
        
      })
      .error(function(err) {
          console.log('Error occured while fetching orders: ' + err);
      });

      $scope.downloadImages = function(orderId,images) {
        //alert(images)
        fetch.downloadImages(orderId,images).success(function(data) {
          console.log("Images downloading");
          var a = document.createElement('a');
          var blob = new Blob([data], {'type':"application/octet-stream"});
          a.href = URL.createObjectURL(blob);
          a.download = orderId+".zip";
          a.click();
          //console.log(data);
        }).error(function(err) {
          alert("Image not downloaded due to an error.");
          console.log(err);
        });
      };

      //update order status
      $scope.updateOrder = function(order) {
        //console.log('order: ' , order);
        var confirm = window.confirm("Are you sure you want to approve this order? This action will be recorded.");
        if (confirm === true) 
        {

          //var oldStatus = angular.copy(order.status);
          var oldStatus = order.status;
          order.status = "completed";
          var fields = ['status'];
          fetch.updateOrder(order,fields).success(function(data) {
            alert("Order updated");
            console.log(data);
          }).error(function(err) {
            alert("Order could not be updated due to an error.");
            order.status = oldStatus;
            console.log(err);
          });

        }
      };

      $scope.viewOrder = function(order) {
        //$scope.order = order;

      };

      $scope.removeOrder = function(order) {
        //console.log("id: ",order._id);
        //console.log("index: ",$scope.orders.indexOf(order));
        //confirm before removal
        var confirm = window.confirm("Are you sure you want to delete this order? This action will be recorded.");
        if (confirm === true) 
        {
          fetch.removeOrder(order).success(function(data) {
            //remove order from scope
            $scope.orders.splice($scope.orders.indexOf(order),1);
            alert("Order removed");
            console.log(data);
          }).error(function(err) {
            alert("Order could not be removed due to an error.");
            console.log(err);
          });
        }

      };


  })

  .controller('orderModalCtrl', function ($uibModal, $log, $document) {
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