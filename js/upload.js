'use strict';
(function () {
  var upload = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var resetPage = function () {
    window.form.yourAdForm.reset();
    window.pin.removePins();
    window.card.removeCard();
    window.map.placeDefault();
    window.map.deactivatePage();
    window.map.deactivateForm();
    window.map.mapPinMain.addEventListener('mousedown', window.map.mainPinClickHandler);
  };

  var onSubmitSuccessHandler = function () {
    resetPage();
    window.message.showMessage();
  };

  var onSubmitErrorHandler = function (data) {
    resetPage();
    window.message.showErrorMessage(data);
  };

  window.form.yourAdForm.addEventListener('submit', function (evt) {
    upload(new FormData(window.form.yourAdForm), onSubmitSuccessHandler, onSubmitErrorHandler);
    evt.preventDefault();
  });
})();
