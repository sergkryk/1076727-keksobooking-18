'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  // дейстиве при нажатии на главный пин на карте
  var mainPinClickHandler = function () {
    window.utils.removeClass(map, 'map--faded');
    window.utils.removeClass(window.form.yourAdForm, 'ad-form--disabled');
    window.form.enableFieldset(window.form.yourAdFormFields);
    window.pin.renderPins(window.data.mockArray);
    window.form.addressInput.value = window.form.getPinCoordinates(mapPinMain);
    window.form.addressInput.readOnly = true;
    mapPinMain.removeEventListener('mousedown', mainPinClickHandler);
  };
  // mapPinMain.addEventListener('click', mainPinClickHandler);

  window.map = {
    mapPinMain: mapPinMain,
    map: map,
    mainPinClickHandler: mainPinClickHandler
  };
})();
