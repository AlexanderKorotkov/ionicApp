'use strict';
angular.module('app')
  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, authService, appConfig,$ionicLoading) {
    $scope.user = {
      client_id: appConfig.apiClient.user,
      client_secret: appConfig.apiClient.secret
    };

    $scope.login = function() {
      $ionicLoading.show();
      LoginService.loginUser($scope.user).success(function(result) {
        if(authService.setUserIdentity(result)){
          if(_.size(result.currentCompany) === 0){
            $state.go("tab.selectCompany");
          }else{
            $state.go("tab.users");
          }
          $scope.user = {};
        }
      }).error(function(result) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: result.error
        });
      });
    };
  });
