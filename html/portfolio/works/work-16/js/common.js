$(function() {

	// Удаляем style тег, котоый скрывает левые полоски при активации плагина для скроллбара в секции калькулятор
	setTimeout(function(){
		$('#nicescroll-visibility').remove();
	}, 2000);

	/**
	 * Variables
	 */

	var animationSpeed = 150;
	var animationSpeedModal = 100;
	var phoneLengthLimit = 18;

	/**
	 * Phone mask
	 */

	// var mask = new IMask(element, maskOptions);
	$(".phone-mask").each(function(i, el) {
		new IMask(this, {
			mask: '+{7} (000) 000-00-00',
		});
	});

	/**
	 * Header Menu animation
	 */

	$('.header-menu').hide().css('visibility', 'visible');

	$('#mmenu-open').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.header-menu').show("slide", { direction: "right" }, animationSpeed); 
		// $('body').css('overflow', 'hidden');
		$('body').addClass('modal-open');
	});

	$('#mmenu-close').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.header-menu').hide("slide", { direction: "right" }, animationSpeed); 
		// $('body').css('overflow', '');
		$('body').removeClass('modal-open');
	});

	/**
	 * Header boxes animation
	 */

	$('.header-box').click(function(e) {
		if (window.matchMedia("(max-width: 767px)").matches) {
			e.stopPropagation();
			e.preventDefault();
			$(this).children('.header-box__bottom').slideToggle(animationSpeed);
			$(this).children('.header-box__top').toggleClass('opened');
		}
	});

	/**
	 * Read more button
	 */

	$('.read-more-show').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).addClass('hide');
		$(this).parent().children('.read-more-dots').addClass('hide');
		$(this).parent().children('.read-more-content').show();
	});


	/**
	 * Fixed Menu
	 */

	var lastScrollTop = 0;

	$(window).scroll(function () {
		var nav = $('.header-top');
		var navHeight = $('.header-top').height();
		var windowHeight = $(window).height();
		var scrollTop = $(this).scrollTop();
		var headerTop = $(this).scrollTop();

		if (scrollTop > navHeight) {
			$('.header').css('paddingTop', navHeight);
			nav.addClass('fixed');
		} else {
			$('.header').css('paddingTop', 0);
			nav.removeClass('fixed');
		}

		if (scrollTop > lastScrollTop){
			// console.log('down');
			nav.removeClass('showed');
		} else {
			// console.log('up');
			if (scrollTop > windowHeight) {
				nav.addClass('showed');
			}
		}
		lastScrollTop = scrollTop;
	});

	/**
	 * Slick slider for Workers section
	*/

	$('.workers-items').slick({
		arrows: true,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1,
		// draggable: false,
		responsive: [
			{
				breakpoint: 992,
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
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});

	/**
	 * Slick slider for Reviews section
	*/

	$('.reviews-items').slick({
		arrows: true,
		infinite: true,
		speed: 400,
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0',
		dots: true,
		dotsClass: 'custom_paging',
		customPaging: function (slider, i) {
			return  (i + 1) + ' из ' + slider.slideCount;
		},
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	});

	/**
	 * WhatWeDo section tabs
	*/

	$('.whatwedo-tab-link').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		var target = $(this).data('target');

		if (window.matchMedia("(min-width: 768px)").matches) {

			if ( $(this).hasClass('active') == false ) {

				$('.whatwedo-tab').fadeOut(animationSpeed);
				setTimeout(function() {
					$(target).fadeIn(animationSpeed);
				}, animationSpeed);

				$('.whatwedo-tab-link').removeClass('active');
				$(this).addClass('active');

			}

		} else {

			$(target).slideToggle(animationSpeed);
			$(this).toggleClass('mobile-active');

		}

	});

	/**
	 * Projects section adaptation
	 */

	function adaptProjectsToMobile() {

		length = $('.projects__tab').length;

		for (var i = 0; i <= length; i++) {
			var content = $('.projects__content:eq(' + i + ')').clone();
			content.removeClass('projects__content').addClass('projects__content-mobile');
			$('.projects__tab:eq(' + i + ')').after(content);
		}

	}

	/**
	 * Projects section animation
	*/

	$('.projects__tab').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		var targetNum = $(this).index('.projects__tab');

		if (window.matchMedia("(min-width: 768px)").matches) {

			if ( $(this).hasClass('active') == false ) {

				$('.projects__content').fadeOut(animationSpeed);
				setTimeout(function() {
					$('.projects__content:eq(' + targetNum + ')').fadeIn(animationSpeed);
				}, animationSpeed);

				$('.projects__tab').removeClass('active');
				$(this).addClass('active');

			}

		} else {

			if ( $(this).hasClass('active') ) {

				$(this).next().hide();
				$(this).removeClass('active');

			} else {

				$('.projects__content-mobile').hide();
				$('.projects__tab').removeClass('active');
				$(this).next().slideDown(10, function() {
					$([document.documentElement, document.body]).animate({
						scrollTop: $(this).offset().top - 200
					}, animationSpeed);
				});
				$(this).addClass('active');

			}

		}

	});

	/**
	 * Stylize select boxes
	 */

	$('.calc-form select').selectBoxIt();

	$('.calc-form .selectboxit-list').niceScroll({
		cursorwidth: 30,
		// cursoropacitymin: 1,
		cursorcolor: '#7394B3',
		background: '#D8E0EA',
		cursorborder: 'none',
		cursorborderradius: 0,
		autohidemode: 'false',
		// railoffset: { top: 0, left: 0, right: 0, bottom: 18 },
		// railpadding: { top: 0, right: 0, left: 0, bottom: 18 },
	});

	/**
	 * Calculator
	 */

	// Отключаем некоторые поля, исходя из номера опции выбранной в выподающем меню
	// Сначала обработываем отдельные события, потом общие. Иначе атрибуты изменяться после всех подсчетов.
	$('.calc-form select[name="calc-walls"]').on('change', function() {
		if ( $(this).prop('selectedIndex') == 0 || $(this).prop('selectedIndex') == 1 || $(this).prop('selectedIndex') == 2) {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).attr('disabled', '');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').addClass('sb-disabled');
		} else {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).removeAttr('disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').removeClass('sb-disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
				$(this).data("selectBox-selectBoxIt").enable();
			});
		}
	});
	$('.calc-form select[name="calc-roof"]').on('change', function() {
		if ( $(this).prop('selectedIndex') == 0 || $(this).prop('selectedIndex') == 1 || $(this).prop('selectedIndex') == 2) {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).attr('disabled', '');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').addClass('sb-disabled');
		} else {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).removeAttr('disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').removeClass('sb-disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
				$(this).data("selectBox-selectBoxIt").enable();
			});
		}
	});
	$('.calc-form select[name="calc-carcass"]').on('change', function() {
		if ( $(this).prop('selectedIndex') == 0 ) {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).attr('disabled', '');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').addClass('sb-disabled');
			// Если вдруг нужно их обнулить
			// $(this).parents('.calc-form__input-group-col').find('select').not(this).val('0');
			// $(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
			// 	$(this).data("selectBox-selectBoxIt").selectOption(0);
			// });
		} else {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).removeAttr('disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').removeClass('sb-disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
				$(this).data("selectBox-selectBoxIt").enable();
			});
		}
	});
	$('.calc-form select[name="calc-gate"]').on('change', function() {
		if ( $(this).prop('selectedIndex') == 0 ) {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).attr('disabled', '');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').addClass('sb-disabled');
			// Если вдруг нужно их обнулить
			// $(this).parents('.calc-form__input-group-col').find('select').not(this).val('0');
			// $(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
			// 	$(this).data("selectBox-selectBoxIt").selectOption(0);
			// });
		} else {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).removeAttr('disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').removeClass('sb-disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
				$(this).data("selectBox-selectBoxIt").enable();
			});
		}
	});
	$('.calc-form select[name="calc-window"]').on('change', function() {
		if ( $(this).prop('selectedIndex') == 0 ) {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).attr('disabled', '');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').addClass('sb-disabled');
			// Если вдруг нужно их обнулить
			// $(this).parents('.calc-form__input-group-col').find('select').not(this).val('0');
			// $(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
			// 	$(this).data("selectBox-selectBoxIt").selectOption(0);
			// });
		} else {
			$(this).parents('.calc-form__input-group-col').find('select').not(this).removeAttr('disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).parent().find('.selectboxit-btn').removeClass('sb-disabled');
			$(this).parents('.calc-form__input-group-col').find('select').not(this).each(function(index, el) {
				$(this).data("selectBox-selectBoxIt").enable();
			});
		}
	});


	// Отслеживаем все действия над нужными полями.
	$('.calc-form select:not([name="calc-type"],[name="calc-purpose"]), .calc-form input[type="number"], .calc-form input[name="calc-checkbox-4"]').on('change', function() {

		var cval = $('select[name="calc-carcass"]').val();
		var clval = $('select[name="calc-carcass-length"]').val();
		var cwval = $('select[name="calc-carcass-width"]').val();

		// Пока не выбран каркас, длина и ширина
		if ( cval != 0 && cval && clval && clval > 0 && cwval && cwval > 0 ) {
			var cResult = calculate();
			$('input[name="calc-total-cost"]').val( cResult );
			$('.calc-form__cost').html( cResult + ' <span>рублей *</span>' );
		} else {
			$('input[name="calc-total-cost"]').val( '0' );
			$('.calc-form__cost').html( '0 <span>рублей *</span>' );
		}

	});

	function calculate() {
		// Каркас
		var cCarcassLength = parseFloat( $('select[name="calc-carcass-length"]').val() );
		if ( !cCarcassLength || cCarcassLength < 0 ) cCarcassLength = 0;
		var cCarcassWidth = parseFloat( $('select[name="calc-carcass-width"]').val() );
		if ( !cCarcassWidth || cCarcassWidth < 0 ) cCarcassWidth = 0;
		var cCarcassHeight = parseFloat( $('select[name="calc-carcass-height"]').val() );
		if ( !cCarcassHeight || cCarcassHeight <= 0) cCarcassHeight = 1;
		var cCarcass = parseFloat( $('select[name="calc-carcass"]').val() );
		var cCarcassSum = (cCarcassHeight * 0.06 * cCarcass + cCarcass) * cCarcassLength * cCarcassWidth;

		console.log('Каркас:' + cCarcass + ', Д:' + cCarcassLength + ', Ш:' + cCarcassWidth + ', В:' + cCarcassHeight + ', Сумма:' + cCarcassSum);

		// Фундамент
		var cFoundation = parseFloat( $('select[name="calc-foundation"]').val() );
		var cFoundationSum = cFoundation * 1500 * cCarcassLength * cCarcassWidth;

		console.log('Фундамент:' + cFoundation + ', Сумма:' + cFoundationSum);

		// Стены
		var cWalls = parseFloat( $('select[name="calc-walls"]').val() );
		var cWallsThickness;
				if ( $('select[name="calc-walls-thickness"]').is(':disabled') ) { cWallsThickness = 1; }
				else { cWallsThickness = parseFloat( $('select[name="calc-walls-thickness"]').val() ); }
		var cWallsSum = (2 * cCarcassLength * cCarcassHeight * cWalls * cWallsThickness) + (2 * cCarcassWidth * cCarcassHeight * cWalls * cWallsThickness);

		console.log('Стены:' + cWalls + ', Т:' + cWallsThickness + ', Сумма:' + cWallsSum);

		// Кровля
		var cRoof = parseFloat( $('select[name="calc-roof"]').val() );
		var cRoofThickness;
				if ( $('select[name="calc-roof-thickness"]').is(':disabled') ) { cRoofThickness = 1; }
				else { cRoofThickness = parseFloat( $('select[name="calc-roof-thickness"]').val() ); }
		var cRoofSum = (2 * cCarcassLength * cCarcassHeight * cRoof * cRoofThickness) + (2 * cCarcassWidth * cCarcassHeight * cRoof * cRoofThickness);

		console.log('Кровля:' + cRoof + ', Т:' + cRoofThickness + ', Сумма:' + cRoofSum);

		// Ворота
		var cGate = parseFloat( $('select[name="calc-gate"]').val() );
		var cGateLength = parseFloat( $('select[name="calc-gate-length"]').val() );
		var cGateHeight = parseFloat( $('select[name="calc-gate-height"]').val() );
		var cGateNumber = parseFloat( $('select[name="calc-gate-number"]').val() );
		var cGateSum = cGate * (cGateLength/100) * (cGateHeight/100) * cGateNumber * 1520;

		console.log('Ворота:' + cGate + ', Ш:' + cGateLength + ', В:' + cGateHeight + ', К:' + cGateNumber + ', Сумма:' + cGateSum);

		// Окна
		var cWindow = parseFloat( $('select[name="calc-window"]').val() );
		var cWindowLength = parseFloat( $('select[name="calc-window-length"]').val() );
		var cWindowHeight = parseFloat( $('select[name="calc-window-height"]').val() );
		var cWindowNumber = parseFloat( $('select[name="calc-window-number"]').val() );
		var cWindowSum = cWindow * (cWindowLength/100) * (cWindowHeight/100) * cWindowNumber * 1520;

		console.log('Окна:' + cWindow + ', Ш:' + cWindowLength + ', В:' + cWindowHeight + ', К:' + cWindowNumber + ', Сумма:' + cWindowSum);

		// Монтаж
		var cInstallationSum = 0;
		if ( $('.calc-form input[name="calc-checkbox-4"]').is(':checked') ) {
			cInstallationSum = (cCarcassSum + cFoundationSum +  cWallsSum + cRoofSum + cGateSum + cWindowSum) * 0.2;
		}
		console.log('Монтаж:' + cInstallationSum);

		// Полная стоимость
		var cTotalCostSum = cCarcassSum + cFoundationSum + cWallsSum + cRoofSum + cGateSum + cWindowSum + cInstallationSum;
		console.log('Полная стоимость:' + cTotalCostSum);

		console.log('---');

		return cTotalCostSum.toFixed(0);
	}

	/**
	 * Modals
	 */

	$('[data-modal]').click(function(e) {
		e.stopPropagation();
		e.preventDefault();

		var modal = $(this).data('modal');

		if ( $(this).data('trigger') == 'no-modal' ) {
			$(modal).addClass('no-modal');
		}

		if ( !$(modal).hasClass('modal-manager-call') ) {
			$(modal).fadeIn(animationSpeedModal);
		} else {
			if (window.matchMedia("(max-width: 576px)").matches) {
				$(modal).show("slide", { direction: "right" }, animationSpeedModal);
				$(modal).addClass('after-menu');
			} else {
				$(modal).fadeIn(animationSpeedModal);
			}
		}

		if ( $(modal).hasClass('modal-save-price') ) {
			$('.modal-full-price input:not([type="checkbox"])').prop('required', false);
			$('.calc-form input[name="calc-which-form"]').val('1');
		}
		if ( $(modal).hasClass('modal-full-price') ) {
			$('.modal-save-price input:not([type="checkbox"])').prop('required', false);
			$('.calc-form input[name="calc-which-form"]').val('2');
		}

		setBodyPaddingForModalWindow();
		// $('body').css('overflow', 'hidden');
	});

	$('.modal').click(function(e) {
		if (window.matchMedia("(min-width: 768px)").matches) {
			if( !$(e.target).closest('.modal-content').length ) {
				$(this).fadeOut(animationSpeedModal);

				if ( !$(this).hasClass('modal-personal-info') ) {
					removeBodyPaddingForModalWindow();
				} else if ( $(this).hasClass('no-modal') ) {
					removeBodyPaddingForModalWindow();
					$('.modal-personal-info').removeClass('no-modal');
				}
			}
		}
		if( !$(e.target).closest('.modal-content').length ) {
			$('.modal-full-price input:not([type="checkbox"])').prop('required', true);
			$('.modal-save-price input:not([type="checkbox"])').prop('required', true);
			$('.calc-form input[name="calc-which-form"]').val('0');
		}
	});

	$('.modal-close').click(function(e) {
		if ( !$(this).parent().parent().hasClass('after-menu') ) {
			$(this).parent().parent().fadeOut(animationSpeedModal);
		} else {
			$(this).parent().parent().hide("slide", { direction: "right" }, animationSpeedModal);
			$(modal).removeClass('after-menu');
			return;
		}

		if ( !$(this).parent().parent().hasClass('modal-personal-info') ) {
			removeBodyPaddingForModalWindow();
		} else if ( $(this).parent().parent().hasClass('no-modal') ) {
			removeBodyPaddingForModalWindow();
			$('.modal-personal-info').removeClass('no-modal');
		}

		$('.modal-full-price input:not([type="checkbox"])').prop('required', true);
		$('.modal-save-price input:not([type="checkbox"])').prop('required', true);
		$('.calc-form input[name="calc-which-form"]').val('0');
	});

	function setBodyPaddingForModalWindow() {
		$('body').css({
			paddingRight: getScrollbarWidth() + 'px',
			overflow: 'hidden'
		});
	}
	function removeBodyPaddingForModalWindow() {
		$('body').css({
			paddingRight: '',
			overflow: ''
		});
	}

	// Вычисляем ширину скроллбара
	function getScrollbarWidth() {
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

		document.body.appendChild(outer);

		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";

		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);

		var widthWithScroll = inner.offsetWidth;

		// remove divs
		outer.parentNode.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	}

	/**
	 * Проверка на полноту введенного номера телефона
	 */

	$('.phone-mask').on('input', function() {
		var phoneLength = $(this).val().length;
		// console.log( phoneLength );
		if (phoneLength >= phoneLengthLimit) {
			if ( $(this).closest('.modal').hasClass('modal-send-price') || $(this).closest('.modal').hasClass('modal-save-price') || $(this).closest('.modal').hasClass('modal-catalog-e') || $(this).closest('.modal').hasClass('modal-catalog-paper') ) {
				if ( $(this).parent().parent().find('input[type="checkbox"]').is(':checked') ) {
					$(this).parent().parent().find('.btn').removeAttr('disabled');
				}
				return;
			}
			$(this).parent().parent().find('.btn').removeAttr('disabled');
		} else {
			$(this).parent().parent().find('.btn').attr('disabled', '');
		}
	});

	/**
	 * Проверки на чекбоксы e-mail и whatsapp
	 */

	$('.modal-send-price .modal-checkbox label, .modal-save-price .modal-checkbox label').mouseup(function(e) {
		var phoneLength = $(this).parent().parent().find('.phone-mask').val().length;

		if ( $(this).index() == 2 ) {
			if ( !$(this).prev().is(':checked') ) {
				$(this).parent().prev().find('input').prop('required', true);
			} else {
				$(this).parent().prev().find('input').prop('required', false);
			}
		}
		if ( $(this).index() == 4 ) {
			if ( !$(this).prev().is(':checked') ) {
				$(this).parent().prev().prev().find('input').prop('required', true);
			} else {
				$(this).parent().prev().prev().find('input').prop('required', false);
			}
		}
		// Блокировка кнопки
		if ( $(this).index() == 2 ) {
			if ( $(this).prev().is(':checked') && !$(this).parent().children('input:eq(1)').is(':checked') ) {
				$(this).parent().next().prop('disabled', true);
			} else if ( phoneLength >= phoneLengthLimit ) {
				$(this).parent().next().prop('disabled', false);
			}
		}
		if ( $(this).index() == 4 ) {
			if ( $(this).prev().is(':checked') && !$(this).parent().children('input:eq(0)').is(':checked') ) {
				$(this).parent().next().prop('disabled', true);
			} else if ( phoneLength >= phoneLengthLimit ) {
				$(this).parent().next().prop('disabled', false);
			}
		}

	});
	$('.modal-catalog-e .modal-checkbox label').mouseup(function(e) {
		var phoneLength = $(this).parent().parent().find('.phone-mask').val().length;

		if ( $(this).index() == 4 ) {
			if ( !$(this).prev().is(':checked') ) {
				$(this).parent().prev().find('input').prop('required', true);
			} else {
				$(this).parent().prev().find('input').prop('required', false);
			}
		}
		if ( $(this).index() == 2 ) {
			if ( !$(this).prev().is(':checked') ) {
				$(this).parent().prev().prev().find('input').prop('required', true);
			} else {
				$(this).parent().prev().prev().find('input').prop('required', false);
			}
		}
		// Блокировка кнопки
		if ( $(this).index() == 4 ) {
			if ( $(this).prev().is(':checked') && !$(this).parent().children('input:eq(0)').is(':checked') ) {
				$(this).parent().next().prop('disabled', true);
			} else if ( phoneLength >= phoneLengthLimit ) {
				$(this).parent().next().prop('disabled', false);
			}
		}
		if ( $(this).index() == 2 ) {
			if ( $(this).prev().is(':checked') && !$(this).parent().children('input:eq(1)').is(':checked') ) {
				$(this).parent().next().prop('disabled', true);
			} else if ( phoneLength >= phoneLengthLimit ) {
				$(this).parent().next().prop('disabled', false);
			}
		}
	});
	$('.modal-catalog-paper .modal-checkbox label').mouseup(function(e) {
		var phoneLength = $(this).parent().parent().find('.phone-mask').val().length;

		// Блокировка кнопки
		if ( !$(this).parent().children('input:eq(0)').is(':checked') && !$(this).parent().children('input:eq(1)').is(':checked') && phoneLength >= phoneLengthLimit ) {
			$(this).parent().next().prop('disabled', false);
		} else if ( $(this).parent().children('input:eq(0)').is(':checked') ^ $(this).parent().children('input:eq(1)').is(':checked') && $(this).prev().is(':checked') ) {
			$(this).parent().next().prop('disabled', true);
		}
	});

	/**
	 * Smooth scroll
	 */

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

			if (window.matchMedia("(max-width: 767px)").matches) {
				$('.header-menu').hide("slide", { direction: "right" }, animationSpeed); 
				// $('body').css('overflow', '');
				$('body').removeClass('modal-open');
			}

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 120
				}, 600);
				return false;
			}
		}
	});

	/**
	 * On resize
	 */

	$(window).resize(function(){

		// Reset WhatWeDo section tabs when resize
		if (window.matchMedia("(min-width: 768px)").matches) {
			$('.whatwedo-tab').css('display', '');
			$('.whatwedo-tab-link').removeClass('mobile-active');
		}

		// Reset Projects section animation tabs when resize
		if (window.matchMedia("(min-width: 768px)").matches) {
			var targetNum = $('.projects__tab.active').index('.projects__tab');
			if ( targetNum == -1 ) { targetNum = 0; }
			$('.projects__content').hide();
			$('.projects__content:eq(' + targetNum + ')').show();
			// Если вдруг все табы закрыты, открываем первый
			if ( !$('.projects__tab').hasClass('active') ) {
				$('.projects__tab:eq(0)').addClass('active');
			}
		} else {
			$('.projects__content-mobile').hide();
			$('.projects__tab.active').next().show();
		}

	});

	/**
	 * On Start
	 */

	adaptProjectsToMobile();
	// Сворачиваю все табы на мал.экранах
	if (window.matchMedia("(max-width: 767px)").matches) {
		$('.projects__tab').removeClass('active');
	}

});

/**
 * Google Map
 */

function init() {

	//replace this variable with the json you generate in the google maps api wizard tool
	//Styles Start
	var styles = [ { } ];

	//Styles End
	//Create a styled map using the above styles
	var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"}); 

	var mapProp = { 
		center: new google.maps.LatLng(45.1325862, 41.9857718),//set the centre of the map. In my case it is the same as the position of the map pin.
		zoom: 16,
		disableDefaultUI: true,
		// zoomControl: true,
		// mapTypeControl: false,
		// scaleControl: false,
		// streetViewControl: false,
		// rotateControl: false,
		// fullscreenControl: true,
		// navigationControl: false,
		scrollwheel: false,
		draggable: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP

		// mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map"),mapProp);

	//Set the map to use the styled map
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	var contentString = '<div id="google-popup">' + '<span class="google-popup-title">Наш офис<span><p>356240, Ставропольский край, г. Михайловск, пер. Некрасова 20, офис 314-316</p>' + '</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	//Create a marker pin to add to the map
	var marker;
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(45.1325862, 41.9857718),//set the position of the pin
		map: map,
		// title: "",
		icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12P4zwAAAgEBAKrChTYAAAAASUVORK5CYII=", //if you comment this out or delete it you will get the default pin icon.
		// animation:google.maps.Animation.DROP
	});

	infowindow.open(map, marker);

}