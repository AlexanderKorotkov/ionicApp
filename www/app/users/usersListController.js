'use strict';
angular.module('app')
  .controller('UsersListCtrl', function($scope, usersService, $ionicPopup, authService, $ionicLoading) {
    $scope.newUser = {};
    $scope.usersService = usersService;
    $scope.usersService.users = [];
    $scope.currentUser = authService.getUserIdentity().user;

    $scope.default_image = 'img/unknown1.png';
    $scope.getImage = function(imageUrl){
      return imageUrl ? imageUrl :  $scope.default_image;
    };

    $ionicLoading.show();
    usersService.fetchAllUsers($scope.currentUser.companyId).success(function(result) {
      $scope.usersService.users = result.data;
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Something went wrong!',
        template: data.error
      });
    }).finally(function() {
      $ionicLoading.hide();
    });

    $scope.remove = function(user) {
      usersService.removeUser($scope.currentUser.companyId, user).success(function() {
        $scope.usersService.users.splice($scope.usersService.users.indexOf(user), 1);
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Something went wrong!',
          template: data.error
        });
      }).finally(function() {
      });
    };
  });
