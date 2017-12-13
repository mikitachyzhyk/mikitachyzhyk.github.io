$(function() {

	/* Slick for single */
	$('.news').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		adaptiveHeight: true,
		swipe: false,
		infinite: false,
	});

	/* Slick for single */
	$('.section-3-slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		adaptiveHeight: true,
		// infinite: false,
		asNavFor: '.section-3-slider-nav',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
				}
			},
		]
	});
	$('.section-3-slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.section-3-slider-for',
		centerMode: true,
		centerPadding: '0',
		swipe: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: true,
					swipe: true,
					slidesToShow: 1
				}
			},
		]
	});

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
	// Нормально срабатывает в ие11, но не совсем красиво работает в хроме
	StickyFooter();
	// When page is fully loaded
	// Работает в хроме, но не пашет в ие11
	// Решения лучше пока не нашел
	$(window).bind("load", function() {
		StickyFooter();
	});

});