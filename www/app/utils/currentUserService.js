'use strict';
angular.module('app').service('currentUserService',  function(authService) {
      this.user = authService.getUserIdentity().user;
      this.companyId = authService.getUserIdentity().companyId;
});

