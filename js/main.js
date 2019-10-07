'use strict';
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var PIN_RADIUS = 32.5;
var PIN_HEIGTH = 87;
var advertsCount = 8;
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var pinList = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var pinCard = document.querySelector('#card').content.querySelector('.map__card');
var cardPhoto = document.querySelector('#card').content.querySelector('.popup__photo');
var yourAdForm = document.querySelector('.ad-form');
var yourAdFormFields = yourAdForm.querySelectorAll('fieldset');
var addressInput = document.querySelector('#address');
// для подсчёта количества гостей
var roomCapacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var capacityList = roomCapacity.querySelectorAll('option');
var roomTypeList = document.querySelector('#type').querySelectorAll('option');
// для установления минимальной цены в зависимости от типа аппартаментов
var roomType = document.querySelector('#type');
var roomPrice = document.querySelector('#price');
// для синхронизации времени въезда и выезда
var checkOutList = document.querySelector('#timeout').querySelectorAll('option');
var checkOutTime = document.querySelector('#timeout');
var checkInTime = document.querySelector('#timein');
var checkInList = document.querySelector('#timein').querySelectorAll('option');

var PlaceType = {
  palace: 'Особняк',
  flat: 'Квартира',
  house: 'Частный дом',
  bungalo: 'Бунгало'
};

var roomOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

var appartmentTypePrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

// генерация случайного числа
var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// моковые данные
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

// генерирование массива данных для карточек и пинов из моковых данных
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

// удаление карточки после нажатия кнопки ESC
var onEscButtonPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    map.removeChild(pinCard);
    document.removeEventListener('keydown', onEscButtonPress);
  }
};

//  отрисовка и удаление карточки при клике
var renderCard = function (array) {
  // добавляю карточку на страницу
  pinCard.innerHTML = generatePinCard(array).innerHTML;
  map.appendChild(pinCard);
  // удаляю карточку при клике
  pinCard.querySelector('.popup__close').addEventListener('click', function () {
    map.removeChild(pinCard);
    document.removeEventListener('keydown', onEscButtonPress);
  });
  // удаляю карточку при нажатии ESC
  document.addEventListener('keydown', onEscButtonPress);
};

// генерирование пинов для городской карты
var generatePins = function (array) {
  var element = mapPin.cloneNode(true);
  element.tabIndex = 0;
  element.style.left = (array.location.x - 25) + 'px';
  element.style.top = (array.location.y - 70) + 'px';
  element.querySelector('img').src = array.author.avatar;
  element.querySelector('img').alt = array.offer.title;
  element.addEventListener('click', function () {
    renderCard(array);
  });
  element.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      renderCard(array);
    }
  });
  fragment.appendChild(element);
};

// генерирование содержимого карточки из массива
var generatePinCard = function (card) {
  var element = pinCard.cloneNode(true);
  element.querySelector('.popup__title').textContent = card.offer.title;
  element.querySelector('.popup__text--address').textContent = card.offer.address;
  element.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  element.querySelector('.popup__type').textContent = PlaceType[card.offer.type];
  element.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  element.querySelector('.popup__features').innerHTML = '';
  card.offer.features.forEach(function (it) {
    var featureElement = document.createElement('li');
    featureElement.className = 'popup__feature popup__feature--' + it;
    element.querySelector('.popup__features').appendChild(featureElement);
  });
  element.querySelector('.popup__description').textContent = card.offer.description;
  element.querySelector('.popup__photos').innerHTML = '';
  card.offer.photos.forEach(function (it) {
    var el = cardPhoto.cloneNode(true);
    el.src = it;
    element.querySelector('.popup__photos').appendChild(el);
  });

  element.querySelector('.popup__avatar').src = card.author.avatar;
  return element;
};

var mockArray = generateContent(MOCK);

// отключение полей ввода в массиве
var disableFieldset = function (fieldset) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = true;
  }
};

// включение полей ввода в массиве
var enableFieldset = function (fieldset) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
};

// удаление класса у элемента
var removeClass = function (element, classname) {
  element.classList.remove(classname);
};

// получение координат пина
var getPinCoordinates = function (pin) {
  return Math.floor(pin.getBoundingClientRect().left + PIN_RADIUS) + ',' + Math.floor(pin.getBoundingClientRect().top + PIN_HEIGTH);
};

// расчёт количества гостей под количество комнат
var calculateGuestsNumber = function (value) {
  capacityList.forEach(function (option) {
    option.disabled = true;
  });
  roomOptions[value].forEach(function (it) {
    capacityList.forEach(function (opt) {
      if (Number(opt.value) === it) {
        opt.disabled = false;
        opt.selected = true;
      }
    });
  });
};

// изменение минимальной цены в зависимости от типа аппартаментов
var changeMinPrice = function () {
  roomTypeList.forEach(function (it) {
    if (it.value === document.querySelector('#type').value) {
      roomPrice.min = appartmentTypePrice[it.value];
      roomPrice.value = appartmentTypePrice[it.value];
    }
  });
};

// синхронизация времени въезда и выезда
var checkingTimeSync = function (target, source) {
  target.forEach(function (it) {
    if (it.value === source.value) {
      it.selected = true;
    }
  });
};

// дейстиве при нажатии на главный пин на карте

var mainPinClickHandler = function () {
  removeClass(map, 'map--faded');
  removeClass(yourAdForm, 'ad-form--disabled');
  enableFieldset(yourAdFormFields);
  pinList.appendChild(fragment);
  addressInput.value = getPinCoordinates(mapPinMain);
  addressInput.readOnly = true;
};

for (var i = 0; i < mockArray.length; i++) {
  generatePins(mockArray[i]);
}

disableFieldset(yourAdFormFields);
addressInput.value = getPinCoordinates(mapPinMain);

mapPinMain.addEventListener('mousedown', mainPinClickHandler);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mainPinClickHandler();
  }
});

calculateGuestsNumber(roomNumber.value);

changeMinPrice();

roomNumber.addEventListener('change', function (evt) {
  calculateGuestsNumber(evt.target.value);
});

roomType.addEventListener('change', changeMinPrice);

checkInTime.addEventListener('change', function () {
  checkingTimeSync(checkOutList, checkInTime);
});

checkOutTime.addEventListener('change', function () {
  checkingTimeSync(checkInList, checkOutTime);
});
