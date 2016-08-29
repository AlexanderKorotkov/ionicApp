'use strict';
angular.module('app')
  .service('LoginService', function($http, appConfig) {
    return {
      loginUser: function(user) {
        return $http.post(appConfig.apiMainUrl + '/session/signIn', user);
      }
    }
  });
