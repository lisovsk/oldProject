$(function () {
	var App = App || {};
	App.gallery = (function () {
			var gallery = $('.js-gallery'),
				quantityRow = $('.js-gallery__quantity-row'),
				rowHeightPercent,
				heightPhoto,
				widthPhoto,
				columnQuantity = 4;
				photoType = '',
				wrButtons = $('.js-gallery__wr-buttons');
				typePhotos = '',
				quantityMinRows = quantityRow.data().min;
		function _changeQuantityRow () {
			var	row = $('.js-row');
			var quantityRows = quantityRow.val() || quantityMinRows;
			rowHeightPercent = 100 / quantityRows + '%';
			row.css('height', rowHeightPercent);
			_startScreen();
		}
		function _startScreen() {
			gallery.empty();
			//fill 2 screens
			_addElem();
			_addElem();
		}
		function changeTypePhoto() {
			if(typePhotos !== $(this).data().type) {
				typePhotos = $(this).data().type;
				console.log(typePhotos);
				_startScreen();
			}
		} 
		function _addElemScroll () {
			var galleryScroll = gallery.scrollTop(),
				galleryHeight = gallery.height(),
				row = $('.js-row'),
				rowLen = row.length,
				rowHeight = row.height();
				galleryHeightWithScroll = parseInt(rowLen * rowHeight);
			if(galleryScroll + galleryHeight >= galleryHeightWithScroll) {
				_addElem ();
			}
		}
		// function __cachePhoto() {
		// 	var quantityRows = quantityRow.val() || quantityMinRows,
		// 		quantityElems = quantityRows * columnQuantity,
		// 		imgCahe = [],
		// 		img,
		// 		galleryHeight = gallery.height(),
		// 		heightPhoto = parseInt( galleryHeight / quantityRows ),
		// 		widthPhoto = parseInt( gallery.width() / columnQuantity );
		// 	for (var i = 0; i < quantityElems; i++) {
		// 		img = document.createElement('img');
		// 		img.src = 'http://lorempixel.com/'+(widthPhoto)+'/'+(heightPhoto+i)+'/'+ typePhotos;
		// 		imgCahe.push(img);
		// 	}
		// 	console.log(imgCahe);
		// }
		// __cachePhoto();
		function _addElem () {
			var quantityRows = quantityRow.val() || quantityMinRows,
			galleryHeight = gallery.height(),
			heightPhoto = parseInt( galleryHeight / quantityRows );
			widthPhoto = parseInt( gallery.width() / columnQuantity );

			for (var i = 0; i < quantityRows; i++) {
				gallery.append('<div class="grid__row js-row" style="height: '+ rowHeightPercent + '"></div>');
				for (var j = 0; j < columnQuantity; j++) (function (j) {
					var currentRow = gallery.find('.grid__row:last');
					currentRow.append('<div class="grid__col-2_5"><div class="gallery__item"><i class="fa fa-spinner fa-spin gallery__spinner" aria-hidden="true"></i></div></div>');

					var img = document.createElement('img');
					img.src = 'http://lorempixel.com/'+(widthPhoto+j)+'/'+(heightPhoto+i)+'/'+ typePhotos;
					// console.log(img);
					img.onload = function() {
					  currentRow.find('.grid__col-2_5').eq(j).find('.gallery__item').replaceWith(img);
					}

				})(j)
			}
		}
		function _init () {
			quantityRow.on('change', _changeQuantityRow);
			gallery.on('scroll', _addElemScroll);
			wrButtons.on('click','.js-gallery__button', changeTypePhoto);
			_startScreen();
		}
		return {
			init: _init
		}
	})();
	App.gallery.init();
});