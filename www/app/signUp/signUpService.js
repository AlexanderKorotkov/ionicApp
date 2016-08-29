'use strict';
angular.module('app')
  .service('SignUpService', function($http, appConfig) {
    return {
      registrationUser: function(user) {
        return $http.post(appConfig.apiMainUrl + '/session/signUp', user);
      }
    }
  });
