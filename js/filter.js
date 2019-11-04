'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingOptions = mapFilters.querySelectorAll('input');
  var maxPinNumber = 5;

  var checkRoomPrice = function (element) {
    var value;
    if (element.offer.price < 10000) {
      value = 'low';
    } else if (element.offer.price >= 10000 && element.offer.price <= 50000) {
      value = 'middle';
    } else if (element.offer.price > 50000) {
      value = 'high';
    }
    return value;
  };

  var compareOption = function (obj, option) {
    var status = false;
    obj.offer.features.forEach(function (it) {
      switch (it) {
        case option.value:
          status = true;
          break;
      }
    });
    return status;
  };

  var getOption = function (obj, option) {
    return !option.checked ? true : compareOption(obj, option);
  };

  var getHousingPrice = function (obj) {
    return housingPrice.value === 'any' ? true : housingPrice.value === checkRoomPrice(obj);
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
        getOption(el, housingOptions[0]) &&
        getOption(el, housingOptions[1]) &&
        getOption(el, housingOptions[2]) &&
        getOption(el, housingOptions[3]) &&
        getOption(el, housingOptions[4]) &&
        getOption(el, housingOptions[5]);
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
