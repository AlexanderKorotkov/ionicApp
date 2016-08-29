'use strict';
angular.module('app')
  .controller('SignUpCtrl', function($scope, SignUpService, $ionicPopup, $state, authService) {
    $scope.data = {};
    $scope.isLoading = false;

    $scope.signUp = function() {
      $scope.isLoading = true;
      SignUpService.registrationUser($scope.data).success(function(result) {
        if(authService.setUserIdentity(result)){
          $state.go("tab.dash");
          $scope.data = {};
        }
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Registration failed!',
          template: data.error
        });
      }).finally(function() {
          $scope.isLoading = false;
      })
    };
  });
