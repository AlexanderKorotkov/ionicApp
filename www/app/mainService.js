'use strict';
angular.module('app')
.service('mainService', function(appConfig,$http,authService) {


    this.fetchCompany = function(userId) {
      return $http.get(appConfig.apiMainUrl + '/company/'+companyId+'/fetchCompany', {
        headers: {'authorization': authService.getAuthorizationHeader()}
      });
    };


});
