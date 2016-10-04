'use strict';
angular.module('app')
  .controller('AddUserCtrl', function($scope, usersService,$ionicPopup,authService,$ionicHistory,$ionicLoading) {
    $scope.userData = {};
    $scope.title = 'Add a new user';
    $scope.usersService = usersService;

    $scope.onFileSelect = function($files) {
      if($files.length > 0) {
        $scope.file = $files;
      }
    };
    $scope.sendUser = function(user) {
      $ionicLoading.show();
      usersService.addUser(user, authService.getUserIdentity().user.companyId, $scope.file).success(function(result) {
        $scope.usersService.users.push(result.data);
        $scope.userData.username = '';
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
