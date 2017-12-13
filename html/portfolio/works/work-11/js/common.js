$(document).ready(function(){

	// Load images into Bootstrap Modal
	$('#modal-img').on('show.bs.modal', function (e) {
		$('#imagepreview').attr('src', '');
		$('#imagepreview').attr('src', $(e.relatedTarget).attr('href'));
	})

	/* Скролл к карте на мал. экранах */
	function scrollToMap() {
		if (window.matchMedia("(max-width: 767px)").matches) {
			$('html, body').animate({
				scrollTop: $('#map').offset().top - 15
			}, 100);
		}
	}
	/* Перезагрузка карты при нажатии */
	$('#prim').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.districts-buttons__cell').removeClass('active');
		$(this).addClass('active');
		scrollToMap();
		$('#map').empty();
		myMap.destroy();
		init();
	});
	$('#petr').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.districts-buttons__cell').removeClass('active');
		$(this).addClass('active');
		scrollToMap();
		$('#map').empty();
		myMap.destroy();
		init2();
	});

	/* Yandex Map */
	var myMap;

	// Дождёмся загрузки API и готовности DOM.
	if ( $('#map').length ) {
		ymaps.ready(init);
	}
	if ( $('#contact-map').length ) {
		ymaps.ready(initCopy);
	}
	if ( $('#place-map').length ) {
		ymaps.ready(studyBranchMapInit);
	}

	function init () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [59.949255, 30.551958],
					zoom: 11,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div class="districts-map__content">$[properties.iconContent]</div>'
			),

			// Большой балун с контентом
			myPlacemarkWithContent = new ymaps.Placemark([59.949255, 30.551958], {
					// hintContent: 'Собственный значок метки с контентом',
					// balloonContent: 'А эта — новогодняя',
					iconContent: '<span>Центральный офис</span>ул. Генерала Хрулёва, д. 13'
			}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: '../img/study/balloon.png',
					// Размеры метки.
					iconImageSize: [129, 112],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-30, -112],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [-52, 140],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout
			});

			// Маленькие балуны
			myPlacemarkWithContent2 = new ymaps.Placemark([59.976748, 30.411631], {
				balloonContent: 'ул. Бобра Глебки, д. 22',
			}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent3 = new ymaps.Placemark([59.921294, 30.412317], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent4 = new ymaps.Placemark([59.872998, 30.337473], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent5 = new ymaps.Placemark([59.951960, 30.233789], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent6 = new ymaps.Placemark([59.910656, 30.898027], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});

			myMap.geoObjects
			.add(myPlacemarkWithContent)
			.add(myPlacemarkWithContent2)
			.add(myPlacemarkWithContent3)
			.add(myPlacemarkWithContent4)
			.add(myPlacemarkWithContent5)
			.add(myPlacemarkWithContent6);

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	/* Карта для страницы контактов */
	function initCopy () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('contact-map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [59.949255, 30.551958],
					zoom: 11,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div class="districts-map__content">$[properties.iconContent]</div>'
			),

			// Большой балун с контентом
			myPlacemarkWithContent = new ymaps.Placemark([59.949255, 30.551958], {
					// hintContent: 'Собственный значок метки с контентом',
					// balloonContent: 'А эта — новогодняя',
					iconContent: '<span>Центральный офис</span>ул. Генерала Хрулёва, д. 13'
			}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: '../img/study/balloon.png',
					// Размеры метки.
					iconImageSize: [129, 112],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-30, -112],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [-52, 140],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout
			});

			// Маленькие балуны
			myPlacemarkWithContent2 = new ymaps.Placemark([59.976748, 30.411631], {
				balloonContent: 'ул. Бобра Глебки, д. 22',
			}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent3 = new ymaps.Placemark([59.921294, 30.412317], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent4 = new ymaps.Placemark([59.872998, 30.337473], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent5 = new ymaps.Placemark([59.951960, 30.233789], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});
			myPlacemarkWithContent6 = new ymaps.Placemark([59.910656, 30.898027], {}, {
					iconLayout: 'default#imageWithContent',
					iconImageHref: '../img/study/balloon.png',
					iconImageSize: [64, 55],
					iconImageOffset: [-18, -55],
			});

			myMap.geoObjects
			.add(myPlacemarkWithContent)
			.add(myPlacemarkWithContent2)
			.add(myPlacemarkWithContent3)
			.add(myPlacemarkWithContent4)
			.add(myPlacemarkWithContent5)
			.add(myPlacemarkWithContent6);

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	/* Пример еще одной карты */
	function init2 () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [55.755814, 37.617635],
					zoom: 11,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	/* Места обучения филиал */
	function studyBranchMapInit () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('place-map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [47.242727, 38.892374],
					zoom: 16,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Балун с подписью
			myMap.geoObjects
			.add(new ymaps.Placemark([47.242815, 38.890561], {
				balloonContent: 'Текст при нажатии',
				iconCaption: 'Большая Бульвараня улица'
			}, {
				preset: 'islands#greenDotIconWithCaption',
				iconColor: '#4296ea'
			}));

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	/* Yandex Map */

		// Discount Timer
	// http://hilios.github.io/jQuery.countdown/
	// $('#timer1').countdown('2017/11/11', function(event) {
	// 	var $this = $(this).html(event.strftime(''
	// 		+ '<div class="timer__item"><div class="timer__digit">%H</div><div class="timer__descr">Часов</div></div>'
	// 		+ '<div class="timer__item"><div class="timer__digit">%M</div><div class="timer__descr">Минут</div></div>'
	// 		+ '<div class="timer__item"><div class="timer__digit">%S</div><div class="timer__descr">Секунд</div></div>'));
	// });
	// $('#timer2').countdown('2017/11/11', function(event) {
	// 	var $this = $(this).html(event.strftime(''
	// 		+ '<div class="timer__item"><div class="timer__digit">%H</div><div class="timer__descr">Часов</div></div>'
	// 		+ '<div class="timer__item"><div class="timer__digit">%M</div><div class="timer__descr">Минут</div></div>'
	// 		+ '<div class="timer__item"><div class="timer__digit">%S</div><div class="timer__descr">Секунд</div></div>'));
	// });

	/* Slick slider for reviews section */
	$('.section-6-items').slick({
		arrows: true,
		prevArrow: '<a class="left carousel-control"></a>',
		nextArrow: '<a class="right carousel-control"></a>',
		swipe: false,
		// infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	});

	/* Slick slider for reviews section */
	$('.reviews-big').slick({
		arrows: true,
		// infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	/* Slick slider */
	$('.video-slider').slick({
		arrows: true,
		prevArrow: '<a class="left carousel-control"></a>',
		nextArrow: '<a class="right carousel-control"></a>',
		// infinite: false,
		speed: 400,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 5,
					slidesToScroll: 5
				}
			},
			{
				breakpoint: 715,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 584,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 449,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
		]
	});


	/* ----- Modal gallery ----- */
	var currentElementIndex = 0;

	function loadGalleryModal(elIndex) {
		var photoURL = $( $('.gallery-item')[elIndex] ).data('photourl') ? $( $('.gallery-item')[elIndex] ).data('photourl') : '',
				videoId = $( $('.gallery-item')[elIndex] ).data('videoid') ? $( $('.gallery-item')[elIndex] ).data('videoid') : '',
				container = $('.modal-gallery__container'),
				dataHeading = $( $('.gallery-item')[elIndex] ).data('heading') ? $( $('.gallery-item')[elIndex] ).data('heading') : '',
				dataDate = $( $('.gallery-item')[elIndex] ).data('date') ? $( $('.gallery-item')[elIndex] ).data('date') : '',
				dataText = $( $('.gallery-item')[elIndex] ).data('text') ? $( $('.gallery-item')[elIndex] ).data('text') : '',
				heading = $('.modal-gallery__heading'),
				date = $('.modal-gallery__date'),
				text = $('.modal-gallery__text');

		$('.modal-gallery__content').show();

		function setData() {
			if (dataHeading != '' || dataDate != '' || dataText != '') {
				heading.text(dataHeading);
				date.text(dataDate);
				text.text(dataText);
			} else {
				$('.modal-gallery__content').hide();
			}
		}

		if (photoURL != '') {
			setData();
			container.removeClass('modal-gallery__container--video');
			container.empty();
			container.css("background-image", "url('" + photoURL + "')");
		} else if (videoId != '') {
			// container.css("background-image", "url('https://img.youtube.com/vi/" + videoId + "/0.jpg')");
			setData();
			container.empty();
			container.addClass('modal-gallery__container--video');
			container.css("background-image", "");
			container.append('<iframe id="modal-video" src="https://www.youtube.com/embed/' + videoId + '?rel=0&amp;controls=0&amp;showinfo=0" allowfullscreen></iframe>');
		}
	}

	$('.modal-gallery__left').click(function(e) {
		// var delay = 400;
		e.stopPropagation();
		e.preventDefault();
		if (currentElementIndex > 0) {
			// $('.modal-gallery__container').animate({opacity: '0'}, delay);
			// $('.modal-gallery__content').animate({opacity: '0'}, delay);
			// setTimeout(function() {
			loadGalleryModal(currentElementIndex - 1);
			// }, delay);
			--currentElementIndex;
			// setTimeout(function() {
				// $('.modal-gallery__container').animate({opacity: '1'}, delay);
				// $('.modal-gallery__content').animate({opacity: '1'}, delay);
			// }, delay * 2);
		}
	});
	$('.modal-gallery__right').click(function(e) {
		// var delay = 400;
		e.stopPropagation();
		e.preventDefault();
		if (currentElementIndex < $('.gallery-item').length - 1) {
			// $('.modal-gallery__container').animate({opacity: '0'}, delay);
			// $('.modal-gallery__content').animate({opacity: '0'}, delay);
			// setTimeout(function() {
				loadGalleryModal(currentElementIndex + 1);
			// }, delay);
			++currentElementIndex;
			// setTimeout(function() {
				// $('.modal-gallery__container').animate({opacity: '1'}, delay);
				// $('.modal-gallery__content').animate({opacity: '1'}, delay);
			// }, delay * 2);
		}
	});

	$('#modal-gallery').on('show.bs.modal', function (e) {
		var photoURL = $(e.relatedTarget).data('photourl') ? $(e.relatedTarget).data('photourl') : '',
				videoId = $(e.relatedTarget).data('videoid') ? $(e.relatedTarget).data('videoid') : '',
				container = $('.modal-gallery__container'),
				dataHeading = $(e.relatedTarget).data('heading') ? $(e.relatedTarget).data('heading') : '',
				dataDate = $(e.relatedTarget).data('date') ? $(e.relatedTarget).data('date') : '',
				dataText = $(e.relatedTarget).data('text') ? $(e.relatedTarget).data('text') : '',
				heading = $('.modal-gallery__heading'),
				date = $('.modal-gallery__date'),
				text = $('.modal-gallery__text');

		// console.log( $('.gallery-item').index(e.relatedTarget) );
		currentElementIndex = $('.gallery-item').index(e.relatedTarget);
		// console.log( currentElementIndex );

		function setData() {
			if (dataHeading != '' || dataDate != '' || dataText != '') {
				heading.text(dataHeading);
				date.text(dataDate);
				text.text(dataText);
			} else {
				$('.modal-gallery__content').hide();
			}
		}

		if (photoURL != '') {
			setData();
			container.removeClass('modal-gallery__container--video');
			container.empty();
			container.css("background-image", "url('" + photoURL + "')");
		} else if (videoId != '') {
			// container.css("background-image", "url('https://img.youtube.com/vi/" + videoId + "/0.jpg')");
			setData();
			container.empty();
			container.addClass('modal-gallery__container--video');
			container.css("background-image", "");
			container.append('<iframe id="modal-video" src="https://www.youtube.com/embed/' + videoId + '?rel=0&amp;controls=0&amp;showinfo=0" allowfullscreen></iframe>');
		}

		// console.log(e.relatedTarget);
	});

	$('#modal-gallery').on('hide.bs.modal', function (e) {
		$('.modal-gallery__container').empty();
		$('.modal-gallery__content').show()
	});

	$('.modal-gallery__container').click(function(e) {
		if ($(this).hasClass('modal-gallery__container--video')) {
			$(this).removeClass('modal-gallery__container--video');
			if ( $("#modal-video").prop("tagName") == 'IFRAME' ) {
				$("#modal-video").attr('src', $("#modal-video").attr('src') + '&amp;autoplay=1');
			} else {
				$('#modal-video').get(0).play();
			}
		}
	});

	/* ----- Modal gallery END ----- */


	// Click on video thumbs
	$('.video-slider__item a').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$("#video").attr('src', $(this).attr('href') );
		$('.video__btn').trigger('click');
	});


	// Click on play button
	$('.video__btn').click(function(e) {
		var id = $(this).attr('href') ? $(this).attr('href') : '';
		e.stopPropagation();
		e.preventDefault();

		if (id != '') {
			var videoId = $(this).parent().data('videoid');
			$(this).before('<iframe id="' + id.slice(1) + '" src="https://www.youtube.com/embed/' + videoId + '?rel=0&amp;controls=0&amp;showinfo=0" allowfullscreen></iframe>');

			$(this).parent().removeClass('video-block--with-overlay');

			if ( $(id).prop("tagName") == 'IFRAME' ) {
				// console.log(id);
				$(id).attr('src', $(id).attr('src') + '&amp;autoplay=1');
			} else {
				// console.log(id);
				$(id).get(0).play();
			}
		} else {
			$('.video-block').removeClass('video-block--with-overlay');
			if ( $("#video").prop("tagName") == 'IFRAME' ) {
				// If video withOUT attributes (YouTube, Vimeo)
				// $("#video").attr('src', $("#video").attr('src') + '?autoplay=1');
				// If video with attributes (YouTube)
				$("#video").attr('src', $("#video").attr('src') + '&amp;autoplay=1');
				// If video with attributes (Vimeo)
				// $("#video").attr('src', $("#video").attr('src') + '&autoplay=1');
			} else {
				$('#video').get(0).play();
			}
		}
	});

	// Swipe for Bootstrap carousel
	$("#main-carousel").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll: "vertical",
		threshold: 0,
	});

	function is_touch_device() {
		return 'ontouchstart' in window // works on most browsers 
				|| navigator.maxTouchPoints; // works on IE10/11 and Surface
	};

	// StickyFooter
	function StickyFooter() {
		var footerHeight = $('.footer').outerHeight(true);
		$('.wrapper').css('paddingBottom', footerHeight);
	}
	// On resize
	$(window).resize(function(){
		StickyFooter();
		if ( is_touch_device() ) {
			$('.section-6-item__inner-box-content').css('bottom', '0');
		}
	});
	// On start
	StickyFooter();
	if ( is_touch_device() ) {
		$('.section-6-item__inner-box-content').css('bottom', '0');
	}

	// Update sticky footer when open Bootstrap collapsable menus
	$('#sidebar-collapse').on('shown.bs.collapse', function () {
		StickyFooter();
	})

});