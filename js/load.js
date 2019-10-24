'use strict';
(function () {
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  var onErrorHandler = function (message) {
    var error = errorMessage.cloneNode(true);
    error.querySelector('p').textContent = message;
    document.querySelector('.map').appendChild(error);
  };

  window.load = {
    load: load,
    onErrorHandler: onErrorHandler
  };
})();
