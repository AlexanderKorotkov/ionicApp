'use strict';
angular.module('app')
.service('mainService', function(appConfig,$http,authService) {

    this.company = {};

    this.getLocalCharts = function(memberId) {
      for (var i = 0; i < this.members.length; i++) {
        if (this.members[i]._id === members) {
          return this.members[i];
        }
      }
      return null;
    };

    this.fetchCompany = function(userId) {
      return $http.get(appConfig.apiMainUrl + '/company/'+companyId+'/fetchCompany', {
        headers: {'authorization': authService.getAuthorizationHeader()}
      });
    };


});
