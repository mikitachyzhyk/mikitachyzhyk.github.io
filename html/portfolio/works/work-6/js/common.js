$(document).ready(function(){

	/* Slick slider for products */
	$('.single-item__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: false,
		draggable: false,
		asNavFor: '.single-item__slider-thumb',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				draggable: true,
			}
		}
		]
	});
	$('.single-item__slider-thumb').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.single-item__slider',
		// arrows: true,
		infinite: false,
		speed: 200,
		vertical: true,
		// verticalSwiping: true,
		// swipe: true,
		draggable: false,
		// centerMode: true,
		// centerPadding: '0',
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 5,
				vertical: false,
				draggable: true,
			}
		},
		{
			breakpoint: 570,
			settings: {
				slidesToShow: 4,
				vertical: false,
				draggable: true,
			}
		},
		{
			breakpoint: 470,
			settings: {
				slidesToShow: 3,
				vertical: false,
				draggable: true,
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
	StickyFooter();
});