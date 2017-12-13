$(document).ready(function(){

	/* Photogallery */

	// Если существует photogallery класс
	if ( $('.photogallery').length ) {

		// Собираем массив изображений
		var photogalleryImgs = new Array();
		//Iterates through each of the image fields
		$('.photogallery img').each(function() {
			//Selects the img element within the current image field and pushes it onto the array.
			photogalleryImgs.push($(this).attr('src'));
		});
		// Создаем галерею
		var photogallery = $('.photogallery');
		photogallery.empty();
		var phBigItem = false, phBigItemReverse = true;
		for (var i = 0; i <= photogalleryImgs.length - 1; i++) {
			// First
			if ( i == 0 ) {
				photogallery.append('<div class="photogallery__item"></div>');
				phBigItem = true;
			}
			//
			if (phBigItem == true) {
				photogallery.children('.photogallery__item').last().append(
					"<div class='photogallery__item-big' style='background-image: url(" + photogalleryImgs[i] + ");'><a data-toggle='modal' data-target='#modal-img' href='" + photogalleryImgs[i] + "'></a></div>"
				);
				phBigItem = false;
			} else {
				if (phBigItemReverse == true) {
					photogallery.children('.photogallery__item').last().prepend(
						"<div class='photogallery__item-small' style='background-image: url(" + photogalleryImgs[i] + ");'><a data-toggle='modal' data-target='#modal-img' href='" + photogalleryImgs[i] + "'></a></div>"
					);
				} else {
					photogallery.children('.photogallery__item').last().append(
						"<div class='photogallery__item-small' style='background-image: url(" + photogalleryImgs[i] + ");'><a data-toggle='modal' data-target='#modal-img' href='" + photogalleryImgs[i] + "'></a></div>"
					);
				}
			}
			// Each third
			if ( ( (i + 1) % 3 ) == 0 && i != photogalleryImgs.length-1 ) {
				photogallery.append('<div class="photogallery__item"></div>');
				phBigItem = true;
				if (phBigItemReverse == true) {
					phBigItemReverse = false;
				} else {
					phBigItemReverse = true;
				}
			}
		}

		// Load images into Bootstrap Modal
		$('#modal-img').on('show.bs.modal', function (e) {
			$('#imagepreview').attr('src', $(e.relatedTarget).attr('href'));
		})

		/* Slick for photogallery */
		$('.photogallery').slick({
			arrows: true,
			dots: true,
			infinite: true,
			speed: 400,
			slidesToShow: 3,
			slidesToScroll: 3,
			centerMode: true,
			centerPadding: '180px',
			initialSlide: 1,
			draggable: false,
			responsive: [
				{
					breakpoint: 1921,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						centerPadding: '40px',
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: false,
						draggable: true,
					}
				},
			]
		});

		// Подложка для элементов управления
		$('.photogallery').after('<div class="photogallery-under-controls"></div>')

		// Вычесляем присутствие элементов управления в видимой области
		$.fn.isInViewport = function(elem) {
			var elementTop = $(this).offset().top;
			var elementBottom = elementTop + $(this).outerHeight();

			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();

			// Начиная с верхней границы элемента
			// return elementBottom > viewportTop && elementTop < viewportBottom;
			// Начиная с нижней границы элемента
			// return (elementBottom > viewportTop) && (elementTop < viewportBottom - $(this).outerHeight());
			// Начиная с нижней границы элемента + переданный элемент
			// Если параметр не передан
			if (elem !== undefined) {
				return (elementBottom > viewportTop) && (elementTop < viewportBottom - $(this).outerHeight() - $(elem).outerHeight());
			} else {
				return (elementBottom > viewportTop) && (elementTop < viewportBottom - $(this).outerHeight());
			}
		};
		function fixControls() {
			if ($('.photogallery .slick-track').isInViewport('.photogallery .slick-dots')) {
				$('.photogallery').removeClass('fixed-controls');
				$('.photogallery').css('padding-bottom', '');
				$('.photogallery-under-controls').css('height', '').hide();
			} else {
				$('.photogallery').addClass('fixed-controls');
				$('.photogallery').css('padding-bottom', $('.photogallery .slick-dots').outerHeight() );
				$('.photogallery-under-controls').css('height', $('.photogallery .slick-dots').outerHeight() ).show();
			}
		}
		// On load
		fixControls();
		// On resize scroll & scroll
		$(window).on('resize scroll', function() {
			fixControls();
		});

	}

	/* Photogallery END */

	/* Slick slider for reviews section */
	$('.reviews-items').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					// dots: true,
					// arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	});

	// Discount Timer
	// http://hilios.github.io/jQuery.countdown/
	$('#timer').countdown('2017/10/10', function(event) {
		var $this = $(this).html(event.strftime(''
			// Дни, если надо
			// + '<div class="timer__days"><strong class="text-accent">%D</strong> <span>(дни)</span></div>'
			+ '<div class="timer__item"><div class="timer__digit">%H</div><div class="timer__descr">Часы</div></div>'
			+ '<div class="timer__item"><div class="timer__digit">%M</div><div class="timer__descr">Минуты</div></div>'
			+ '<div class="timer__item"><div class="timer__digit">%S</div><div class="timer__descr">Секунды</div></div>'));
	});

	/* Sidebar inner menu toggle */
	$('#btn-sidebar').on("click", function(e){
		$(this).next('ul').toggle();
		$(this).next('ul').toggleClass('open');
		$(this).parent('.btn-group').toggleClass('open');
		e.stopPropagation();
		e.preventDefault();
	});

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

	// Hide sidebar menu
	function hideSidebarMenu() {
		if (window.matchMedia("(max-width: 767px)").matches) {
			var btnSidebar = $('#btn-sidebar');
				btnSidebar.next('ul').hide();
				btnSidebar.next('ul').removeClass('open');
				btnSidebar.parent('.btn-group').removeClass('open');
		}
	}

	// StickyFooter
	function StickyFooter() {
		var footerHeight = $('.footer').outerHeight(true);
		$('.wrapper').css('paddingBottom', footerHeight);
	}
	// On resize
	$(window).resize(function(){
		hideSidebarMenu();
		StickyFooter();
	});
	// On start
	hideSidebarMenu();
	StickyFooter();

	// Update sticky footer when open Bootstrap collapsable menus
	$('#sidebar-collapse').on('shown.bs.collapse', function () {
		StickyFooter();
	})

});