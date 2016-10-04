'use strict';
angular.module('app')
.service('usersService', function(appConfig,$http,authService, Upload) {

    this.users = [];

    this.getUserList = function(userId) {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].userId === userId) {
          return this.users[i];
        }
      }
      return null;
    };

    this.addUser = function(user,companyId, file) {
      return Upload.upload({
        url: appConfig.apiMainUrl + '/users/'+companyId+'/create',
        method: 'POST',
        fields:{user :user},
        headers: {'authorization': authService.getAuthorizationHeader()},
        file: file
      })
    };
    this.updateUser = function(user,companyId,userId, file) {
      return Upload.upload({
        url: appConfig.apiMainUrl + '/users/'+companyId+'/update',
        method: 'POST',
        fields:{user :user, userId:userId},
        headers: {'authorization': authService.getAuthorizationHeader()},
        file: file
      })
    };
    this.fetchAllUsers = function(companyId) {
      return $http.get(appConfig.apiMainUrl + '/users/'+companyId+'/fetchUsers', {
        headers: {'authorization': authService.getAuthorizationHeader()}
      });
    };
    this.removeUser = function(companyId,user) {
      return $http.post(appConfig.apiMainUrl + '/users/'+companyId+'/removeUser', {user:user}, {
        headers: {'authorization': authService.getAuthorizationHeader()}
      });
    };

});
