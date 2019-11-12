'use strict';
(function () {
  var mapLeftSide = 0 - window.form.PIN_RADIUS;
  var mapTopShift = 80;
  var filtersContainerHeight = document.querySelector('.map__filters-container').getBoundingClientRect().height;
  var bottomBorder = (window.map.map.getBoundingClientRect().bottom - filtersContainerHeight) - window.form.PIN_HEIGTH;
  var sideBorder = window.map.map.getBoundingClientRect().width - window.form.PIN_RADIUS;

  window.pin.mainPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
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

      var positionY = window.pin.mainPin.offsetTop - shift.y;
      var positionX = window.pin.mainPin.offsetLeft - shift.x;

      positionY = positionY < mapTopShift ? mapTopShift : positionY;
      positionY = positionY > bottomBorder ? bottomBorder : positionY;

      positionX = positionX < mapLeftSide ? mapLeftSide : positionX;
      positionX = positionX > sideBorder ? sideBorder : positionX;

      window.pin.mainPin.style.top = positionY + 'px';
      window.pin.mainPin.style.left = positionX + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.form.addressInput.value = window.form.getPinCoordinates(window.pin.mainPin);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var mouseClickHandler = function (evt) {
          evt.preventDefault();
          window.pin.mainPin.removeEventListener('click', mouseClickHandler);
        };
        window.pin.mainPin.addEventListener('click', mouseClickHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
