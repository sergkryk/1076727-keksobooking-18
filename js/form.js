'use strict';
(function () {
  var PIN_RADIUS = 32.5;
  var PIN_HEIGTH = 80;
  var roomType = document.querySelector('#type');
  var roomPrice = document.querySelector('#price');
  var roomTypeList = document.querySelector('#type').querySelectorAll('option');
  var roomCapacity = document.querySelector('#capacity');
  var capacityList = roomCapacity.querySelectorAll('option');
  var roomNumber = document.querySelector('#room_number');
  var checkOutTime = document.querySelector('#timeout');
  var checkInTime = document.querySelector('#timein');
  var addressInput = document.querySelector('#address');
  var yourAdForm = document.querySelector('.ad-form');
  var yourAdFormFields = yourAdForm.querySelectorAll('fieldset');
  var appartmentTypePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var roomOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };


  var getPinCoordinates = function (pin) {
    return Math.floor((pin.getBoundingClientRect().left - window.map.map.getBoundingClientRect().left) + PIN_RADIUS) + ',' + Math.floor((pin.getBoundingClientRect().top - window.map.map.getBoundingClientRect().top) + PIN_HEIGTH);
  };

  var disableFieldset = function (fieldset) {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
    }
  };

  var enableFieldset = function (fieldset) {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  };

  var changeMinPrice = function () {
    roomTypeList.forEach(function (it) {
      if (it.value === document.querySelector('#type').value) {
        roomPrice.min = appartmentTypePrice[it.value];
        roomPrice.value = appartmentTypePrice[it.value];
      }
    });
  };

  // расчёт количества гостей под количество комнат
  var calculateGuestsNumber = function (value) {
    capacityList.forEach(function (option) {
      option.disabled = true;
    });
    roomOptions[value].forEach(function (it) {
      capacityList.forEach(function (opt) {
        if (Number(opt.value) === it) {
          opt.disabled = false;
          opt.selected = true;
        }
      });
    });
  };

  roomType.addEventListener('change', changeMinPrice);

  calculateGuestsNumber(roomNumber.value);

  changeMinPrice();

  roomNumber.addEventListener('change', function (evt) {
    calculateGuestsNumber(evt.target.value);
  });

  checkInTime.addEventListener('change', function () {
    checkOutTime.value = checkInTime.value;
  });

  checkOutTime.addEventListener('change', function () {
    checkInTime.value = checkOutTime.value;
  });

  disableFieldset(yourAdFormFields);

  addressInput.value = getPinCoordinates(window.map.mapPinMain);

  window.form = {
    addressInput: addressInput,
    yourAdForm: yourAdForm,
    yourAdFormFields: yourAdFormFields,
    enableFieldset: enableFieldset,
    disableFieldset: disableFieldset,
    getPinCoordinates: getPinCoordinates,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_RADIUS: PIN_RADIUS
  };
})();
