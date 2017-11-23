var App = App || {};
App.productCard = (function () {

	function _styleForPartPrice() {
		var pricePart;
		var productCardPrice = document.querySelectorAll('.js-product-card__price');
		for(var i = 0, len = productCardPrice.length; i < len; i++) {
			pricePart = productCardPrice[i].innerHTML.split('.');
			if(pricePart.length == 2)
				productCardPrice[i].innerHTML = pricePart[0] + '.' + '<span class="product-card__price-fraction">' + pricePart[1] + '</span>';
		}
	}

	return {
		styleForPartPrice: _styleForPartPrice
	}
})();

App.productCard.styleForPartPrice();