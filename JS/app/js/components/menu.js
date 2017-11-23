var App = App || {};

App.menu = (function () {
	//for mob
	var nav = document.querySelector(".js-nav");
	var mobMenuButton = document.querySelector(".js-mob-menu-button");
	var shoppingBag = document.querySelector(".js-shopping-bag");
	var html = document.querySelector("html");

	function _mobMenuButtonClick () {
		if( !nav.classList.contains('is-visible-menu') ) {
			nav.classList.add('is-visible-menu');
			shoppingBag.classList.add('is-hide-bag');
			mobMenuButton.classList.add('mob-menu-button_close');
			window.scrollTo(0,0);
			html.classList.add('is-not-scroll');
		} else {
			nav.classList.remove('is-visible-menu');
			shoppingBag.classList.remove('is-hide-bag');
			mobMenuButton.classList.remove('mob-menu-button_close');
			html.classList.remove('is-not-scroll');
		}
	}

	//for responsive
		function itemsWindth(items) {
			var itemsW = 0;
			for (var i = 0; i < items.length; i++)
				itemsW += items[i].clientWidth;
			return itemsW
		} 
		var navMoreButton = document.querySelector('.js-nav-more');
		var nav = document.querySelector('.js-nav');
		var navList = document.querySelector('.js-nav-elems');
		var navListMore = document.querySelector('.js-nav-elems-more');

		function _hideShowOneMenuItemForMob () {
			var navElems = document.querySelectorAll('.js-nav-elems > .js-nav-elem');
			var navW = nav.clientWidth;
			var navElemsW = itemsWindth(navElems);
			var navItemsMore = document.querySelectorAll('.js-nav-elems-more > .js-nav-elem');
			var lestVisible = navElems.length - 2;
			if (navElemsW > navW) {
				navListMore.insertBefore(navElems[lestVisible], navListMore.firstChild);
				App.utils.changeStyle(navMoreButton, 'display', 'inline-block');
				navElems = document.querySelectorAll('.js-nav-elems > .js-nav-elem');
				navElemsW = itemsWindth(navElems);
				lestVisible--;
				_hideShowOneMenuItemForMob();
			} else {
				if( navListMore.firstChild && (navW - navElemsW >= navListMore.firstChild.clientWidth) ) { //if there is enough free space
					navList.insertBefore(navListMore.firstChild, navMoreButton);
					_hideShowOneMenuItemForMob();
				} else if (navItemsMore.length === 1 && (navW + navMoreButton.clientWidth - navElemsW >= navListMore.firstChild.clientWidth) ) {// if remains one elem
					App.utils.changeStyle(navMoreButton, 'display', 'none');
					navList.insertBefore(navListMore.firstChild, navMoreButton);
				}
			}
		}
		function _ShowMenuItemForMobDesk () {
			var navItemsMore = document.querySelectorAll('.js-nav-elems-more > .js-nav-elem');
			var navItemsMoreLen = navItemsMore.length;
			if(navItemsMoreLen > 0) {
				for (var i = 0; i < navItemsMoreLen; i++) {
					navList.insertBefore(navListMore.firstChild, navMoreButton);
				}
				App.utils.changeStyle(navMoreButton, 'display', 'none');
			}
		}

		function _responsiveMenu () {
			console.log(App.utils.scrollWidth());
			if (App.utils.scrollWidth() > 768) {
				_hideShowOneMenuItemForMob();
			} else {
				_ShowMenuItemForMobDesk ();
			}
		}
	function _init() {
	  App.utils.addListener(mobMenuButton, 'click', _mobMenuButtonClick);

	  setTimeout(function () { //setTimeout because some browser does not have time to calculate the width
	  	App.utils.addListener(window, 'resize', _responsiveMenu);
	  	_responsiveMenu ();
	  }, 0);
	}
	return {  
	  init: _init
	}
})();

App.menu.init();