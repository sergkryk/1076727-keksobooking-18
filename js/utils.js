'use strict';
(function () {
  // генерация случайного числа
  window.utils = {
    randomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    removeClass: function (element, classname) {
      element.classList.remove(classname);
    }
  };
})();
