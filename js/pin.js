'use strict';
(function () {
  var MIN_INDEX = 0;
  var MAX_PIN_NUMBER = 5;
  var PIN_CORR_Y = 70;
  var PIN_CORR_X = 25;
  var LEFT = 570;
  var TOP = 375;
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var mainPin = document.querySelector('.map__pin--main');
  var pinDataArray = [];

  var generatePin = function (array) {
    var element = mapPin.cloneNode(true);
    element.tabIndex = 0;
    element.style.left = (array.location.x - PIN_CORR_X) + 'px';
    element.style.top = (array.location.y - PIN_CORR_Y) + 'px';
    element.querySelector('img').src = array.author.avatar;
    element.querySelector('img').alt = array.offer.title;
    element.addEventListener('click', function () {
      window.card.renderCard(array);
    });
    return element;
  };

  var renderPins = function (array) {
    if (!pinDataArray[MIN_INDEX]) {
      array.forEach(function (it) {
        pinDataArray.push(it);
      });
    }
    array.slice(MIN_INDEX, MAX_PIN_NUMBER).forEach(function (it) {
      pinList.appendChild(generatePin(it));
    });
  };

  var onLoadPinsError = function (message) {
    var error = errorMessage.cloneNode(true);
    error.querySelector('p').textContent = message;
    document.querySelector('.map').appendChild(error);
  };

  var loadPins = function () {
    window.backend.load(renderPins, onLoadPinsError);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var placeMainPinDefault = function () {
    mainPin.style.left = LEFT + 'px';
    mainPin.style.top = TOP + 'px';
    window.form.addressInput.value = window.form.getPinCoordinates(mainPin);
  };

  window.pin = {
    mainPin: mainPin,
    placeMainPinDefault: placeMainPinDefault,
    removePins: removePins,
    loadPins: loadPins,
    renderPins: renderPins,
    pinDataArray: pinDataArray
  };
})();
