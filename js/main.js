'use strict';
var ENTER_KEYCODE = 13;
var PIN_RADIUS = 32.5;
var PIN_HEIGTH = 87;
var advertsCount = 8;
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
// var pinList = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
// var pinCard = document.querySelector('#card').content.querySelector('.map__card');
// var filtersContainer = map.querySelector('.map__filters-container');
// var cardPhoto = document.querySelector('#card').content.querySelector('.popup__photo');
var yourAdForm = document.querySelector('.ad-form');
var yourAdFormFields = yourAdForm.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
var roomCapacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var adFormSubmitButton = document.querySelector('.ad-form__submit');

// var PlaceType = {
//   palace: 'Особняк',
//   flat: 'Квартира',
//   house: 'Частный дом',
//   bungalo: 'Бунгало'
// };

var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
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
        features: array.offer.features,
        description: array.offer.description[randomNumber(0, array.offer.description.length - 1)],
        photos: array.offer.photos
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

// var generateCards = function (card) {
//   var element = pinCard.cloneNode(true);
//   element.querySelector('.popup__title').textContent = card.offer.title;
//   element.querySelector('.popup__text--address').textContent = card.offer.address;
//   element.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
//   element.querySelector('.popup__type').textContent = PlaceType[card.offer.type];
//   element.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
//   element.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   element.querySelector('.popup__features').innerHTML = '';
//   card.offer.features.forEach(function (it) {
//     var featureElement = document.createElement('li');
//     featureElement.className = 'popup__feature popup__feature--' + it;
//     element.querySelector('.popup__features').appendChild(featureElement);
//   });
//   element.querySelector('.popup__description').textContent = card.offer.description;
//   element.querySelector('.popup__photos').innerHTML = '';
//   card.offer.photos.forEach(function (it) {
//     var el = cardPhoto.cloneNode(true);
//     el.src = it;
//     element.querySelector('.popup__photos').appendChild(el);
//   });

//   element.querySelector('.popup__avatar').src = card.author.avatar;
//   return element;
// };

var mockArray = generateContent(MOCK);

var disableFieldset = function (fieldset) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = true;
  }
};

var enableFieldset = function (fieldset) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
};

var removeClass = function (element, classname) {
  element.classList.remove(classname);
};

var getPinCoordinates = function (pin) {
  return Math.floor(pin.getBoundingClientRect().left + PIN_RADIUS) + ',' + Math.floor(pin.getBoundingClientRect().top + PIN_HEIGTH);
};

var checkCapacity = function (number, capacity) {
  if (number.value < capacity.value) {
    number.setCustomValidity('Количество комнат должно совпадать с количеством гостей');
    number.checkValidity();
  } else {
    number.setCustomValidity('');
  }
};

for (var i = 0; i < mockArray.length; i++) {
  generatePins(mockArray[i]);
}

disableFieldset(yourAdFormFields);
// addressInput.value = Math.round((mapPinMain.getBoundingClientRect().left + PIN_RADIUS)) + ',' + Math.floor((mapPinMain.getBoundingClientRect().top + PIN_RADIUS));
addressInput.value = getPinCoordinates(mapPinMain);

mapPinMain.addEventListener('mousedown', function () {
  removeClass(map, 'map--faded');
  removeClass(yourAdForm, 'ad-form--disabled');
  enableFieldset(yourAdFormFields);
  addressInput.value = getPinCoordinates(mapPinMain);
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    removeClass(map, 'map--faded');
    removeClass(yourAdForm, 'ad-form--disabled');
    enableFieldset(yourAdFormFields);
    addressInput.value = getPinCoordinates(mapPinMain);
  }
});

adFormSubmitButton.addEventListener('click', function () {
  checkCapacity(roomNumber, roomCapacity);
});
