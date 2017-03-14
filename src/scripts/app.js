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
}]);