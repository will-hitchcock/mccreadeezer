var mcCreaDeezer = angular.module('mcCreaDeezer', ['ngRoute', 'pageCtrl', 'playerService'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/bio', {
            templateUrl: 'partials/bio.html',
            controller: 'BioCtrl'
        })
        .when('/music', {
            templateUrl: 'partials/music.html',
            controller: 'MusicCtrl'
        })
        .when('/video', {
            templateUrl: 'partials/video.html',
            controller: 'VideoCtrl'
        })
        .when('/events', {
            templateUrl: 'partials/events.html',
            controller: 'EventsCtrl'
        })
        .otherwise({
            templateUrl: 'partials/header.html',
            controller: 'HeaderCtrl'
        })
}])

.run(['$rootScope', '$location', '$anchorScroll', function($rootScope, $location, $anchorScroll) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    if($location.hash()) $anchorScroll();  
  });
}]);