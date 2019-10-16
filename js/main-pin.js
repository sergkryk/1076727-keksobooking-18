'use strict';
(function () {
  var mapLeftSide = 0;
  var mapTopShift = 80;
  var filtersContainerHeight = document.querySelector('.map__filters-container').getBoundingClientRect().height;

  window.map.mapPinMain.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
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

      if (window.map.mapPinMain.offsetTop - shift.y <= mapTopShift) {
        window.map.mapPinMain.style.top = mapTopShift + 'px';
      } else if (window.map.mapPinMain.offsetTop - shift.y >= (window.map.map.getBoundingClientRect().bottom - filtersContainerHeight) - window.form.PIN_HEIGTH) {
        window.map.mapPinMain.style.top = ((window.map.map.getBoundingClientRect().bottom - filtersContainerHeight) - window.form.PIN_HEIGTH) + 'px';
      } else {
        window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (window.map.mapPinMain.offsetLeft - shift.x <= mapLeftSide) {
        window.map.mapPinMain.style.left = mapLeftSide + 'px';
      } else if (window.map.mapPinMain.offsetLeft - shift.x >= (window.map.map.getBoundingClientRect().width - window.form.PIN_RADIUS * 2)) {
        window.map.mapPinMain.style.left = (window.map.map.getBoundingClientRect().width - window.form.PIN_RADIUS * 2) + 'px';
      } else {
        window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';
      }
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
