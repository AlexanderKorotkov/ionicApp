'use strict';
angular.module('app')
  .controller('selectCompanyCtrl', function($scope, selectCompanyService, $ionicPopup, $ionicLoading, authService) {
    $scope.currentUser = authService.getUserIdentity().user;
    $scope.companyList = [];
    $scope.selectedCompany = $scope.currentUser.currentCompany.companyName;

    $ionicLoading.show();
    selectCompanyService.getUserCompanyList($scope.currentUser._id).success(function(result){
      $scope.companyList = result;
    }).error(function(result) {
      $ionicPopup.alert({
        title: 'Login failed!',
        template: result.error
      });
    }).finally(function() {
      $ionicLoading.hide();
    });

    $scope.selectCompany = function(company){
      if($scope.selectedCompany === company.companyInfo.companyName){
        return false;
      }
      selectCompanyService.selectCompany($scope.currentUser._id, company).success(function(result){
        $scope.currentUser.currentCompany = result;
        authService.updateUserIdentity($scope.currentUser);
        $ionicPopup.alert({
          title: 'Company was changed to :',
          template: result.companyName
        });
      }).error(function(result) {
        $ionicPopup.alert({
          title: 'Login failed!',
          template: result.error
        });
      }).finally(function() {
        $ionicLoading.hide();
      });
    }
  });
