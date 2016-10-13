'use strict';
angular.module('app')
  .service('ChangePasswordService', function($http, appConfig, authService) {
    return {
      updatePassword: function(passwordData, userId) {
        return $http.post(appConfig.apiMainUrl + '/session/updatePassword', {passwordData:passwordData, userId:userId}, {
          headers: {'authorization': authService.getAuthorizationHeader()}
        });
      }
    }
  });
