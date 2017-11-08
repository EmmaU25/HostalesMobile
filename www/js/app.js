// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myapp=angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);

myapp.run(function($ionicPlatform) {
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
});

myapp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: false,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/home',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'promo'
      }
    }
  })
.state('tab.busqueda', {
      url: '/busqueda/:palabraClave',
      views: {
        'tab-busqueda': {
          templateUrl: 'templates/resultadoBusqueda.html',
          controller: 'busqueda'
        }
      }
    })
  .state('tab.chats', {
      url: '/directorio',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'directorio'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/detalle/:idProducto',
      views: {
        'tab-dash': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'detalle'
        }
      }
    })
    .state('tab.anunciar', {
      url: '/anunciar',
      views: {
        'tab-anunciar': {
          templateUrl: 'templates/anunciar.html',
          controller: 'anuncio'
        }
      }
    })
  .state('tab.account', {
    url: '/reservar/:idProducto',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-account.html',
        controller: 'reserva'
      }
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
