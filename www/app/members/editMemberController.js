'use strict';
angular.module('app')
  .controller('EditMemberCtrl', function($scope, membersService,$ionicPopup,authService,$ionicHistory,$ionicLoading,$stateParams) {
    $scope.isEdit = true;
    $scope.title = 'Edit member';
    $scope.memberData = {};
    $scope.membersService = membersService;
    $scope.memberData = membersService.getLocalCharts($stateParams.userId);

    $scope.onFileSelect = function($files) {
      if($files.length > 0) {
        $scope.file = $files;
      }
    };


    $scope.updateMember = function(member) {
      $ionicLoading.show();
      membersService.updateMember(member, authService.getUserIdentity().user.companyId, $stateParams.userId, $scope.file).success(function(result) {
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
