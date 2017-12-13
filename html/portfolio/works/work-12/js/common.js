$(function() {

	// Load images into Bootstrap Modal
	$('#modal-img').on('show.bs.modal', function (e) {
		$('#imagepreview').attr('src', '');
		$('#imagepreview').attr('src', $(e.relatedTarget).attr('href'));
	})

	/* Yandex Map */
	var myMap;

	// Дождёмся загрузки API и готовности DOM.
	if ( $('#map').length ) {
		ymaps.ready(init);
	}

	/* Карта для страницы контактов */
	function init () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [60.046894, 30.359579],
					zoom: 13,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
			// Отключение драга
			myMap.behaviors.disable('drag');
	}

	/* Yandex Map */

	/* Slick */
	$('.section-6-carousel').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
	});

	/* Slick */
	$('.section-5-items').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	/* Carousel section 4*/
	$('.section-4-carousel').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 2,
		slidesToScroll: 2,
		// swipe: false,
		responsive: [
			{
				breakpoint: 570,
				settings: {
					// dots: true,
					// arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					// swipe: true,
				}
			},
		]
	});

	// equalheight
	equalheight = function(container){
		var currentTallest = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0;
		$(container).each(function() {
			$el = $(this);
			$($el).height('auto')
			topPostion = $el.position().top;

			if (currentRowStart != topPostion) {
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			} else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
	}

	// equalizeHeight
	function equalizeHeight() {
		if (window.matchMedia("(min-width: 768px)").matches) {
			equalheight('.section-2-item__top');
			equalheight('.section-2-item__text');
		} else {
			$('.section-2-item__top').css('height', '');
			$('.section-2-item__text').css('height', '');
		}
	}

	// StickyFooter
	function StickyFooter() {
		var footerHeight = $('.footer').outerHeight();
		$('.wrapper').css('paddingBottom', footerHeight);
	}
	// On resize
	$(window).resize(function(){
		StickyFooter();
		equalizeHeight();
	});

	// On start
	// Нормально срабатывает в ие11, но не совсем красиво работает в хроме
	StickyFooter();
	equalizeHeight();
	// When page is fully loaded
	// Работает в хроме, но не пашет в ие11
	// Решения лучше пока не нашел
	$(window).bind("load", function() {
		StickyFooter();
		equalizeHeight();
	});

});