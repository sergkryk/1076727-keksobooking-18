'use strict';
(function () {
  var mapLeftSide = 0;
  var mapTopShift = 80;
  var filtersContainerHeight = document.querySelector('.map__filters-container').getBoundingClientRect().height;
  var bottomBorder = (window.map.map.getBoundingClientRect().bottom - filtersContainerHeight) - window.form.PIN_HEIGTH;
  var sideBorder = window.map.map.getBoundingClientRect().width - window.form.PIN_RADIUS * 2;

  window.map.mapPinMain.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    window.map.mainPinClickHandler();
    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var positionY = window.map.mapPinMain.offsetTop - shift.y;
      var positionX = window.map.mapPinMain.offsetLeft - shift.x;

      positionY = positionY < mapTopShift ? mapTopShift : positionY;
      positionY = positionY > bottomBorder ? bottomBorder : positionY;

      positionX = positionX < mapLeftSide ? mapLeftSide : positionX;
      positionX = positionX > sideBorder ? sideBorder : positionX;

      window.map.mapPinMain.style.top = positionY + 'px';
      window.map.mapPinMain.style.left = positionX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.addressInput.value = window.form.getPinCoordinates(window.map.mapPinMain);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          window.map.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.map.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
