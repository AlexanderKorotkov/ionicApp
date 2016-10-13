'use strict';
angular.module('app')
.controller('DashCtrl', function($scope, DashService, authService) {
    $scope.currentUser = authService.getUserIdentity().user;
  });

