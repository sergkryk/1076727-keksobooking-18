'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var maxPinNumber = 5;

  var getHousingType = function (obj) {
    return housingType.value === 'any' ? true : housingType.value === obj.offer.type;
  };

  var getAllFilter = function (data) {
    return data.filter(function (el) {
      return getHousingType(el);
    }).slice(0, maxPinNumber);
  };

  var filterChangeHandler = function () {
    window.pin.removePins();
    window.pin.renderPins(getAllFilter(window.data));
  };

  mapFilters.addEventListener('change', filterChangeHandler);

  window.filter = {
    getAllFilter: getAllFilter
  };

})();
