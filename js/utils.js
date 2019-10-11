'use strict';
(function () {
  var randomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };
  var removeClass = function (element, classname) {
    element.classList.remove(classname);
  };

  window.utils = {
    randomNumber: randomNumber,
    removeClass: removeClass
  };
})();
