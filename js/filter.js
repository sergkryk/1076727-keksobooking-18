'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var type;

  var filterByType = function (targetArray) {
    var arr = targetArray.filter(function (element) {
      return element.offer.type === type;
    }).
    slice(0, 5);
    return arr;
  };

  var changeTypeHandler = function () {
    type = housingType.value;
    if (type !== 'any') {
      var filteredPins = filterByType(window.pin.pinDataArray);
    } else {
      filteredPins = window.pin.pinDataArray;
    }
    window.pin.removePins();
    window.pin.renderPins(filteredPins);
  };

  housingType.addEventListener('change', changeTypeHandler);
})();
