(function() {
  "use strict";

angular.module('PrintFoto',['ui.router', 'ngAnimate'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: '/app',
      templateUrl: 'templates/app.html',
      controller: "mainCtrl",
      abstract: true
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

  	.controller('mainCtrl',function($scope,$state) {
  		$scope.pageClass = 'page-main';
  		$scope.name = "Sir Hanson";

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

  	.controller('ordersCtrl',function($scope,$state,$http) {
  		$scope.pageClass = 'page-orders';
  		$scope.sortType     = 'created'; // set the default sort type
		$scope.sortReverse  = false;  // set the default sort order
		$scope.search   = '';     // set the default search/filter term
		// pagination
		$scope.orders = [];
		$scope.curPage = 0;
		$scope.pageSize = 5;
		$scope.numberOfPages = function() 
		{
			return Math.ceil($scope.orders.length / $scope.pageSize);
		};


  		$http.get('/api/orders')
	        .success(function(data) {
	        	if (data.length<1) $scope.noOrders = true;
	            $scope.orders = data;

	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });


  	})

  	.filter('pagination', function()
	{
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