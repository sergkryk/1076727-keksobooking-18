'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var randomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  var removeClass = function (element, classname) {
    element.classList.remove(classname);
  };

  window.utils = {
    randomNumber: randomNumber,
    removeClass: removeClass,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
