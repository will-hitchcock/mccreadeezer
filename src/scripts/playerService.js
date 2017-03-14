angular.module('playerService', ['dragdealer'])

.factory('PlayerService', ['$rootScope', '$document', function($rootScope, $document) {
    var audioElement = $document[0].createElement('audio'); // <-- Magic trick here
    return {
        _audioElement: audioElement,
        _songList: [],
        _curSong: {},
        _curIndex: -1,
        _playing: false,
        _curPosition: 0,
        _seeking: false,

        play: function(i) {

            if(i === this._curIndex) {
                //do nothing if trying to play the current song or play/pause
                this.playPause();
                return;
            }
            this._audioElement.src = this._songList[i].mp3;
            this._setCurSong(i);
            this._startPlayBack();
        },
        playPause: function() {
            if (this._curIndex < 0) {
                this._curIndex = 0;
                this._setCurSong(this._curIndex);
            }
            if (this._playing) {
                this._stopPlayBack()
            } else {
                this._startPlayBack();
            }
        },
        next: function() {
            //implement next
            this.play(this._curIndex + 1);
        },
        prev: function() {
            //implement prev
            this.play(this._curIndex - 1);
        },
        seek: function(seekTo) {
            //implement seek
            this._audioElement.currentTime = seekTo;
        },
        init: function(data) {
            //init
            var self = this;
            this._songList = angular.copy(data.songList);
            
            this._curSong = angular.copy(data.songList[0]);
            
            this._audioElement.ontimeupdate = function() {
                if(!self._seeking){
                    self.updateCurPosition();
                }
            };

            this._audioElement.onended = function() {
                self.next();
            }
        },


        _setCurSong: function(i) {
            this._curIndex = i;
            this._curSong = angular.copy(this._songList[i]);
            this._audioElement.src = this._songList[i].mp3;
        },
        _startPlayBack: function() {
            this._playing = true;
            this._audioElement.play(); //  <-- Thats all you need

        },
        _stopPlayBack: function() {
            this._playing = false;
            this._audioElement.pause(); //  <-- Thats all you need

        },
        // stops the playing progress from being updated automatically
        stopProgressBar: function() {
            this._seeking = true;
        },
        resumeProgressBar: function() {
            this._seeking = false;
        },
        updateCurPosition: function(num) {
            this._curPosition = (this._audioElement.currentTime / this._audioElement.duration)*100;
            $rootScope.$apply();
        }
    }
}]);