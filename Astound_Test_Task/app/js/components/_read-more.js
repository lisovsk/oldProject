var App = App || {};
App.readMore = (function () {
	var buttonDropDown = document.querySelector(".js-product-info__drop-down"),
		text = document.querySelector(".js-product-info__description-items");

	function _toggle() {
		if ( App.libs.getStyle(text).height === "0px") {
			text.classList.add("product-info__description-items_helper")
		} else {
			text.classList.remove("product-info__description-items_helper")
		}
	}
	function _init() {
		App.utils.addListener(buttonDropDown, 'click', _toggle);
	}
	return {
		init: _init
	}
})();
App.readMore.init();
