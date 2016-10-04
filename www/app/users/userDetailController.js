'use strict';
angular.module('app')
  .controller('UserDetailCtrl', function($scope, $stateParams, usersService, $state, authService) {
    $scope.currentUser = authService.getUserIdentity().user;
    $scope.user = usersService.getUserList($stateParams.userId);
    if(!$scope.user){
      $state.go('tab.users');
      return false
    }
  });
