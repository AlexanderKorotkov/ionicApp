'use strict';

/**
 * @module httpInterceptor
 * @description
 * catches all responses. identifies if needs redirect to login and redirects
 **/

angular.module('app').factory('httpInterceptor', function( $log, $q, $injector ){

    return {
        'responseError': function(rejection) {
          var $state = $injector.get("$state");
          var authService = $injector.get("authService");

          $log.info('got bad response', rejection);

          if ( rejection.status === 403 ){
              $log.info('redirecting to login page');
              if (authService.isAuthenticated()) {
                authService.removeUserIdentity();
              }
              $state.go("login");
          }

          return $q.reject(rejection);
        }
    };

});
