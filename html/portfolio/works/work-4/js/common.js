$(document).ready(function(){

	/* Resizing select */
	function reseizeSelect() {
		$("#width_tmp_option").html( $('#resizing_select option:selected').text() );
		$("#resizing_select").width( ($("#width_tmp_select").width() + 27 ) );
		console.log( $("#width_tmp_select").width() );
		console.log( $("#resizing_select").width() );
	}

	// StickyFooter
	function StickyFooter() {
		var footerHeight = $('.footer').innerHeight();
		$('.wrapper').css('paddingBottom', footerHeight);
	}

	// Swipe for Bootstrap carousel
	$("#carousel-main").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll:"vertical"
	});

	// equalHeights
	function equalSpecItem() {
		$('.special-item__heading').equalHeights();
	}


	/* -------------------- Slick Slider -------------------- */
	// Check on load
	if (window.matchMedia("(min-width: 768px)").matches) {
		slickDeactivate();
	} else {
		slickActivate();
	}
	// Check when resize
	$(window).resize(function(){
		if (window.matchMedia("(min-width: 768px)").matches) {
			slickDeactivate();
		} else {
			slickActivate();
		}
	});
	// Slick activate
	function slickActivate() {
		// Slick #1
		if ( !$('.pop-goods').hasClass('slick-activated') ) {
			$('.pop-goods').slick({
				dots: true,
				arrows: false,
				infinite: true,
				// centerMode: true,
				speed: 300,
				slidesToShow: 2,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
				]
			});
			$('.pop-goods').addClass('slick-activated');
		}
		// Slick #2
		if ( !$('.special-offers').hasClass('slick-activated') ) {
			$('.special-offers').slick({
				dots: true,
				arrows: false,
				infinite: true,
				// centerMode: true,
				speed: 300,
				slidesToShow: 2,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},
				]
			});
			$('.special-offers').addClass('slick-activated');
		}
	}
	// Slick deactivate
	function slickDeactivate() {
		// Slick #1
		if ( $('.pop-goods').hasClass('slick-activated') ) {
			$('.pop-goods').slick('unslick');
			// Reload element. Add space between URL and selector.
			$("#pop-goods").load(location.href + " #pop-goods");
		}
		// Slick #2
		if ( $('.special-offers').hasClass('slick-activated') ) {
			$('.special-offers').slick('unslick');
			// Reload element. Add space between URL and selector.
			$("#special-offers").load(location.href + " #special-offers");
		}
	}

	/* Slick slider for products */
	$('.product__slider-lg').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: false,
		draggable: false,
		asNavFor: '.product__slider-sm',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				draggable: true,
			}
		}
		]
	});
	$('.product__slider-sm').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.product__slider-lg',
		arrows: true,
		infinite: false,
		speed: 200,
		// swipe: true,
		draggable: false,
		// centerMode: true,
		// centerPadding: '0',
		focusOnSelect: true,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 5,
				draggable: true,
			}
		},
		{
			breakpoint: 570,
			settings: {
				slidesToShow: 4,
				draggable: true,
			}
		},
		{
			breakpoint: 470,
			settings: {
				slidesToShow: 3,
				draggable: true,
			}
		},
		{
			breakpoint: 375,
			settings: {
				slidesToShow: 2,
				draggable: true,
			}
		}
		]
	});

	/* -------------------- Slick Slider -------------------- */

	// On select tag change
	$('#resizing_select').change(function(){
		reseizeSelect();
	});
	// On resize
	$(window).resize(function(){
		reseizeSelect();
		StickyFooter();
		equalSpecItem();
	});
	// On start
	reseizeSelect();
	StickyFooter();
	equalSpecItem();

});