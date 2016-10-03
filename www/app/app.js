"use strict";
angular.module('app', ['ionic','ngCookies', 'ngMessages','ngFileUpload'])
.run(function($ionicPlatform, $rootScope, $state, authService) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    $rootScope.$on("$stateChangeStart", function (event, toState) {
      if (authService.isAuthenticated() && !toState.data) {
        event.preventDefault();
        $state.go("tab.members");
      } else if (!authService.isAuthenticated() && toState.data) {
        event.preventDefault();
        $state.go("login");
      }
    });

})

.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider, $compileProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype|tel):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|ftp):|data:image\//);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the www can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/tabs.html',
    controller: 'MainCtrl',
    data: true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: 'app/signUp/signUp.html',
    controller: 'SignUpCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'app/dashboard/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.members', {
      url: '/members',
      views: {
        'tab-chats': {
          templateUrl: 'app/members/membersList.html',
          controller: 'MembersListCtrl'
        }
      }
    })
    .state('tab.memberDetail', {
      url: '/members/:userId',
      views: {
        'tab-chats': {
          templateUrl: 'app/members/memberDetail.html',
          controller: 'MemberDetailCtrl'
        }
      }
    })
    .state('tab.addMember', {
      url: '/members/addMember',
      views: {
        'tab-chats': {
          templateUrl: 'app/members/addEditMember.html',
          controller: 'AddMemberCtrl'
        }
      }
    })
    .state('tab.editMember', {
      url: '/members/:userId/editMember',
      views: {
        'tab-chats': {
          templateUrl: 'app/members/addEditMember.html',
          controller: 'EditMemberCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'app/account/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.go("login");
    });
  $httpProvider.interceptors.push('httpInterceptor');
});
