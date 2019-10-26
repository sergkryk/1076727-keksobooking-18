'use strict';
(function () {
  var pinCard = document.querySelector('#card').content.querySelector('.map__card');
  var cardPhoto = document.querySelector('#card').content.querySelector('.popup__photo');
  var PlaceType = {
    palace: 'Особняк',
    flat: 'Квартира',
    house: 'Частный дом',
    bungalo: 'Бунгало'
  };

  var onEscButtonPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      window.map.map.removeChild(document.querySelector('.map__card'));
      document.removeEventListener('keydown', onEscButtonPress);
    }
  };

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
    element.querySelector('.popup__close').addEventListener('click', function () {
      element.remove();
    });
    document.addEventListener('keydown', onEscButtonPress);
    return element;
  };

  var removeCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  };

  var renderCard = function (array) {
    removeCard();
    window.map.map.appendChild(generatePinCard(array));
  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };

})();
