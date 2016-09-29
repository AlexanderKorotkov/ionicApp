'use strict';
angular.module('app')
  .controller('MemberDetailCtrl', function($scope, $stateParams, membersService, $state, authService) {
    $scope.currentUser = authService.getUserIdentity().user;
    $scope.member = membersService.getLocalCharts($stateParams.memberId);
    if(!$scope.member){
      $state.go('tab.members');
      return false
    }
  });
