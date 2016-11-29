var mcCreaDeezer = angular.module('mcCreaDeezer', ['ngRoute', 'pageCtrl']);



mcCreaDeezer.factory('PlayerService', ['$rootScope', '$document', function($rootScope, $document) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    return {
        audioElement: audioElement,
        songList: [],
        curSong: {},
        curIndex: 0,
        playing: false,
        position: 0,
        curPosition: 0,
        scrollTimer: null,

        play: function(i) {
            this.audioElement.src = this.songList[i].mp3;
            this._setCurSong(i);
            this._startPlayBack();
        },
        playPause: function() {
            if (this.playing) {
                this._stopPlayBack()
            } else {
                this._startPlayBack();
            }
        },
        next: function() {
            //implement next
            this.curIndex++;
            this.play(this.curIndex);
        },
        prev: function() {
            //implement prev
            this.curIndex--;
            this.play(this.curIndex);
        },
        populateSongList: function(songList) {
            //init
            var self = this;
            this.songList = angular.copy(songList);
            this._setCurSong(this.curIndex);
            this.audioElement.ontimeupdate = function() {
                self.updateCurPosition();
            };

            this.audioElement.onended = function() {
                console.log('hello, song is over');
                self.next();
            }
        },


        _setCurSong: function(i) {
            this.curIndex = i;
            this.curSong = angular.copy(this.songList[i]);
            this.audioElement.src = this.songList[i].mp3;
        },
        _startPlayBack: function() {
            this.playing = true;
            this.audioElement.play(); //  <-- Thats all you need

        },
        _stopPlayBack: function() {
            this.playing = false;
            this.audioElement.pause(); //  <-- Thats all you need
        },
        updateCurPosition: function() {
            this.curPosition = (this.audioElement.currentTime / this.audioElement.duration)*100;
            $rootScope.$apply();
        }
    }
}])

.factory('StickyService', ['$rootScope', '$document', function($rootScope, $document) {
    return {
        sticky: false,
        update: function(sticky) {
            this.sticky = sticky;
        }
    };
}])

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