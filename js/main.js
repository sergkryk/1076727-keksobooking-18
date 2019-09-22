'use strict';
var advertsCount = 8;
var map = document.querySelector('.map');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = map.querySelector('.map__pins');

var randomNumber = function (min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var generateContent = function () {
  var arr = [];
  for (var i = 0; i < advertsCount; i++) {
    arr[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'room',
        address: '600, 350',
        price: randomNumber(10, 5000),
        type: 'palace',
        rooms: randomNumber(1, 5),
        guests: randomNumber(1, 25),
        checkin: '12:00',
        checkout: '14:00',
        features: 'parking',
        description: 'awesome view on the mountains',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: randomNumber(60, 1030),
        y: randomNumber(130, 630)
      }
    };
  }
  return arr;
};

var mockArray = generateContent();

var fragment = document.createDocumentFragment();

for (var i = 0; i < advertsCount; i++) {
  var element = mapPin.cloneNode(true);
  element.style.left = (mockArray[i].location.x - 25) + 'px';
  element.style.top = (mockArray[i].location.y - 70) + 'px';
  element.querySelector('img').src = mockArray[i].author.avatar;
  element.querySelector('img').alt = mockArray[i].offer.title;
  fragment.appendChild(element);
}

map.classList.remove('map--faded');
pinList.appendChild(fragment);

