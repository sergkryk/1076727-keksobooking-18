'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var imagesChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var imagesPreview = document.querySelector('.ad-form__photo');

  // avatarChooser.addEventListener('change', function () {
  //   var file = avatarChooser.files[0];

  //   if (file) {
  //     var fileName = file.name.toLowerCase();
  //     var matches = FILE_TYPES.some(function (it) {
  //       return fileName.endsWith(it);
  //     });
  //     if (matches) {
  //       var reader = new FileReader();

  //       reader.addEventListener('load', function () {
  //         avatarPreview.src = reader.result;
  //       });
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // });

  // imagesChooser.addEventListener('change', function () {
  //   var file = imagesChooser.files[0];

  //   if (file) {
  //     var fileName = file.name.toLowerCase();
  //     var matches = FILE_TYPES.some(function (it) {
  //       return fileName.endsWith(it);
  //     });
  //     if (matches) {
  //       var reader = new FileReader();

  //       reader.addEventListener('load', function () {
  //         imagesPreview.style.backgroundImage = 'url(' + reader.result + ')';
  //       });
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // });

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
    uploadImage(imagesChooser, changeBackground);
  });

  var changeBackground = function (data) {
    imagesPreview.style.backgroundImage = 'url(' + data + ')';
  };

  var changeAvatarSrc = function (data) {
    avatarPreview.src = data;
  };
})();
