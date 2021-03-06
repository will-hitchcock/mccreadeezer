var mcCreaDeezer = angular.module('mcCreaDeezer', ['ngRoute', 'pageCtrl']);



mcCreaDeezer.factory('PlayerService', ['$rootScope', '$document', function($rootScope, $document) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    return {
        audioElement: audioElement,
        songList: [],
        curSong: {},
        curIndex: -1,
        playing: false,
        position: 0,
        curPosition: 0,
        scrollTimer: null,

        play: function(i) {

            if(i === this.curIndex) {
                //do nothing if trying to play the current song or play/pause
                this.playPause();
                return;
            }
            this.audioElement.src = this.songList[i].mp3;
            this._setCurSong(i);
            this._startPlayBack();
        },
        playPause: function() {
            if (this.curIndex < 0) {
                this.curIndex = 0;
                this._setCurSong(this.curIndex);
            }
            if (this.playing) {
                this._stopPlayBack()
            } else {
                this._startPlayBack();
            }
        },
        next: function() {
            //implement next
            this.play(this.curIndex + 1);
        },
        prev: function() {
            //implement prev
            this.play(this.curIndex - 1);
        },
        populateSongList: function(songList) {
            //init
            var self = this;
            this.songList = angular.copy(songList);
            
            this.curSong = angular.copy(songList[0]);
            
            this.audioElement.ontimeupdate = function() {
                self.updateCurPosition();
            };

            this.audioElement.onended = function() {
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