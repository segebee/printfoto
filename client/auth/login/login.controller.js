(function () {
  "use strict";

  angular.module('login',['authService'])
 
  .controller('loginCtrl',function($scope,$state,authenticate) {
      
      if (authenticate.isLoggedIn()) $state.go('app.home');
      $scope.pageClass = 'page-login';
      $scope.loginPage = true;
      $scope.error = false;
      
      $scope.data = {
        email : "",
        password : ""
      };

      $scope.login = function () {
        //console.log("login data: ",$scope.data);

        authenticate
          .login($scope.data)
          .error(function(err){
            $scope.error = true;
            $scope.message = err.message;
            console.log(err);
          })
          .then(function(){
            $state.go('app.home');
          });
      };

  });

})();