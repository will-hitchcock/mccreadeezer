angular.module('dragDealer', [])

//set the height of the target element to the height of its child .ng-enter
//useful for animations that require position absolute during the animation

.directive('dragDealer', ['$interval', function($interval) {

  function link(scope, element, attrs) {

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
    // fn customRequestAnimationFrame Provide custom requestAnimationFrame function (used in tests).
    // fn customCancelAnimationFrame Provide custom cancelAnimationFrame function (used in tests).
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
        css3: true

      },
      options = {
        disabled: attrs.ddDisabled,
        horizontal: attrs.ddHorizontal,
        vertical: attrs.ddVertical,
        x: attrs.ddX,
        y: attrs.ddY,
        steps: attrs.ddSteps,
        snap: attrs.ddSnap,
        slide: attrs.ddSlide,
        loose: attrs.ddLoose,
        top: attrs.ddTop,
        bottom: attrs.ddBottom,
        left: attrs.ddLeft,
        right: attrs.ddRight,
        handleClass: attrs.ddHandleClass,
        css3: attrs.ddCss3
      };

    settings = $.extend({}, defaults, options);
    // console.log(attrs, settings);

    new Dragdealer(element[0], settings);

    element.on('$destroy', function() {
      // Dragdealer.destroy();
    });

    // start the UI update process; save the timeoutId for canceling
    
    //TODO: Add debounce logic to this to prevent this event firing many times per animation sequence
    // timeoutId = $interval(function() {
    //   var height = 0;
  		// element.children('.ng-enter').each(function() {
  		// 	height = $(this).height();
  		// 	element.css('min-height', height);
    //   });
    // }, 100);
  }

  return {
    link: link
  };
}]);