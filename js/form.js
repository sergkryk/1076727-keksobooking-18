'use strict';
(function () {
  var PIN_RADIUS = 32.5;
  var PIN_HEIGTH = 80;
  var mapFilters = document.querySelector('.map__filters');
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
  var resetFormButton = document.querySelector('.ad-form__reset');

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

  var disableForm = function (form) {
    form.classList.add('site-form--disabled');
    var elements = form.elements;
    for (var i = 0; i < elements.length; ++i) {
      elements[i].disabled = true;
    }
  };

  var enableForm = function (form) {
    form.classList.remove('site-form--disabled');
    var elements = form.elements;
    for (var i = 0; i < elements.length; ++i) {
      elements[i].disabled = false;
    }
  };

  var resetForm = function () {
    yourAdForm.reset();
    window.upload.clearUploads();
  };

  var activateForm = function () {
    enableForm(yourAdForm);
    enableForm(mapFilters);
    addressInput.value = getPinCoordinates(window.pin.mainPin);
    addressInput.readOnly = true;
  };

  var deactivateForm = function () {
    disableForm(yourAdForm);
    disableForm(mapFilters);
  };

  var getPinCoordinates = function (pin) {
    return Math.floor((pin.getBoundingClientRect().left - window.map.map.getBoundingClientRect().left) + PIN_RADIUS) + ',' + Math.floor((pin.getBoundingClientRect().top - window.map.map.getBoundingClientRect().top) + PIN_HEIGTH);
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

  var formSubmitSuccessHandler = function () {
    window.map.resetPage();
    window.message.showMessage();
  };

  var formSubmitErrorHandler = function (data) {
    window.map.resetPage();
    window.message.showErrorMessage(data);
  };

  calculateGuestsNumber(roomNumber.value);

  changeMinPrice();

  deactivateForm();

  addressInput.value = getPinCoordinates(window.pin.mainPin);

  roomType.addEventListener('change', changeMinPrice);

  roomNumber.addEventListener('change', function (evt) {
    calculateGuestsNumber(evt.target.value);
  });

  checkInTime.addEventListener('change', function () {
    checkOutTime.value = checkInTime.value;
  });

  checkOutTime.addEventListener('change', function () {
    checkInTime.value = checkOutTime.value;
  });

  yourAdForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(yourAdForm), formSubmitSuccessHandler, formSubmitErrorHandler);
    evt.preventDefault();
  });

  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  window.form = {
    yourAdForm: yourAdForm,
    addressInput: addressInput,
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    getPinCoordinates: getPinCoordinates,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_RADIUS: PIN_RADIUS,
    resetForm: resetForm
  };
})();
