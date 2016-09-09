'use strict';
angular.module('app')
  .controller('MemberDetailCtrl', function($scope, $stateParams, membersService, $state) {
    $scope.member = membersService.getLocalCharts($stateParams.memberId);
    if(!$scope.member){
      $state.go('tab.members');
      return false
    }
  });
