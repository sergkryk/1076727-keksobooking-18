'use strict';
(function () {
  var LEFT = 570;
  var TOP = 375;
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var placeDefault = function () {
    mapPinMain.style.left = LEFT + 'px';
    mapPinMain.style.top = TOP + 'px';
    window.form.addressInput.value = window.form.getPinCoordinates(mapPinMain);
  };

  var activatePage = function () {
    window.utils.removeClass(map, 'map--faded');
    window.utils.removeClass(window.form.yourAdForm, 'ad-form--disabled');
  };

  var deactivatePage = function () {
    window.utils.addClass(map, 'map--faded');
    window.utils.addClass(window.form.yourAdForm, 'ad-form--disabled');
  };

  var activateForm = function () {
    window.form.enableFieldset(window.form.yourAdFormFields);
    window.form.addressInput.value = window.form.getPinCoordinates(mapPinMain);
    window.form.addressInput.readOnly = true;
  };

  var deactivateForm = function () {
    window.form.disableFieldset(window.form.yourAdFormFields);
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
    placeDefault: placeDefault,
    deactivatePage: deactivatePage,
    deactivateForm: deactivateForm,
    mainPinClickHandler: mainPinClickHandler
  };
})();
