"use strict";

angular.module("app").factory("authService", function ($http, $cookieStore, $rootScope, $timeout, $window, $log) {
  var that = this,
    identity = null;
  that.getIdentity = function () {
      if (null !== $window.localStorage.getItem("identity")) {
          identity = angular.fromJson($window.localStorage.getItem("identity"));
          console.log("User loaded from local storage");
      }
  };
  that.saveIdentity = function () {
    console.log(identity)
      $window.localStorage.setItem("identity", angular.toJson(identity));
  };
  that.removeIdentity = function () {
      $window.localStorage.removeItem("identity");
      identity = null;
  };
  that.getIdentity();
  return {
      updateIdentityMedia: function (media) {
          identity.user.profile.media = media;
          that.saveIdentity();
          return true;
      },
      updateIdentityProfile: function (profile) {
          identity.user.profile = profile;
          that.saveIdentity();
          return true;
      },
      setUserIdentity: function (user) {
          if (user) {
              identity = user;
              that.saveIdentity();
              return true;
          }
          $log.error("User Identity has to have access_token");
          return false;
      },
      getUserIdentity: function () {
          return identity;
      },
      removeUserIdentity: function () {
          that.removeIdentity();
          return true;
      },
      isAuthenticated: function () {
          return identity !== null;
      },
      getAuthorizationHeader: function () {
        return 'Bearer ' + identity ? identity.token : null;
      }
  };
});


