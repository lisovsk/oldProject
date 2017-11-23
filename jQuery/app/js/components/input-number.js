$(function () {
  var App = App || {};
  App.inputNumber = (function () {

    var quantityRow = $('.js-gallery__quantity-row'),
        min = $('.js-gallery__quantity-row').data().min,
        max = $('.js-gallery__quantity-row').data().max;
    function _enterOnlyNum() {
      var self = this;
      if (self.value.match(/[^0-9]/g)) {
          self.value = self.value.replace(/[^0-9]/g, '');
      }
    }
    function _minMaxVal() {
      var self = this;
      if (self.value < min) {
        self.value = min;
      } else if (self.value > max) {
        self.value = max;
      }
    }
    function _incrementDecrement () {
      var input = $(this);
      var quantityRowVal = parseInt( quantityRow.val() );
      console.log(quantityRowVal);
        if( input.data().increment === true && quantityRowVal < max) {
          quantityRow.val( quantityRowVal + 1 );
          quantityRow.change();
        } else if(input.data().decrement === true && quantityRowVal > min) {
          quantityRow.val( quantityRowVal - 1 );
          quantityRow.change();
        }
    }

    function _init () {
      $(".js-input-number").on('click', '.js-input-number__increment, .js-input-number__decrement', _incrementDecrement);
      quantityRow.on("change keyup input", _enterOnlyNum);
      quantityRow.on("change", _minMaxVal);
    }
    return {
      init: _init
    }
  })();
  App.inputNumber.init();
})