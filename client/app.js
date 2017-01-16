(function() {
  "use strict";

angular.module('printfoto',['ui.router', 'login', 'orders', 'users', 'authService', 'dataService']) //, 'ngAnimate'

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
    .state('app.users', {
    	url: '/users',
    	templateUrl: 'templates/users.html',
    	controller: 'usersCtrl',
    });
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
  	.controller('homeCtrl',function($scope,$state,fetch) {
  		$scope.section = "Dashboard";
  		$scope.pageClass = 'page-home';
      fetch.getOrders().success(function(data) {
        $scope.total_orders = data.length;        
      });
      fetch.getPendingOrders().success(function(data) {
        $scope.new_orders = data.length;        
      });
      fetch.getCustomers().success(function(data) {
        $scope.customers = data.length;        
      });
      fetch.getUsers().success(function(data) {
        $scope.users = data.length;        
      });

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