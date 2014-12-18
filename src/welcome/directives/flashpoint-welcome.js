
angular.module('app')
.directive('flashpointWelcome', function($interval) {

  return {

    restrict: 'E',
    transclude: true,
    templateUrl: 'welcome/directives/templates/flashpoint-welcome.jade',
    link: function(scope, el, attrs) {

      console.log('hello world!');
      $interval(function() {
        el.toggleClass('show');
      }, 1000);

    }

  };

});
