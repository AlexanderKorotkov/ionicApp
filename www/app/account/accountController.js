'use strict';
angular.module('app')
  .controller('AccountCtrl', function($scope, authService, $state) {
    $scope.settings = {
      enableFriends: true
    };
    $scope.logOut = function(){
      if (authService.isAuthenticated()) {
        authService.removeUserIdentity();
        $state.go('login');
      }
    }
  });
