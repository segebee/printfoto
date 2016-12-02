(function() {
  "use strict";

angular.module('printfoto',['ui.router', 'login', 'authService', 'dataService']) //, 'ngAnimate'

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: '/app',
      templateUrl: 'templates/app.html',
      controller: "mainCtrl",
      abstract: true
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: "loginCtrl"
    })

    .state('app.home', {
    	url: '/home',
    	templateUrl: 'templates/dashboard.html',
    	controller: 'homeCtrl',
          /*resolve: {
            categories: function(homeService) {
              return homeService.getCategories();
            }
          }*/
    })

    .state('app.orders', {
    	url: '/orders',
    	templateUrl: 'templates/orders.html',
    	controller: 'ordersCtrl',
    })
    /*.state('app.category', {
      url: '/category/:categoryId',
      views: {
        'pageContent': {
          templateUrl: 'templates/category/category.html',
          controller: 'categoryCtrl'
        }
      }
    })*/
		$urlRouterProvider.otherwise('/app/home');
    })

  	.controller('mainCtrl',function($scope,$state,authenticate) {
  		if (!authenticate.isLoggedIn()) $state.go('login');
      $scope.pageClass = 'page-main';
      $scope.name = authenticate.currentUser().name;
  		$scope.logout = function() {
        authenticate.logout();
        $state.go('login');
      };
      

  	})
  	.controller('homeCtrl',function($scope,$state) {
  		$scope.section = "Dashboard";
  		$scope.pageClass = 'page-home';
  		$scope.total_orders = 500;
  		$scope.pending_orders = 50;
  		$scope.customers = 150;
  		$scope.monthly_growth = 50;

  		$scope.name = "Sir Hanson";

  	})

  	.controller('ordersCtrl',function($scope,$state,fetch) { //,$http,authenticate
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

      $scope.downloadImages = function(images) {
        //alert(images)
      };
      $scope.viewOrder = function(order) {

      };


  	})

  	.filter('pagination', function() {
  		return function(input, start)
  		{
  			start = +start;
  			return input.slice(start);
  		};
  	});
    

})();
/*
 

$http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

$scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    <input type="checkbox" ng-click="deleteTodo(todo._id)">

        */