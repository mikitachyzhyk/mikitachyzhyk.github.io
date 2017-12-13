$(document).ready(function(){

	$('.nav-tabs a').click(function(e) {
		$('.nav-tabs li').removeClass('filled');
		if ($(this).attr('href') == '#payment') {
			$('.nav-tabs a[href="#delivery"]').parent().addClass('filled');
		}
		if ($(this).attr('href') == '#contact-details') {
			$('.nav-tabs a[href="#delivery"]').parent().addClass('filled');
			$('.nav-tabs a[href="#payment"]').parent().addClass('filled');
		}
	});
	$('#cart-order-button-1').click(function(e) {
		$('.nav-tabs a[href="#payment"]').tab('show');
		$('.nav-tabs li').removeClass('filled');
		$('.nav-tabs a[href="#delivery"]').parent().addClass('filled');
	});
	$('#cart-order-button-2').click(function(e) {
		$('.nav-tabs a[href="#contact-details"]').tab('show');
		$('.nav-tabs li').removeClass('filled');
		$('.nav-tabs a[href="#delivery"]').parent().addClass('filled');
		$('.nav-tabs a[href="#payment"]').parent().addClass('filled');
	});

	/* Slider UI */
	var maxValue = 200000;
	jQuery("#slider").slider({
		min: 0,
		max: maxValue,
		values: [0,maxValue],
		range: true,
		stop: function(event, ui) {
			jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
			jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
			},
			slide: function(event, ui){
			jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
			jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
			}
	});
	jQuery("input#minCost").change(function(){
		var value1=jQuery("input#minCost").val();
		var value2=jQuery("input#maxCost").val();

			if(parseInt(value1) > parseInt(value2)){
			value1 = value2;
			jQuery("input#minCost").val(value1);
		}
		jQuery("#slider").slider("values",0,value1);
	});
	jQuery("input#maxCost").change(function(){
		var value1=jQuery("input#minCost").val();
		var value2=jQuery("input#maxCost").val();
		
		if (value2 > maxValue) { value2 = maxValue; jQuery("input#maxCost").val(maxValue)}

		if(parseInt(value1) > parseInt(value2)){
			value2 = value1;
			jQuery("input#maxCost").val(value2);
		}
		jQuery("#slider").slider("values",1,value2);
	});

	/* Filter empty button */
	$('#filter-empty').click(function() {
		// $('#minCost').val('0');
		// $('#maxCost').val(maxValue);
		// $( "#manufacturer-1" ).prop( "checked", false );
		// $( "#manufacturer-2" ).prop( "checked", false );
		// $( "#manufacturer-3" ).prop( "checked", false );
		// $( "#manufacturer-4" ).prop( "checked", false );
		// $( "#in-stock" ).prop( "checked", false );
		jQuery("#slider").slider("values",0,0);
		jQuery("#slider").slider("values",1,maxValue);
		// e.stopPropagation();
		// e.preventDefault();
	});

	/* Customize Input Number */
	jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up"><i class="fa fa-chevron-up" aria-hidden="true"></i></div><div class="quantity-button quantity-down"><i class="fa fa-chevron-down" aria-hidden="true"></i></div></div>').insertAfter('.quantity input');
	jQuery('.quantity').each(function() {
		var spinner = jQuery(this),
			input = spinner.find('input[type="number"]'),
			btnUp = spinner.find('.quantity-up'),
			btnDown = spinner.find('.quantity-down'),
			min = input.attr('min'),
			max = input.attr('max');

		btnUp.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

		btnDown.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

	});

	/* Slick for single */
	$('.single-slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<a class="left carousel-control"></a>',
		nextArrow: '<a class="right carousel-control"></a>',
		fade: true,
		asNavFor: '.single-slider-nav'
	});
	$('.single-slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.single-slider-for',
		// centerMode: true,
		focusOnSelect: true
	});

	/* Slick for single description */
	$('.single-addon-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<a class="left carousel-control"></a>',
		nextArrow: '<a class="right carousel-control"></a>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true,
				}
			},
			{
				breakpoint: 680,
				settings: {
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
				}
			},
		]
	});

	/* Slick */
	$('.main-logos__items').slick({
		arrows: true,
		infinite: true,
		speed: 400,
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<a class="left carousel-control"></a>',
		nextArrow: '<a class="right carousel-control"></a>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					dots: true,
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});

	// Swipe for Bootstrap carousel
	$("#main-carousel").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll:"vertical"
	});

	/* Yandex Map */
	var myMap;

	// Дождёмся загрузки API и готовности DOM.
	if ( $('#map').length ) {
		ymaps.ready(init);
	}

	function init () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [60.042923, 30.380843],
					zoom: 17,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Балун с подписью
			myMap.geoObjects
			.add(new ymaps.Placemark([60.042923, 30.380843], {
				balloonContent: 'Санкт-Петербург, <br> пр. Просвещения 53/1, оф. 47',
				iconCaption: 'проспект Просвещения, 53к1'
			}, {
				preset: 'islands#greenDotIconWithCaption',
				iconColor: '#ff3535'
			}));

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}

	// Дождёмся загрузки API и готовности DOM.
	if ( $('#contact-map').length ) {
		ymaps.ready(contactInit);
	}

	/* Карта для страницы контактов */
	function contactInit () {
			// Создание экземпляра карты и его привязка к контейнеру с
			// заданным id ("map").
			myMap = new ymaps.Map('contact-map', {
					// При инициализации карты обязательно нужно указать
					// её центр и коэффициент масштабирования.
					center: [59.994193, 30.281796],
					zoom: 10,
					// Отключение кнопок упавления
					controls: []
			}, {
					searchControlProvider: 'yandex#search',
					// Как добраться
					// suppressMapOpenBlock: true
			});

			// Балун
			myPlacemark = new ymaps.Placemark([59.994193, 30.281796], {
			}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: 'img/contacts/balloon.png',
					// Размеры метки.
					iconImageSize: [43, 56],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-21, -56],
			});
			// Балун №2
			myPlacemark2 = new ymaps.Placemark([59.984193, 30.281796], {
			}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#imageWithContent',
					// Своё изображение иконки метки.
					iconImageHref: 'img/contacts/balloon.png',
					// Размеры метки.
					iconImageSize: [43, 56],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-21, -56],
			});

			myMap.geoObjects
			.add(myPlacemark)
			.add(myPlacemark2);;

			// Отключение скролла
			myMap.behaviors.disable('scrollZoom');
	}
	/* Yandex Map */


	// Touch
	// var isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);
	// this work in IE 11
	var isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	
	/********** Sidebar **********/

	/* Sidebar inner menu toggle */
	$('.nav--sidebar-inner a.dropdown-toggle').on("click", function(e){
		$(this).next('ul').toggle();
		$(this).parent('li').toggleClass('open');
		e.stopPropagation();
		e.preventDefault();
	});
	$('.nav--sidebar-inner .dropdown-submenu a.submenu-toggle').on("click", function(e){
		$(this).next('ul').toggle();
		$(this).parent('li').toggleClass('open');
		e.stopPropagation();
		e.preventDefault();
	});

	if(!isTouchDevice){
		/* On hover */
		$( ".nav--sidebar li.dropdown a.dropdown-toggle" ).mouseenter(function() {
			if ( ! $(this).next('ul').is(':visible') ) {
				$( this ).trigger( "click" );
			}
		});
		$( ".nav--sidebar" ).mouseleave(function() {
			$( 'body' ).trigger( "click" );
		});
		/* On hover END */

		/* Sidebar menu check dropdown position */
		$('.nav--sidebar').on('shown.bs.dropdown', function (e) {
			var top = $(window).scrollTop(),
					sidebarTop = $('#sidebar').offset().top,
					offsetTop = top - sidebarTop,
					target = e.relatedTarget,
					targetOffset = $(target).offset().top,
					dropdown = $('.nav--sidebar li.dropdown.open ul.dropdown-menu'),
					dropdownHeight = dropdown.outerHeight(),
					dropdownOffset = dropdown.offset().top,
					offset = $(target).outerHeight() + 30;

			// if dropdown link is lower than dropdown menu
			if ( targetOffset > sidebarTop + dropdownHeight ) {
				dropdown.css('top', targetOffset - dropdownHeight - sidebarTop + offset );
				dropdownOffset = dropdown.offset().top;
				// if dropdown menu is higher than scrollTop
				if ( dropdownOffset < top ) {
					dropdown.css('top', offsetTop + 30 );
				}
			} else {
				dropdown.css('top', '' );
				dropdownOffset = dropdown.offset().top;
				// if dropdown menu is higher than scrollTop
				if ( dropdownOffset < top ) {
					dropdown.css('top', offsetTop + 30 );
				}
			}
		})
	}

	/* -------------------- Multinav -------------------- */

	/* Carousel Menu */
	$('.navbar-multinav').carouselMenu();

	var currentMList = 0;

	$('#carousel-menu-prev').addClass('disabled');
	if ( $('ul.nav.multinav').length == 1 ) {
		$('#carousel-menu-next').addClass('disabled');
	}

	$('#carousel-menu-next').click(function() {
		if ( $('ul.nav.multinav').length - 1 > currentMList ) {
			$('#carousel-menu-prev').removeClass('disabled');
			currentMList++;
			// console.log(currentMList);
		} 
		if ( $('ul.nav.multinav').length - 1 == currentMList ) {
			$(this).addClass('disabled');
		}
	});
	$('#carousel-menu-prev').click(function() {
		if ( 0 < currentMList ) {
			$('#carousel-menu-next').removeClass('disabled');
			currentMList--;
			// console.log(currentMList);
		}
		if ( 0 == currentMList ) {
			$(this).addClass('disabled');
		}
	});
	/* Carousel Menu END */

	/* Close menu on click */
	$(window).on("click", function(e){
		$('ul.nav.multinav .dropdown-submenu a.submenu-toggle').next('ul').hide();
		if (window.matchMedia("(min-width: 768px)").matches) {
			mmenuHeightOff();
		}
	});
	$('ul.nav.multinav li.dropdown a').on("click", function(e){
		if ( $(this).hasClass('submenu-toggle') && $(this).next('ul').is(':visible') ) {
			// do nothing
		} else {
			$('ul.nav.multinav .dropdown-submenu a.submenu-toggle').next('ul').hide();
			if (window.matchMedia("(min-width: 768px)").matches) {
				mmenuHeightOff();
			}
		}
	});

	// if (window.matchMedia("(min-width: 768px)").matches) {
		/* On hover */
	if(!isTouchDevice){
		$( "ul.nav.multinav li.dropdown a.dropdown-toggle, ul.nav.multinav li.dropdown a.submenu-toggle" ).mouseenter(function() {
			if ( ! $(this).next('ul').is(':visible') ) {
				$( this ).trigger( "click" );
			}
		});
		$( "ul.nav.multinav" ).mouseleave(function() {
			$( 'body' ).trigger( "click" );
			$( "ul.nav.multinav li.dropdown a.dropdown-toggle" ).focusout();
			$( "ul.nav.multinav li.dropdown a.dropdown-toggle" ).blur();
			// $('#search').focus();
		});
		/* On hover END */
	}

	/* Click on Submenu */
	$('ul.nav.multinav .dropdown-submenu a.submenu-toggle').on("click", function(e){
		$(this).next('ul').toggle();
		if (window.matchMedia("(min-width: 768px)").matches) {
			mmenuHeightOn( $(this) );
		}
		e.stopPropagation();
		e.preventDefault();
	});
	/* Close first level dropdown */
	$('body').on("click", function(e){
		var target = $( e.target );
		if ( $('ul.nav.multinav>li.dropdown>ul.dropdown-menu').is(':visible') && ! target.hasClass('dropdown-toggle') ) {
			menuOverlayOff();
			// console.log(target);
		} else if ( target.parent('li').hasClass('open') ) {
			menuOverlayOff();
		}
	});
	$('ul.nav.multinav>li.dropdown').on("click", function(e){
		if ( ! $('ul.nav.multinav>li.dropdown>ul.dropdown-menu').is(':visible') ) {
			menuOverlayOn();
		}
	});
	/* Overlay for multinav */
	function menuOverlayOn() {
		// Calculate overlay top
		var bottom = $('ul.nav.multinav').offset().top + $('ul.nav.multinav').outerHeight();
		$('.multinav-overlay').css('top', bottom + 'px');
		// $('.multinav-overlay').fadeIn(100);
		$('.multinav-overlay').show();
	}
	function menuOverlayOff() {
		// $('.multinav-overlay').fadeOut(100);
		$('.multinav-overlay').hide();
	}
	/* Calculate submenu height and change height of first level dropdown menu */
	function mmenuHeightOn(el) {
		// console.log($(el).parent('li').parent('ul.dropdown-menu').outerHeight());
		// console.log($(el).next('ul').outerHeight());
		if ( $(el).parent('li').parent('ul.dropdown-menu').outerHeight() < $(el).next('ul').outerHeight() ) {
			$(el).parent('li').parent('ul.dropdown-menu').outerHeight( $(el).next('ul').outerHeight() );
		}
	}
	function mmenuHeightOff() {
		$('ul.nav.multinav li.dropdown ul.dropdown-menu').outerHeight('');
	}

	/* -------------------- Multinav END -------------------- */

	// StickyFooter
	function StickyFooter() {
		var footerHeight = $('.footer').outerHeight();
		$('.wrapper').css('paddingBottom', footerHeight);
	}
	// On resize
	$(window).resize(function(){
		StickyFooter();
	});
	// On start
	StickyFooter();

});