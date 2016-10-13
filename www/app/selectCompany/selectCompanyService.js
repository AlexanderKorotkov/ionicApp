'use strict';
angular.module('app')
  .service('selectCompanyService', function($http, appConfig, authService) {
      this.getUserCompanyList = function(userId) {
        return $http.get(appConfig.apiMainUrl + '/users/'+ userId +'/getUserCompanyList',  {
          headers: {'authorization': authService.getAuthorizationHeader()}
        });
      };
      this.selectCompany = function(userId, company) {
          return $http.post(appConfig.apiMainUrl + '/users/selectCompany', {userId:userId, companyInfo: company.companyInfo},{
            headers: {'authorization': authService.getAuthorizationHeader()}
          });
        }
  });
