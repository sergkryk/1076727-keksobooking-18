'use strict';
(function () {
  var advertsCount = 8;

  var MOCK = {
    author: {
      avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png']
    },
    offer: {
      title: ['Доступное жильё', 'Шикарные аппартаменты', 'Семейное гнёздышко', 'Хостел', 'Роскошная студия с видом на море'],
      address: {
        min: 100,
        max: 700
      },
      price: {
        min: 1000,
        max: 20000
      },
      rooms: {
        min: 2,
        max: 4
      },
      guests: {
        min: 2,
        max: 25
      },
      type: ['palace', 'flat', 'house', 'bungalo'],
      checkin: ['12:00', '13:00', '14:00'],
      checkout: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: ['аппартаменты со всеми удобствами', 'все необходимое рядом', 'при раннем бронировании возможны скидки'],
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: {
        min: 60,
        max: 1030
      },
      y: {
        min: 130,
        max: 630
      }
    }
  };

  var generateContent = function (array) {
    var arr = [];
    for (var i = 0; i < advertsCount; i++) {
      arr[i] = {
        author: {
          avatar: array.author.avatar[window.utils.randomNumber(0, array.author.avatar.length - 1)]
        },
        offer: {
          title: array.offer.title[window.utils.randomNumber(0, array.offer.title.length - 1)],
          address: window.utils.randomNumber(array.offer.address.min, array.offer.address.max) + ', ' + window.utils.randomNumber(array.offer.address.min, array.offer.address.max),
          price: window.utils.randomNumber(array.offer.price.min, array.offer.price.max),
          type: array.offer.type[window.utils.randomNumber(0, array.offer.type.length - 1)],
          rooms: window.utils.randomNumber(array.offer.rooms.min, array.offer.rooms.max),
          guests: window.utils.randomNumber(array.offer.guests.min, array.offer.guests.max),
          checkin: array.offer.checkin[window.utils.randomNumber(0, array.offer.checkin.length - 1)],
          checkout: array.offer.checkout[window.utils.randomNumber(0, array.offer.checkout.length - 1)],
          features: array.offer.features,
          description: array.offer.description[window.utils.randomNumber(0, array.offer.description.length - 1)],
          photos: array.offer.photos
        },
        location: {
          x: window.utils.randomNumber(array.location.x.min, array.location.x.max),
          y: window.utils.randomNumber(array.location.y.min, array.location.y.max)
        }
      };
    }
    return arr;
  };

  window.data = {
    mockArray: generateContent(MOCK)
  };
})();
