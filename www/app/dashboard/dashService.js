'use strict';
angular.module('app')
.service('DashService', function(authService, appConfig, $http) {
    return {
      //getCompanyList: function(userId) {
      //  return $http.get(appConfig.apiMainUrl + '/users/'+userId+'/getUserInfo',  {
      //    headers: {'authorization': authService.getAuthorizationHeader()}
      //  });
      //}
    }
  });

