'use strict';
angular.module('app')
  .controller('EditUserCtrl', function($scope, usersService,$ionicPopup,authService,$ionicHistory,$ionicLoading,$stateParams) {
    $scope.isEdit = true;
    $scope.title = 'Edit user';
    $scope.userData = {};
    $scope.usersService = usersService;
    $scope.userData = usersService.getUserList($stateParams.userId);
    $scope.currentUser = authService.getUserIdentity().user;

    $scope.onFileSelect = function($files) {
      if($files.length > 0) {
        $scope.file = $files;
      }
    };


    $scope.updateUser = function(user) {
      $ionicLoading.show();
      usersService.updateUser(user, $scope.currentUser.currentCompany.companyId, $stateParams.userId, $scope.file).success(function(result) {
        $ionicHistory.goBack();
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Something went wrong!',
          template: data.error
        });
      }).finally(function() {
        $ionicLoading.hide();
      })
    };
  });
