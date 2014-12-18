
angular.module('app', [
  'ngRoute',
  'flashpoint'
])
.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})
.run(function($location) {

  if ($location.host() === 'localhost' || $location.host().match(/(\d{1,3}\.){3}\d{1,3}/)) {

    // this is either localhost or a plain IP address, so probably development mode.
    // Connect to socket.io.
    var socket = io();
    socket.on('reload', function() {
      location.reload(true);
    });

  }

});
