var App = App || {};
App.carousel = (function () {

  var carousel = document.querySelector('.js-carousel'),
      list = carousel.querySelector('.js-carousel__elems'),
      listElems = carousel.querySelectorAll('.js-carousel__elem'),
      prevButton = carousel.querySelector('.js-carousel__arrow_prev'),
      nextButton = carousel.querySelector('.js-carousel__arrow_next'),
      position = 0, //the current shift to the left
      width = listElems[0].clientWidth; // image width

  function _leftShift() {
      position = Math.min(position + width, 0)
      list.style.marginLeft = position + 'px';
  };
  function _rightShift() {
      position = Math.max(position - width, -width * (listElems.length - 1));
      list.style.marginLeft = position + 'px';
  };
  function _resize() {
    width = listElems[0].clientWidth;
    if (App.libs.scrollWidth() > 480) { //for correctly view when changing the width
      position = 0;
      list.style.marginLeft = position; 
    }
  }
  function _init() {
    App.utils.addListener(prevButton, 'click', _leftShift);
    App.utils.addListener(nextButton, 'click', _rightShift);
    App.utils.addListener(window, 'resize', _resize);
  }
  return {  
    init: _init
  }
})();
App.carousel.init();