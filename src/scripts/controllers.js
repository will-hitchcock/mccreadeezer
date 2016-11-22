var pageCtrls = angular.module('pageCtrl', ['ngAnimate', 'slickCarousel', 'angular-inview']);

pageCtrls
    .controller('HeadCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/head.json').success(function(data) {
            $scope.head = data;
        });


    }])
    .controller('HeaderCtrl', ['$scope', '$http', 'StickyService', function($scope, $http, $sticky) {
        $http.get('json/header.json').success(function(data) {
            $scope.header = data;
        });

        $scope.sticky = $sticky.sticky;

        $scope.stick = function($inview) {
            $sticky.update(!$inview);
        }
    }])
    .controller('NavCtrl', ['$scope', '$http', 'StickyService', function($scope, $http, $sticky) {
        $http.get('json/nav.json').success(function(data) {
            $scope.nav = data;
        });

        $scope.sticky = $sticky.sticky;
        $scope.$watch(
            function() {
                return $sticky.sticky;
            },
            function(value) {
                $scope.sticky = value;
            }
        );
    }])
    .controller('BioCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/bio.json').success(function(data) {
            $scope.bio = data;
        });


    }])
    .controller('MusicCtrl', ['$scope', '$http', 'PlayerService', function($scope, $http, $playerService) {
        $http.get('json/music.json').success(function(data) {
            $scope.music = data;
            //$playerService.populateSongList($scope.music.songs);
        });

        $scope.playSong = function($index) {
            $playerService.play($index);
        }

    }])
    .controller('VideoCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
        $http.get('json/video.json').success(function(data) {
            $scope.video = data;
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
        $http.get('json/event.json').success(function(data) {
            $scope.event = data;
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
    .controller('FooterCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.date = new Date();
        $http.get('json/footer.json').success(function(data) {
            $scope.footer = data;
        });
    }])
    .controller('PlayerCtrl', ['$scope', '$http', 'PlayerService', function($scope, $http, $playerService) {
        
        $http.get('json/music.json').success(function(data) {
            $scope.music = data;
            $playerService.populateSongList($scope.music.songs);
        });

        $scope.curSong = angular.copy($playerService.curSong);
        $scope.playing = $playerService.playing;
        $scope.curPosition = $playerService.curPosition;

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
                return $playerService.curPosition;
            },
            function(value) {
                $scope.curPosition = value;
            }
        );

        $scope.$watch(
            function() {
                return $playerService.curSong;
            },
            function(value) {
                $scope.curSong = angular.copy(value);
            },
            true
        );

        $scope.$watch(
            function() {
                return $playerService.playing;
            },
            function(value) {
                $scope.playing = value;
            }
        );
    }])
    .controller('SocialCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('json/social.json').success(function(data) {
            $scope.social = data;
        });
    }]);