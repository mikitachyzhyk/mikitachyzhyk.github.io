$(function() {

	/* Yandex Map */
	var myMap;

	// Дождёмся загрузки API и готовности DOM.
	if ( $('#contact-map').length ) {
		ymaps.ready(init);
	}

	/* Карта для страницы контактов */
	function init () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('contact-map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [59.994193, 30.281796],
					zoom: 14,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Создаём макет содержимого.
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
					'<div class="yandex-map-content">$[properties.iconContent]</div>'
			),

			// Большой балун с контентом
			myPlacemarkWithContent = new ymaps.Placemark([59.994193, 30.281796], {
					// hintContent: 'Собственный значок метки с контентом',
					// balloonContent: 'А эта — новогодняя',
					iconContent: '<span>Центральный офис</span>ул. Генерала Хрулёва, д. 13'
			}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: 'img/icons/balloon.png',
					// Размеры метки.
					iconImageSize: [69, 55],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-34, -55],
					// Смещение слоя с содержимым относительно слоя с картинкой.
					iconContentOffset: [-65, 80],
					// Макет содержимого.
					iconContentLayout: MyIconContentLayout
			});

			myMap.geoObjects.add(myPlacemarkWithContent);

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	/* Yandex Map */

	/* Adapt .market-of-company-characteristics box */
	var wholeSection = $('.section-market-of-company');
			headingContainer = $('.market-of-company-headings'),
			container = $('.market-of-company-characteristics'),
			headingContainerOriginal = $('.market-of-company-headings').clone(),
			containerOriginal = $('.market-of-company-characteristics').clone(),
			headingContainerSmall = $('.market-of-company-headings').clone(),
			containerSmall = $('.market-of-company-characteristics').clone(),
			heading1 = headingContainerSmall.find('.market-of-company-heading:nth-child(1)'),
			heading2 = headingContainerSmall.find('.market-of-company-heading:nth-child(2)'),
			heading3 = headingContainerSmall.find('.market-of-company-heading:nth-child(3)'),
			title1 = containerSmall.find('.market-of-company-characteristics__title:nth-child(2)'),
			title2 = containerSmall.find('.market-of-company-characteristics__title:nth-child(1)'),
			title3 = title1.clone(),
			title4 = title2.clone(),
			title5 = title1.clone(),
			title6 = title2.clone(),
			infoBoxBig1 = containerSmall.find('.market-of-company-characteristics__info-box--1'),
			infoBoxBig2 = containerSmall.find('.market-of-company-characteristics__info-box--4'),
			infoBoxMedium1 = containerSmall.find('.market-of-company-characteristics__info-box--2'),
			infoBoxMedium2 = containerSmall.find('.market-of-company-characteristics__info-box--5'),
			infoBoxSmall1 = containerSmall.find('.market-of-company-characteristics__info-box--3'),
			infoBoxSmall2 = containerSmall.find('.market-of-company-characteristics__info-box--6'),
			totalBox = containerSmall.find('.market-of-company-characteristics__center-text');

			containerSmall.empty();
			containerSmall.append(heading1);
			containerSmall.append(title1);
			containerSmall.append(infoBoxBig1);
			containerSmall.append(title2);
			containerSmall.append(infoBoxBig2);

			containerSmall.append(heading2);
			containerSmall.append(title3);
			containerSmall.append(infoBoxMedium1);
			containerSmall.append(title4);
			containerSmall.append(infoBoxMedium2);

			containerSmall.append(heading3);
			containerSmall.append(title5);
			containerSmall.append(infoBoxSmall1);
			containerSmall.append(title6);
			containerSmall.append(infoBoxSmall2);

			containerSmall.append(totalBox);

	function adaptCharactersBlock() {

		if (window.matchMedia("(min-width: 768px)").matches) {

			headingContainer.remove();
			container.remove();
			headingContainerSmall.remove();
			containerSmall.remove();
			wholeSection.append(headingContainerOriginal);
			wholeSection.append(containerOriginal);

		} else {

			headingContainer.remove();
			container.remove();
			headingContainerOriginal.remove();
			containerOriginal.remove();
			wholeSection.append(headingContainerSmall);
			wholeSection.append(containerSmall);

		}

	}

	// Swipe for Bootstrap carousel
	$("#main-carousel").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll:"vertical"
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
		equalheight('.team-member');
		if (window.matchMedia("(min-width: 768px)").matches) {
			equalheight('.about-company-service');
			equalheight('.online-platform-description');
		} else {
			// $('.team-member').css('height', '');
			$('.about-company-service').css('height', '');
			$('.online-platform-description').css('height', '');
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
		adaptCharactersBlock();
	});

	// On start
	// Нормально срабатывает в ие11, но не совсем красиво работает в хроме
	StickyFooter();
	equalizeHeight();
	adaptCharactersBlock();
	// When page is fully loaded
	// Работает в хроме, но не пашет в ие11
	// Решения лучше пока не нашел
	$(window).bind("load", function() {
		StickyFooter();
		equalizeHeight();
		adaptCharactersBlock();
	});

});