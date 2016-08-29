"use strict";
angular.module('app', ['ionic','ngCookies', 'ngMessages'])
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
        $state.go("tab.dash");
      } else if (!authService.isAuthenticated() && toState.data) {
        event.preventDefault();
        $state.go("signUp");
      }
    });

})

.config(function($stateProvider, $urlRouterProvider,$httpProvider,$ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
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

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'app/chats/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'app/chats/chat-detail.html',
          controller: 'ChatDetailCtrl'
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
