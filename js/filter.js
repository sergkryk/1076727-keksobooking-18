'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingOptions = mapFilters.querySelectorAll('input');
  var maxPinNumber = 5;

  var getHousingPrice = function (element) {
    switch (housingPrice.value) {
      case 'low': return element.offer.price < 10000;
      case 'middle': return element.offer.price >= 10000 && element.offer.price <= 50000;
      case 'high': return element.offer.price > 50000;
      default: return true;
    }
  };


  var getOptions = function (obj) {
    return Array.from(housingOptions).filter(function (element) {
      return element.checked;
    }).map(function (element) {
      return element.value;
    }).every(function (feature) {
      return obj.offer.features.includes(feature);
    });
  };

  var getHousingType = function (obj) {
    return housingType.value === 'any' ? true : housingType.value === obj.offer.type;
  };

  var getHousingRooms = function (obj) {
    return housingRooms.value === 'any' ? true : Number(housingRooms.value) === obj.offer.rooms;
  };

  var getGuestsNumber = function (obj) {
    return housingGuests.value === 'any' ? true : Number(housingGuests.value) === obj.offer.guests;
  };

  var getAllFilter = function (data) {
    return data.filter(function (el) {
      return getHousingType(el) &&
        getHousingRooms(el) &&
        getGuestsNumber(el) &&
        getHousingPrice(el) &&
        getOptions(el);
    }).slice(0, maxPinNumber);
  };

  var filterChangeHandler = function () {
    window.setTimeout(function () {
      window.pin.removePins();
      window.pin.renderPins(getAllFilter(window.data));
    }, 500);
  };

  mapFilters.addEventListener('change', filterChangeHandler);

  window.filter = {
    getAllFilter: getAllFilter,
  };

})();
