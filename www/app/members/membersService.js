'use strict';
angular.module('app')
.service('membersService', function(appConfig,$http,authService, Upload) {

    this.members = [];

    this.getLocalCharts = function(memberId) {
      for (var i = 0; i < this.members.length; i++) {
        if (this.members[i]._id === memberId) {
          return this.members[i];
        }
      }
      return null;
    };

    this.addMember = function(member,companyId, file) {
      return Upload.upload({
        url: appConfig.apiMainUrl + '/members/'+companyId+'/create',
        method: 'POST',
        fields:{member :member},
        headers: {'authorization': authService.getAuthorizationHeader()},
        file: file
      })
    };
    this.updateMember = function(member,companyId,memberId, file) {
      return Upload.upload({
        url: appConfig.apiMainUrl + '/members/'+companyId+'/update',
        method: 'POST',
        fields:{member :member, memberId:memberId},
        headers: {'authorization': authService.getAuthorizationHeader()},
        file: file
      })
    };
    this.fetchAllMembers = function(companyId) {
      return $http.get(appConfig.apiMainUrl + '/members/'+companyId+'/fetchMembers', {
        headers: {'authorization': authService.getAuthorizationHeader()}
      });
    };
    this.removeMember = function(companyId,member) {
      return $http.post(appConfig.apiMainUrl + '/members/'+companyId+'/removeMember', {member:member}, {
        headers: {'authorization': authService.getAuthorizationHeader()}
      });
    };

});
