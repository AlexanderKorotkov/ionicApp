'use strict';
angular.module('app')
  .controller('AddMemberCtrl', function($scope, membersService,$ionicPopup,authService,$ionicHistory,$ionicLoading) {
    $scope.memberData = {};
    $scope.title = 'Add a new member';
    $scope.membersService = membersService;

    $scope.onFileSelect = function($files) {
      if($files.length > 0) {
        $scope.file = $files;
      }
    };
    $scope.sendMemeber = function(member) {
      $ionicLoading.show();
      membersService.addMember(member, authService.getUserIdentity().user.companyId, $scope.file).success(function(result) {
        $scope.membersService.members.push(result.data);
        $scope.memberData.username = '';
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
