'use strict';
var advertsCount = 8;
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var pinCard = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = map.querySelector('.map__filters-container');

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
        avatar: array.author.avatar[randomNumber(0, array.author.avatar.length - 1)]
      },
      offer: {
        title: array.offer.title[randomNumber(0, array.offer.title.length - 1)],
        address: randomNumber(array.offer.address.min, array.offer.address.max) + ', ' + randomNumber(array.offer.address.min, array.offer.address.max),
        price: randomNumber(array.offer.price.min, array.offer.price.max),
        type: array.offer.type[randomNumber(0, array.offer.type.length - 1)],
        rooms: randomNumber(array.offer.rooms.min, array.offer.rooms.max),
        guests: randomNumber(array.offer.guests.min, array.offer.guests.max),
        checkin: array.offer.checkin[randomNumber(0, array.offer.checkin.length - 1)],
        checkout: array.offer.checkout[randomNumber(0, array.offer.checkout.length - 1)],
        features: array.offer.features[randomNumber(0, array.offer.features.length - 1)],
        description: array.offer.description[randomNumber(0, array.offer.description.length - 1)],
        photos: array.offer.photos[randomNumber(0, array.offer.photos.length - 1)]
      },
      location: {
        x: randomNumber(array.location.x.min, array.location.x.max),
        y: randomNumber(array.location.y.min, array.location.y.max)
      }
    };
  }
  return arr;
};

var generatePins = function (array) {
  var element = mapPin.cloneNode(true);
  element.style.left = (array.location.x - 25) + 'px';
  element.style.top = (array.location.y - 70) + 'px';
  element.querySelector('img').src = array.author.avatar;
  element.querySelector('img').alt = array.offer.title;
  fragment.appendChild(element);
};

var generateCards = function (card) {
  var element = pinCard.cloneNode(true);
  element.querySelector('.popup__title').textContent = card.offer.title;
  element.querySelector('.popup__text--address').textContent = card.offer.address;
  element.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  element.querySelector('.popup__type').textContent = card.offer.type;
  element.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card
  element.querySelector('.popup__features').textContent = card.offer.features;
  element.querySelector('.popup__description').textContent = card.offer.description;
  element.querySelector('.popup__photo').src = card.offer.photos;
  element.querySelector('.popup__avatar').src = card.author.avatar;
  return element;
};

var mockArray = generateContent(MOCK);
for (var i = 0; i < mockArray.length; i++) {
  generatePins(mockArray[i]);
}
filtersContainer.insertAdjacentElement('beforebegin', generateCards(mockArray[0]));
map.classList.remove('map--faded');
pinList.appendChild(fragment);
