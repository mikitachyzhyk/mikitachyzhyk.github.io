$(document).ready(function(){

	// Load images into Bootstrap Modal
	$('#modal-img').on('show.bs.modal', function (e) {
		$('#imagepreview').attr('src', $(e.relatedTarget).attr('href'));
	})

	/* Slick */
	$('.section-5-5-items').slick({
		arrows: true,
		prevArrow: '<a class="left carousel-control"></a>',
		nextArrow: '<a class="right carousel-control"></a>',
		infinite: true,
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

	/* Yandex Map */
	var myMap;

	// Массив со всеми ссылками
	var mapData = $('.map-link');

	// Если существует данный id
	if ( $('#contact-map').length ) {
		// Дождёмся загрузки API и готовности DOM.
		ymaps.ready(init);
		// Рабочая передача данных. Если нужно.
		// ymaps.ready(function(){
			// init(variable);
		// });
	}

	/* Скролл к карте */
	function scrollToMap() {
		/* Скролл к карте на мал. экранах */
		if (window.matchMedia("(max-width: 767px)").matches) {
			$('html, body').animate({
				scrollTop: $('#contact-map').offset().top - 55
			}, 400);
		} else {
			// Если скролл ниже карты, возвращаем на место
			if ( $('html, body').scrollTop() > $('#contact-map').offset().top ) {
				$('html, body').animate({
					scrollTop: $('#contact-map').offset().top - 15
				}, 400);
			}
		}
	}

	// Нажатие
	$(mapData).click(function(e) {
		// Переход к координатам
		myMap.panTo([$(this).data('lat'), $(this).data('long')], {flying: true})
		$(mapData).removeClass('active');
		$(this).addClass('active');
		scrollToMap();
		e.stopPropagation();
		e.preventDefault();
	});

	function init () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('contact-map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [$(mapData[0]).data('lat'), $(mapData[0]).data('long')],
					zoom: 13,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<dl class="contact-map__content">$[properties.iconContent]</dl>'
			);

			// Создаем метки на карте из массива
			for (var i = 0; i < mapData.length; i++) {
				myMap.geoObjects
				.add(new ymaps.Placemark([$(mapData[i]).data('lat'), $(mapData[i]).data('long')], {
							// hintContent: 'Собственный значок метки с контентом',
							// balloonContent: 'А эта — новогодняя',
							iconContent: '<dt>Адрес</dt><dd>' + $(mapData[i]).find('dd').text() + '</dd>'
					}, {
							// Опции.
							// Необходимо указать данный тип макета.
							iconLayout: 'default#imageWithContent',
							// Своё изображение иконки метки.
							iconImageHref: '../img/contacts/placemark.png',
							// Размеры метки.
							iconImageSize: [42, 42],
							// Смещение левого верхнего угла иконки относительно
							// её "ножки" (точки привязки).
							iconImageOffset: [-21, -42],
							// Смещение слоя с содержимым относительно слоя с картинкой.
							iconContentOffset: [-125, 70],
							// Макет содержимого.
							iconContentLayout: MyIconContentLayout
					})
				);
			}

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	/* Yandex Map */

	// StickyFooter
	function StickyFooter() {
		var footerHeight = $('.footer').outerHeight();
		$('.wrapper').css('paddingBottom', footerHeight);
	}

	// Fixed Menu
	$(window).scroll(function(e) {
		var scrollPos = $(document).scrollTop(),
				headerHeight = $('.header').innerHeight() - $('.header__nav').innerHeight(),
				navHeight = $('.header__nav').height();
		// console.log(scrollPos);
		// console.log(headerHeight);
		// console.log(navHeight);
		// Collapse navbar
		if ( !$('.header__nav .navbar-toggle').hasClass('collapsed') ) {
			$('.header__nav .navbar-toggle').click();
		}
		if ( scrollPos >= headerHeight ) {
			$('.header__nav').addClass('header__nav--fixed-xs');
			$('.header').css('paddingBottom', navHeight);
		} else {
			$('.header__nav').removeClass('header__nav--fixed-xs');
			$('.header').css('paddingBottom', '');
		}
	});

	// magnificPopup
	$('.photogallery').magnificPopup({
		delegate: 'a', // child items selector, by clicking on it popup will open
		type: 'image',
		// Lazy-loading option preloads nearby items. It accepts an array with two integers.
		// The first is the number of items to preload before the current.
		// The second is the number of images to preload after the current.
		preload: [1,2],
		gallery: {
			enabled:true
		},
		image: {
			titleSrc: function(item) {
				// Load captions from inner <p> tag
				return item.el.find('p').text();
			}
		},
	});
	// Touch swipe magnificPopup
	(function() {
		var magnificPopup = $.magnificPopup.instance;
		$(".photogallery a").click(function(e) {
			setTimeout(function() {
					$(".mfp-container").swipe( {
						swipeLeft:function(event, direction, distance, duration, fingerCount) {
							// console.log("swipe right");
							magnificPopup.next();
						},
						swipeRight:function(event, direction, distance, duration, fingerCount) {
							// console.log("swipe left");
							magnificPopup.prev();
						},
					});
			}, 500);
		});
	}).call(this);

	// Click on play button
	$('.video__btn').click(function(event) {
		$('.video-block').removeClass('video-block--with-overlay');
		if ( $("#video").prop("tagName") == 'IFRAME' ) {
			$("#video").attr('src', $("#video").attr('src') + '?autoplay=1');
		} else {
			$('#video').get(0).play();
		}
	});

	// Swipe for Bootstrap carousel
	$("#carousel-main").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll: "vertical",
		threshold: 0,
	});

	// On resize
	$(window).resize(function(){
		StickyFooter();
	});

	// On start
	StickyFooter();

	// Update sticky footer when open Bootstrap collapsable menus
	$('#sidebar-collapse, #navbar-collapse').on('shown.bs.collapse', function () {
		StickyFooter();
	})

});