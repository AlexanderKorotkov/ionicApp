'use strict';
angular.module('app')
  .controller('SignUpCtrl', function($scope, SignUpService, $ionicPopup, $state, $ionicLoading) {
    $scope.data = {};
    $scope.isLoading = false;

    $scope.signUp = function() {
      $ionicLoading.show();
      SignUpService.registrationUser($scope.data).success(function() {
        $state.go("login");
        $scope.data = {};
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Registration failed!',
          template: data.error
        });
      }).finally(function() {
          $ionicLoading.hide();
      })
    };
  });
