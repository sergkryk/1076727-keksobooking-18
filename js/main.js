'use strict';
var advertsCount = 8;
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var randomNumber = function (min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var MOCK = {
  author: {
    avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png']
  },
  offer: {
    title: ['Доступное жильё', 'Шикарные аппартаменты', 'Семейное гнёздышко', 'Хостел', 'Роскошная студия с видом на море'],
    address: {
      // min: randomNumber(300, 650),
      // max: randomNumber(300, 650)
    },
    // price: randomNumber(10, 5000),
    // rooms: randomNumber(1, 10),
    // guests: randomNumber(1, 20),
    type: ['palace', 'flat', 'house', 'bungalo'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: ['аппартаменты со всеми удобствами', 'все необходимое рядом', 'при раннем бронировании возможны скидки'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },
  location: {
    // x: randomNumber(60, 1030),
    // y: randomNumber(130, 630)
  }
};

var generateContent = function (array) {
  var arr = [];
  for (var i = 0; i < advertsCount; i++) {
    arr[i] = {
      author: {
        avatar: array.author.avatar[randomNumber(0, array.author.avatar.length - 1)]
      },
      offer: {
        title: array.offer.title[randomNumber(0, array.offer.title.length - 1)],
        address: {
          min: randomNumber(300, 650),
          max: randomNumber(300, 650),
        },
        price: randomNumber(10, 5000),
        type: array.offer.type[randomNumber(0, array.offer.type.length - 1)],
        rooms: randomNumber(1, 10),
        guests: randomNumber(1, 20),
        checkin: array.offer.checkin[randomNumber(0, array.offer.checkin.length - 1)],
        checkout: array.offer.checkout[randomNumber(0, array.offer.checkout.length - 1)],
        features: array.offer.features[randomNumber(0, array.offer.features.length - 1)],
        description: array.offer.description[randomNumber(0, array.offer.description.length - 1)],
        photos: array.offer.photos[randomNumber(0, array.offer.photos.length - 1)]
      },
      location: {
        x: randomNumber(60, 1030),
        y: randomNumber(130, 630)
      }
    };
  }
  return arr;
};

var generatePins = function (array) {
  var element = mapPin.cloneNode(true);
  element.style.left = (array[i].location.x - 25) + 'px';
  element.style.top = (array[i].location.y - 70) + 'px';
  element.querySelector('img').src = array[i].author.avatar;
  element.querySelector('img').alt = array[i].offer.title;
  fragment.appendChild(element);
};

var mockArray = generateContent(MOCK);

for (var i = 0; i < advertsCount; i++) {
  generatePins(mockArray);
}

map.classList.remove('map--faded');
pinList.appendChild(fragment);
