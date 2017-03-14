var pageCtrls = angular.module('pageCtrl', []);

pageCtrls
    .controller('HeadCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/head.json').then(function(resp) {
            $scope.head = resp.data;
        });
    }])
    .controller('HeaderCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/header.json').then(function(resp) {
            $scope.header = resp.data;
        });
    }])
    .controller('NavCtrl', ['$scope', '$http', '$location', function($scope, $http,  $location) {
        $http.get('json/nav.json').then(function(resp) {
            $scope.nav = resp.data;
        });

        $scope.curPage = '#' + $location.url();

        $scope.$on('$locationChangeSuccess', function() {
            $scope.curPage = '#' + $location.url();
        });
    }])
    .controller('BioCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/bio.json').then(function(resp) {
            $scope.bio = resp.data;
        });


    }])
    .controller('MusicCtrl', ['$scope', '$http', 'PlayerService', function($scope, $http, $playerService) {
        $http.get('json/music.json').then(function(resp) {
            $scope.music = resp.data;
        });

        $scope.playSong = function($index) {
            $playerService.play($index);
        }

        $scope.$watch(
            function() {
                return $playerService._curIndex;
            },
            function(value) {
                $scope.curIndex = value;
            },
            true
        );

        $scope.$watch(
            function() {
                return $playerService._playing;
            },
            function(value) {
                $scope.playing = value;
            },
            true
        );
    }])
    .controller('VideoCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
        $http.get('json/video.json').then(function(resp) {
            $scope.video = resp.data;
            for (var i = $scope.video.length - 1; i >= 0; i--) {
                $scope.video[i].trustedUrl = $sce.trustAsResourceUrl($scope.video[i].url);
            };
            $scope.slickConfig.enabled = true;
        });
        $scope.slickConfig = {
            prevArrow: '<a class="carousel-arrow prev"></a>',
            nextArrow: '<a class="carousel-arrow next"></a>',
            enabled: false
        }
    }])
    .controller('EventsCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/event.json').then(function(resp) {
            $scope.event = resp.data;
            $scope.slickConfig.enabled = true;
        });
        $scope.slickConfig = {
            prevArrow: '<a class="carousel-arrow prev"></a>',
            nextArrow: '<a class="carousel-arrow next"></a>',
            enabled: false,
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    draggable: true
                }
            }],
        }
    }])
    .controller('PlayerCtrl', ['$scope', '$http', 'PlayerService', function($scope, $http, $playerService) {
        $http.get('json/music.json').then(function(resp) {
            $scope.music = resp.data;
            $playerService.init({
                songList: $scope.music.songs
            });
        });
        $scope.curSong = angular.copy($playerService.curSong);
        $scope.playing = $playerService.playing;
        // $scope.curPosition = $playerService.curPosition;
        $scope.curPosition = 50;

        $scope.dragOptions = {
            dragStartCallback: function(x, y) {
                $playerService.stopProgressBar();
            },
            animationCallback: function(x, y) {
                $scope.curPosition = (x * 100);
            },
            dragStopCallback: function(x, y) {
                $playerService.resumeProgressBar();

                var seekTo = $playerService._audioElement.duration * x;
                $playerService.seek(seekTo);
            }
        }

        $scope.playPause = function() {
            $playerService.playPause();
        }

        $scope.next = function() {
            $playerService.next();
        }

        $scope.prev = function() {
            $playerService.prev();
        }

        $scope.$watch(
            function() {
                return $playerService._curPosition;
            },
            function(value) {
                $scope.curPosition = value;

                // adjust the position to account for the width of the handle
                $scope.dragOptions.x = value; 
            }
        );

        $scope.$watch(
            function() {
                return $playerService._curSong;
            },
            function(value) {
                $scope.curSong = angular.copy(value);
            },
            true
        );

        $scope.$watch(
            function() {
                return $playerService._playing;
            },
            function(value) {
                $scope.playing = value;
            }
        );
    }])
    .controller('SocialCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/social.json').then(function(resp) {
            $scope.social = resp.data;
        });
    }]);