var App = App || {};

  App.carousel = (function () {
    
    var carousel = document.querySelector('.js-carousel'),
        list = carousel.querySelector('.js-carousel__elems'),
        listElems = carousel.querySelectorAll('.js-carousel__elem'),
        prevButton = document.querySelector('.js-carousel__arrow_prev'),
        nextButton = document.querySelector('.js-carousel__arrow_next'),
        carouselW = document.querySelector('.js-width-carousel'),
        position = 0, //the current shift to the left
        widthCarousel = carouselW.clientWidth,
        width = listElems[0].clientWidth;
        carouselElemCount =  (widthCarousel -  widthCarousel % width) / width;
        carouselElemCount = carouselElemCount < listElems.length ? carouselElemCount : listElems.length;
        // carouselW.style.width = carouselElemCount * width + 'px';
        App.utils.changeStyle(carouselW, 'width', carouselElemCount * width + 'px');
    function _leftShift() {
        position = Math.min(position + width, 0)
        // list.style.marginLeft = position + 'px';
        App.utils.changeStyle(list, 'marginLeft', position + 'px');
    };
    function _rightShift() {
        position = Math.max(position - width, -width * (listElems.length - carouselElemCount));
        // list.style.marginLeft = position + 'px';
        App.utils.changeStyle(list, 'marginLeft', position + 'px');
    };
    var _resize = App.utils.debounce(function () {
        // carouselW.style.width = 'auto';
        App.utils.changeStyle(carouselW, 'width', 'auto');
        widthCarousel = carouselW.clientWidth;
        width = listElems[0].clientWidth;
        carouselElemCount =  (widthCarousel -  widthCarousel % width) / width;
        carouselElemCount = carouselElemCount < listElems.length ? carouselElemCount : listElems.length;
        // carouselW.style.width = carouselElemCount * width + 'px';
        App.utils.changeStyle(carouselW, 'width', carouselElemCount * width + 'px');

        position = 0;
        // list.style.marginLeft = position;
        App.utils.changeStyle(list, 'marginLeft', position);
    }, 50)
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
