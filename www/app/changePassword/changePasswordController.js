'use strict';
angular.module('app')
  .controller('ChangePasswordCtrl', function($scope, ChangePasswordService, $ionicPopup, $ionicLoading, authService, $state) {
    $scope.passwordData = {};
    $scope.currentUser = authService.getUserIdentity().user;

    $scope.updatePassword = function() {
      $ionicLoading.show();
      ChangePasswordService.updatePassword($scope.passwordData, $scope.currentUser._id).success(function(result) {
        $ionicPopup.alert({
          title: 'Success',
          template: result.message
        });
        $state.go('tab.dash');
      }).error(function(result) {
        $ionicPopup.alert({
          title: 'Login failed!',
          template: result.error
        });
      }).finally(function() {
        $ionicLoading.hide();
      });
    };
  });
