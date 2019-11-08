'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_NUMBER = 7;

  var photo = document.querySelector('.ad-form__photo');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var imagesChooser = document.querySelector('#images');
  var uploadedImages = [];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');

  var changeAvatarSrc = function (data) {
    avatarPreview.src = data;
  };

  var removePhotos = function () {
    var photos = imagesContainer.querySelectorAll('.ad-form__photo');
    photos.forEach(function (it) {
      it.remove();
    });
  };

  var renderPhoto = function (source) {
    var newPhoto = photo.cloneNode(true);
    newPhoto.style.backgroundImage = 'url(' + source + ')';
    return newPhoto;
  };

  var generatePhotos = function (data) {
    uploadedImages.push(data);
    uploadedImages.slice(0, MAX_NUMBER).forEach(function (it) {
      imagesContainer.appendChild(renderPhoto(it));
    });
  };

  var showPhotos = function (data) {
    removePhotos();
    generatePhotos(data);
  };

  var uploadImage = function (input, func) {
    var file = input.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          func(reader.result);
        });
        reader.readAsDataURL(file);
      }
    }
  };

  avatarChooser.addEventListener('change', function () {
    uploadImage(avatarChooser, changeAvatarSrc);
  });

  imagesChooser.addEventListener('change', function () {
    uploadImage(imagesChooser, showPhotos);
  });
})();
