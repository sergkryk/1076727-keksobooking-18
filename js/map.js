'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var activatePage = function () {
    window.utils.removeClass(map, 'map--faded');
    window.utils.removeClass(window.form.yourAdForm, 'ad-form--disabled');
  };

  var activateForm = function () {
    window.form.enableFieldset(window.form.yourAdFormFields);
    window.form.addressInput.value = window.form.getPinCoordinates(mapPinMain);
    window.form.addressInput.readOnly = true;
  };

  var loadPins = function () {
    window.load.load(window.pin.renderPins, window.load.onErrorHandler);
  };

  // дейстиве при нажатии на главный пин на карте
  var mainPinClickHandler = function () {
    activatePage();
    activateForm();
    loadPins();
    mapPinMain.removeEventListener('mousedown', mainPinClickHandler);
  };

  mapPinMain.addEventListener('mousedown', mainPinClickHandler);

  window.map = {
    mapPinMain: mapPinMain,
    map: map,
  };
})();
