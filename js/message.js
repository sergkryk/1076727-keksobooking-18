'use strict';
(function () {
  var successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorBtn = errorMessage.querySelector('.error__button');

  var removeElement = function (className) {
    if (document.querySelector(className)) {
      document.querySelector(className).remove();
    }
  };

  var removeMessage = function () {
    removeElement('.success');
    document.removeEventListener('click', removeMessage);
    document.removeEventListener('keydown', onEscRemove);
  };

  var removeErrorMessage = function () {
    removeElement('.error');
    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', onErrorEscRemove);
    errorBtn.removeEventListener('click', removeErrorMessage);
  };

  var onEscRemove = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeElement('.success');
      document.removeEventListener('click', removeMessage);
      document.removeEventListener('keydown', onEscRemove);
    }
  };

  var onErrorEscRemove = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      removeElement('.error');
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', onErrorEscRemove);
      errorBtn.removeEventListener('click', removeErrorMessage);
    }
  };

  var showMessage = function () {
    window.map.map.appendChild(successMessage);
    document.addEventListener('click', removeMessage);
    document.addEventListener('keydown', onEscRemove);
  };

  var showErrorMessage = function (data) {
    window.map.map.appendChild(errorMessage);
    errorMessage.querySelector('p').textContent = data;
    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onErrorEscRemove);
    errorBtn.addEventListener('click', removeErrorMessage);
  };

  window.message = {
    showMessage: showMessage,
    showErrorMessage: showErrorMessage,
  };
})();
