'use strict';
(function () {
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

  var removeElement = function (className) {
    if (document.querySelector(className)) {
      document.querySelector(className).remove();
    }
  };

  var removeListenersOnSuccess = function () {
    document.removeEventListener('click', removeMessage);
    document.removeEventListener('keydown', escapePressHandler);
  };

  var removeListenersOnError = function () {
    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', errorEscapePressHandler);
  };

  var removeMessage = function () {
    removeElement('.success');
    removeListenersOnSuccess();
  };

  var removeErrorMessage = function () {
    removeElement('.error');
    removeListenersOnError();
  };

  var escapePressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeElement('.success');
      removeListenersOnSuccess();
    }
  };

  var errorEscapePressHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeElement('.error');
      removeListenersOnError();
    }
  };

  var showMessage = function () {
    window.map.map.appendChild(successMessage);
    document.addEventListener('click', removeMessage);
    document.addEventListener('keydown', escapePressHandler);
  };

  var showErrorMessage = function (data) {
    window.map.map.appendChild(errorMessage);
    errorMessage.querySelector('p').textContent = data;
    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', errorEscapePressHandler);
  };

  window.message = {
    showMessage: showMessage,
    showErrorMessage: showErrorMessage,
  };
})();
