'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var siteForm = document.querySelector('.ad-form');

  var removeClass = function (element, classname) {
    element.classList.remove(classname);
  };

  var addClass = function (element, classname) {
    element.classList.add(classname);
  };

  window.utils = {
    addClass: addClass,
    removeClass: removeClass,
    ESC_KEYCODE: ESC_KEYCODE,
    siteForm: siteForm
  };
})();
