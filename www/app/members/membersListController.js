'use strict';
angular.module('app')
  .controller('MembersListCtrl', function($scope, membersService, $ionicPopup, authService, $ionicLoading) {
    $scope.newMember = {};
    $scope.membersService = membersService;
    $scope.membersService.members = [];
    $scope.currentUser = authService.getUserIdentity().user;

    $scope.default_image = 'img/unknown1.png';
    $scope.getImage = function(imageUrl){
      return imageUrl ? imageUrl :  $scope.default_image;
    };


    $ionicLoading.show();
    membersService.fetchAllMembers(authService.getUserIdentity().companyId).success(function(result) {
      $scope.membersService.members = result.data;
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Something went wrong!',
        template: data.error
      });
    }).finally(function() {
      $ionicLoading.hide();
    });

    $scope.remove = function(member) {
      membersService.removeMember(authService.getUserIdentity().companyId, member).success(function() {
        $scope.membersService.members.splice($scope.membersService.members.indexOf(member), 1);
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Something went wrong!',
          template: data.error
        });
      }).finally(function() {
      });
    };
  });
