angular.module('dragdealer', [])

//set the height of the target element to the height of its child .ng-enter
//useful for animations that require position absolute during the animation

.directive('dragdealer', ['$timeout', function($timeout) {

  function link($scope, $element, attrs) {

    // bool disabled=false Init Dragdealer in a disabled state. The handle will have a .disabled class.
    // bool horizontal=true Enable horizontal dragging.
    // bool vertical=false Enable vertical dragging.
    // number x=0 Initial horizontal (left) position. Accepts a float number value between 0 and 1.
    // number y=0 Initial vertical (top) position. Accepts a float number value between 0 and 1.
    // number steps=0 Limit the positioning of the handle within the bounds of the wrapper, by defining a virtual grid made out of a number of equally-spaced steps. This restricts placing the handle anywhere in-between these steps. E.g. setting 3 steps to a regular slider will only allow you to move it to the left, to the right or exactly in the middle.
    // bool snap=false When a number of steps is set, snap the position of the handle to its closest step instantly, even when dragging.
    // bool slide=true Slide handle after releasing it, depending on the movement speed before the mouse/touch release.
    // bool loose=false Loosen-up wrapper boundaries when dragging. This allows the handle to be *slightly* dragged outside the bounds of the wrapper, but slides it back to the margins of the wrapper upon release.
    // number top=0 Top padding between the wrapper and the handle.
    // number bottom=0 Bottom padding between the wrapper and the handle.
    // number left=0 Left padding between the wrapper and the handle.
    // number right=0 Right padding between the wrapper and the handle.
    // fn callback(x, y) Called when releasing handle, with the projected x, y position of the handle. Projected value means the value the slider will have after finishing a sliding animation, caused by either a step restriction or drag motion (see steps and slide options.)
    // fn dragStopCallback(x, y) Same as callback(x,y) but only called after a drag motion, not after setting the step manually.
    // fn dragStartCallback(x, y) Same as dragStopCallback(x,y) but called at the beginning of a drag motion and with the sliders initial x, y values.
    // fn animationCallback(x, y) Called every animation loop, as long as the handle is being dragged or in the process of a sliding animation. The x, y positional values received by this callback reflect the exact position of the handle DOM element, which includes exceeding values (even negative values) when the loose option is set true.
    // string handleClass=handle Custom class of handle element.
    // bool css3=true Use css3 transform in modern browsers instead of absolute positioning.
    
    var 
      defaults = {
        disabled: false,
        horizontal: true,
        vertical: false,
        x: 0,
        y: 0,
        steps: 0,
        snap: false,
        slide: true,
        loose: false,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        handleClass: 'handle',
        css3: true,
        snapOnSet: false,
      },
      options = {
        disabled: $scope.disabled,
        horizontal: $scope.horizontal,
        vertical: $scope.vertical,
        x: $scope.x,
        y: $scope.y,
        steps: $scope.steps,
        snap: $scope.snap,
        slide: $scope.slide,
        loose: $scope.loose,
        top: $scope.top,
        bottom: $scope.bottom,
        left: $scope.left,
        right: $scope.right,
        handleClass: $scope.handleClass,
        css3: $scope.css3,
        snapOnSet: $scope.snapOnSet
      },
      callbacks = {
        callback: function(x, y) {
          if (typeof $scope.options.callback !== 'function') {
            return;
          }

          $timeout(function () {
            $scope.$apply(function () {
              $scope.options.callback(x, y);
            });
          });
        },
        dragStopCallback: function(x, y) {
          if (typeof $scope.options.dragStopCallback !== 'function') {
            return;
          }

          $timeout(function () {
            $scope.$apply(function () {
              $scope.options.dragStopCallback(x, y);
            });
          });
        }, 
        dragStartCallback: function(x, y) {
          if (typeof $scope.options.dragStartCallback !== 'function') {
            return;
          }

          $timeout(function () {
            $scope.$apply(function () {
              $scope.options.dragStartCallback(x, y);
            });
          });
        },
        animationCallback: function(x, y) {
          if (typeof $scope.options.animationCallback !== 'function') {
            return;
          }

          $timeout(function () {
            $scope.$apply(function () {
              $scope.options.animationCallback(x, y);
            });
          });
        }
      };

    settings = angular.element.extend({}, defaults, options, $scope.options, callbacks);

    var drag = new Dragdealer($element[0], settings);

    //watch for changes to x and y and update position of drag
    //could add option for this behavior

    $scope.$watch(
      function() {
          return $scope.options;
      },
      function(value) {
          x = value.x/100 || 0;
          y = value.y/100 || 0;

          drag.setValue(x, y, settings.snapOnSet);
      }, true);

    $element.on('$destroy', function() {

    });
  }

  return {
    restrict: 'E',
    scope: {
      disabled: '=disabled',
      horizontal: '=horizontal',
      vertical: '=vertical',
      x: '=x',
      y: '=y',
      steps: '=steps',
      snap: '=snap',
      slide: '=slide',
      loose: '=loose',
      top: '=top',
      bottom: '=bottom',
      left: '=left',
      right: '=right',
      handleClass: '=handleClass',
      css3: '=css3',
      snapOnSet: '=snapOnSet',
      options: '=options'
    },
    link: link
  };
}]);