'use strict';
(function () {
  var map = document.querySelector('.map');

  var activateMap = function () {
    window.utils.removeClass(map, 'map--faded');
    window.utils.removeClass(window.form.yourAdForm, 'ad-form--disabled');
  };

  var deactivateMap = function () {
    window.utils.addClass(map, 'map--faded');
    window.utils.addClass(window.form.yourAdForm, 'ad-form--disabled');
  };

  var resetPage = function () {
    window.form.resetForm();
    window.pin.removePins();
    window.card.removeCard();
    window.pin.placeMainPinDefault();
    deactivateMap();
    window.form.deactivateForm();
    window.pin.mainPin.addEventListener('mousedown', mainPinClickHandler);
  };

  // дейстиве при нажатии на главный пин на карте
  var mainPinClickHandler = function () {
    activateMap();
    window.form.activateForm();
    window.pin.loadPins();
    window.pin.mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  window.pin.mainPin.addEventListener('mousedown', mainPinClickHandler);

  window.map = {
    map: map,
    resetPage: resetPage
  };
})();
