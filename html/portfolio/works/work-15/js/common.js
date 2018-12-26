$(function() {

	/* Phone mask */

	// var mask = new IMask(element, maskOptions);
	$(".phone-mask").each(function(i, el) {
		new IMask(this, {
			mask: '+{7} (000) 000-00-00',
		});
	});


	/* Load reviews */

	var currentHousesCount = 3,
			currentHousesLength = 3,
			currentReviewsCount = 2,
			currentReviewsLength = 2;

	$('#load-reviews').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		if ( currentReviewsCount == 2 ) {

			$('.reviews-load').load('user/reviews.html', function() {

				$('.reviews-item').each(function(i, el) {
					if ( i >= currentReviewsCount && i < currentReviewsCount + 3 ) {
						$(this).addClass('show');
						// $(this).css('display', 'flex');
					}
				});
				currentReviewsCount = currentReviewsCount + 3;
				currentReviewsLength = $('.reviews-item').length;
				// console.log(currentReviewsLength);
				// console.log(currentReviewsCount);

				if ( currentReviewsCount >= currentReviewsLength ) {
					$('#load-reviews').hide();
				}

			});

		} else {

			$('.reviews-item').each(function(i, el) {
				if ( i >= currentReviewsCount && i < currentReviewsCount + 3 ) {
					$(this).addClass('show');
					// $(this).css('display', 'flex');
				}
			});
			currentReviewsCount = currentReviewsCount + 3;
			// console.log(currentReviewsCount);

			if ( currentReviewsCount >= currentReviewsLength ) {
				$('#load-reviews').hide();
			}
			// console.log(currentReviewsLength);

		}
	});

	/* Load houses */

	$('#load-houses').click(function(e) {

		e.stopPropagation();
		e.preventDefault();

		if ( currentHousesCount == 3 ) {

			$('.houses-load').load('user/houses.html', function() {

				// $('.houses-load .houses-item').hide();

				$('.houses-item').each(function(i, el) {
					if ( i >= currentHousesCount && i < currentHousesCount + 3 ) {
						// $(this).css('display', 'flex');
						$(this).addClass('houses-item--show');
					}
				});

				activateHouseSliders(3);

				$('.houses-item').each(function(i, el) {
					/* refresh sliders */
					$('.houses-slider-for--' + i)[0].slick.refresh();
					$('.houses-slider-nav--' + i)[0].slick.refresh();
				});

				currentHousesCount = currentHousesCount + 3;
				currentHousesLength = $('.houses-item').length;
				// console.log(currentHousesLength);
				// console.log(currentHousesCount);

				if ( currentHousesCount >= currentHousesLength ) {
					$('#load-houses').hide();
				}

				$('.modal-img-open').click(function(e) {
					e.stopPropagation();
					e.preventDefault();
					if (window.matchMedia("(min-width: 768px)").matches) {
						$('.modal-img img').attr('src', '');
						$('.modal-img img').attr('src', $(this).attr('href'));
						$('.modal-img').show();
						bodyLockScroll();
					}
				});

				$('.modal-house-view-open').click(function(e) {
					e.stopPropagation();
					e.preventDefault();
					$('.modal-house-view').show();
					$('.modal-house-view').find('input[type="hidden"]').val( $(this).data('house-number') );
					bodyLockScroll();
				});

			});

		} else {

			$('.houses-item').each(function(i, el) {
				if ( i >= currentHousesCount && i < currentHousesCount + 3 ) {
					// $(this).css('display', 'flex');
					$(this).addClass('houses-item--show');
					/* refresh sliders */
					$('.houses-slider-for--' + i)[0].slick.refresh();
					$('.houses-slider-nav--' + i)[0].slick.refresh();
				}
			});
			currentHousesCount = currentHousesCount + 3;
			// console.log(currentHousesCount);

			if ( currentHousesCount >= currentHousesLength ) {
				$('#load-houses').hide();
			}
			// console.log(currentHousesLength);

		}

	});

	/* Disable submit button if not checked quiz privacy policy checkbox */
	$('#messageto-headmaster-checkbox').next().click(function(e) {
		if( !$(e.target).closest('a').length ){
			if ( $('#messageto-headmaster-checkbox').is(':checked') ) {
				$('.modal-messageto-headmaster .button').addClass('disabled');
			} else {
				$('.modal-messageto-headmaster .button').removeClass('disabled');
			}
		}
	});
	$('#house-view-checkbox').next().click(function(e) {
		if( !$(e.target).closest('a').length ){
			if ( $('#house-view-checkbox').is(':checked') ) {
				$('.modal-house-view .button').addClass('disabled');
			} else {
				$('.modal-house-view .button').removeClass('disabled');
			}
		}
	});
	$('#callback-checkbox').next().click(function(e) {
		if( !$(e.target).closest('a').length ){
			if ( $('#callback-checkbox').is(':checked') ) {
				$('.modal-callback .button').addClass('disabled');
			} else {
				$('.modal-callback .button').removeClass('disabled');
			}
		}
	});
	$('#catalog-form-checkbox').next().click(function(e) {
		if( !$(e.target).closest('a').length ){
			if ( $('#catalog-form-checkbox').is(':checked') ) {
				$('.catalog .button').addClass('disabled');
			} else {
				$('.catalog .button').removeClass('disabled');
			}
		}
	});
	$('#quiz-checkbox-2').next().click(function(e) {
		if( !$(e.target).closest('a').length ){
			if ( $('#quiz-checkbox-2').is(':checked') ) {
				$('.button-quiz-success').addClass('disabled');
			} else {
				$('.button-quiz-success').removeClass('disabled');
			}
		}
	});

	/* Quiz range slider */
	var $slider = $(".quiz-range"),
			$input = $(".quiz-range-result input"),
			min = 0,
			max = 300;

	$slider.slider({
		min: min,
		max: max,
		// step: 50
	})
	.slider("pips", {
		rest: "label",
		step: 50
	})
	.slider("float");

	$input.on("change", function(e) {
		var num = parseFloat( $input.val() ),
				isProblem = false;
		if ( num === num ) {
			if ( num < min ) {
				num = min;
			} else if ( num > max ) {
				num = max;
			}
			$slider.slider("value", num );
			$input.val( num );
		}
	});

	$(".quiz-range").on("slidechange", function( e, ui ) {
		$(".quiz-range-result input").val(ui.value);
	});

	/* Quiz Tabs */
	$('.modal-quiz-tabs ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		var $this = $(this);

		$('.modal-quiz-tabs ul.tabs li').removeClass('complete');

		$('.modal-quiz-tabs ul.tabs li').each(function(i, el) {
			if ( $(el).html() == $this.html() ) {
				return false;
			}
			$(el).addClass('complete');
		});

		$('.modal-quiz-tabs ul.tabs li').removeClass('current');
		$('.modal-quiz-tabs .tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');

		// var currentLi = $('.modal-quiz-tabs ul.tabs li.current').data('tab');
		// $('.tabs-next').show();
		// if (currentLi == 'tab-6') {
		// 	$('.tabs-next').hide();
		// }
	});

	$('.tabs-next').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		var currentLi = $('.modal-quiz-tabs ul.tabs li.current').data('tab'),
				nextLi = $('.modal-quiz-tabs ul.tabs li.current').next().data('tab'),
				nextTab = $('.modal-quiz-tabs .tab-content.current').next().attr('id');

		if (currentLi != 'tab-6') {

			$('.modal-quiz-tabs ul.tabs li').each(function(i, el) {
				if ( $(el).data('tab') == nextLi ) {
					return false;
				}
				$(el).addClass('complete');
			});

			$('.modal-quiz-tabs ul.tabs li').removeClass('current');
			$('.modal-quiz-tabs .tab-content').removeClass('current');

			$('.modal-quiz-tabs ul.tabs li[data-tab="' + nextLi + '"]').addClass('current');
			$('#'+nextTab).addClass('current');

			// console.log(nextLi);
			// console.log(nextTab);

			// 	$('.tabs-next').hide();
		} else {
			/* open success tab */
			$('.modal-quiz-tabs ul.tabs li').removeClass('current');
			$('.modal-quiz-tabs .tab-content').removeClass('current');

			$('.modal-quiz-tabs ul.tabs li[data-tab="' + nextLi + '"]').addClass('current');
			$('#'+nextTab).addClass('current');

			$(this).hide();

			/*  */
			$('.modal-quiz .tab-content:not(#tab-7) input:checked').each(function(i, el) {
				// console.log( $(this).next().find('span').text() );
				$('.quiz-box__list').append('<li>' + $(this).next().find('span').data('alt-text') + '</li>');
				if (i == 0) {
					$('.quiz-box__list').append('<li>' + $('.quiz-range-result input').val() + ' м<sup>2</sup></li>');
					// console.log( $('.quiz-range-result input').val() );
				}
			});

		}
	});

	/* Modals */

	$('.modal-messageto-headmaster-open').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.modal-messageto-headmaster').show();
		bodyLockScroll();
	});

	$('.modal-house-view-open').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.modal-house-view').show();
		$('.modal-house-view').find('input[type="hidden"]').val( $(this).data('house-number') );
		bodyLockScroll();
	});

	$('.modal-quiz-open').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.modal-quiz').show();
		bodyLockScroll();
	});

	/* Есть дубль в функции загрузки домов из файла */
	$('.modal-img-open').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (window.matchMedia("(min-width: 768px)").matches) {
			$('.modal-img img').attr('src', '');
			$('.modal-img img').attr('src', $(this).attr('href'));
			$('.modal-img').show();
			bodyLockScroll();
		}
	});
	$('.modal .button-close-modal').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).parents('.modal').hide();
		bodyUnlockScroll();
	});
	$('.modal').click(function(e) {
		if (e.target == this && !$(e.target).hasClass('modal-quiz')) {
			$(this).hide();
			bodyUnlockScroll();
		}
	});

	$('.modal-callback-open').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.modal-callback').show();
		bodyLockScroll();
	});

	/* Mobile menu */
	$('.header-menu-button').click(function(e) {
		$('.header-menu').show();
		bodyLockScroll();
	});
	$('#mobile-menu-close').click(function(e) {
		$('.header-menu').hide();
		bodyUnlockScroll();
	});

	function bodyLockScroll() {
		$('body').attr( 'data-pos', $(window).scrollTop()); // get actual scrollpos
		$('body').addClass('modal-open'); // add class to body
		$('.wrapper').scrollTop( $('body').attr( 'data-pos' ) ); // let wrapper scroll to scrollpos
	}
	function bodyUnlockScroll() {
		$("body").removeClass('modal-open');
		$( window ).scrollTop( $('body').attr( 'data-pos' ));
	}


	/* Houses section slider */

	activateHouseSliders();

	function activateHouseSliders(index) {

		index = index || 0;

		var	housesItems = $('.houses-item');
		// console.log(housesItems[1]);

		housesItems.each(function(i, el) {
			$(this).find('.houses-slider-for').addClass('houses-slider-for--' + i);
			$(this).find('.houses-slider-nav').addClass('houses-slider-nav--' + i);
		});

		for (var i = index; i < housesItems.length; i++) {
			$('.houses-slider-for--' + i).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				swipe: true,
				fade: false,
				adaptiveHeight: true,
				infinite: false,
				useTransform: true,
				speed: 400,
				cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
			});

			$('.houses-slider-nav--' + i)
				.on('init', function(event, slick) {
					$('.houses-slider-nav--' + i + ' .slick-slide.slick-current').addClass('is-active');
				})
				.slick({
					slidesToShow: 4,
					slidesToScroll: 4,
					dots: false,
					focusOnSelect: false,
					infinite: false,
					responsive: [{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					}, {
						breakpoint: 992,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					}, {
						breakpoint: 768,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					}, {
						breakpoint: 575,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					}, {
						breakpoint: 425,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					}]
				});
		}

		$('.houses-slider-for').on('afterChange', function(event, slick, currentSlide) {
			$(this).next().slick('slickGoTo', currentSlide);
			var currrentNavSlideElem = $(this).next().find('.slick-slide[data-slick-index="' + currentSlide + '"]');
			$(this).next().find('.slick-slide.is-active').removeClass('is-active');
			$(currrentNavSlideElem).addClass('is-active');
		});

		$('.houses-slider-nav').on('click', '.slick-slide', function(event) {
			event.preventDefault();
			var goToSingleSlide = $(this).data('slick-index');

			$(this).parent().parent().parent().prev().slick('slickGoTo', goToSingleSlide);
		});

	}

	/* Новогоднее поздравление */
	// setTimeout(function() {
	// 	$('.popup-new-year').show();
	// 	bodyLockScroll();
	// }, 1000);
	// $('.popup .popup__close').click(function(e) {
	// 	e.stopPropagation();
	// 	e.preventDefault();
	// 	$(this).parents('.popup').hide();
	// 	bodyUnlockScroll();
	// });
	// $('.popup').click(function(e) {
	// 	if (e.target == this) {
	// 		$(this).hide();
	// 		bodyUnlockScroll();
	// 	}
	// });

	//Smooth scroll
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// For Fixed Menu
			if ( $('.header-menu').css('position') == 'fixed' ) {$('.header-menu').hide();}
			bodyUnlockScroll();

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 600);
				return false;
			}
		}
	});

});

// google.maps.event.addDomListener(window, 'load', init);

function init() {
	if (document.getElementById('map')) {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 15,
				// zoomControl: boolean,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				// fullscreenControl: boolean,
				scrollwheel: false,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(45.047583, 41.98772), // New York

				// How you would like to style the map. 
				// This is where you would paste any style found on Snazzy Maps.
				styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
		};

		// Get the HTML DOM element that will contain your map 
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Marker sizes are expressed as a Size of X,Y where the origin of the image
		// (0,0) is located in the top left of the image.

		// Origins, anchor positions and coordinates of the marker increase in the X
		// direction to the right and in the Y direction down.
		var image = {
			url: 'img/marker.png',
			// This marker is 20 pixels wide by 32 pixels high.
			size: new google.maps.Size(79, 62),
			// The origin for this image is (0, 0).
			origin: new google.maps.Point(0, 0),
			// The anchor for this image is the base of the flagpole at (0, 32).
			anchor: new google.maps.Point(23, 60)
		};

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
				position: new google.maps.LatLng(45.04647922354263, 41.97547668809523),
				map: map,
				// title: 'Snazzy!',
				icon: image
		});

		// Center on mobile
		$(function() {
			// on start
			setToCenter();
			// on resize
			$(window).on('resize', function() {
				setToCenter();
			});
			function setToCenter() {
				if (window.matchMedia("(max-width: 767px)").matches) {
					map.setCenter(marker.getPosition());
				} else {
					map.setCenter(new google.maps.LatLng(45.047583, 41.98772));
				}
			}
		});
	}
}