'use strict';
(function () {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = window.map.map.querySelector('.map__pins');

  var generatePin = function (array) {
    var element = mapPin.cloneNode(true);
    element.tabIndex = 0;
    element.style.left = (array.location.x - 25) + 'px';
    element.style.top = (array.location.y - 70) + 'px';
    element.querySelector('img').src = array.author.avatar;
    element.querySelector('img').alt = array.offer.title;
    element.addEventListener('click', function () {
      window.card.renderCard(array);
    });
    return element;
  };

  var renderPins = function (array) {
    array.forEach(function (it) {
      pinList.appendChild(generatePin(it));
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
