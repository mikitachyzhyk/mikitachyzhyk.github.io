$(function() {


	/* Калькулятор */
	/* Калькулятор. Перестройка списка результатов на разрешениях меньше 576px */
	$('.calculator__result-content ul').each(function(i, el) {
		if (i == 0) {
			$('.calculator__result').append("<div class='calculator__result-content calculator__result-content--mobile'></div>");
		}
		$(this).children('li').each(function(i2, el2) {
			if (i == 0) {
				$('.calculator__result-content.calculator__result-content--mobile').append("<ul><li>" + $(this).html() + "</li></ul>");
			} else {
				var index = i2 + 1;
				$('.calculator__result-content.calculator__result-content--mobile ul:nth-child(' + index + ')').append("<li>" + $(this).html() + "</li>");
			}
		});
	});

	/* Калькулятор. Кнопки "По длине" и "По массе" */
	$('.calculator__choise-link--length').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.calculator__choise-link').removeClass('active')
		$(this).addClass('active')
		$('.calculator__input label').each(function(i, el) {
			$(this).text( $(this).next().data('text') );
		});
	});
	$('.calculator__choise-link--weight').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.calculator__choise-link').removeClass('active')
		$(this).addClass('active')
		$('.calculator__input label').each(function(i, el) {
			$(this).text( $(this).next().data('alt-text') );
		});
	});

	/* Калькулятор. Меню */
	$('.calculator__nav a').click(function(e) {
		var linkNum = $(this).data('link'),
				linkk = '.calculator__box--' + linkNum;
		e.stopPropagation();
		e.preventDefault();
		$('.calculator__nav a').removeClass('active');
		$(this).addClass('active');
		$('.calculator__box').removeClass('calculator__box--active');
		$(linkk).addClass('calculator__box--active');
	});


	/* Нажатие на кнопку "Инструкция по работе с калькулятором" */
	$('.calc-instruction__headline').click(function(e) {
		$('.calc-instruction__text').slideToggle(100);
		$(this).toggleClass('calc-instruction__headline--down');
	});

	/* Нажатие на радиобатон на второй странице корзины  */
	$('#radioButton-1').click(function(e) {
		$('.cart-page-delivery__delivery-address').hide();
		$('.cart-page-delivery__pickup').show();
	});
	$('#radioButton-2').click(function(e) {
		$('.cart-page-delivery__pickup').hide();
		$('.cart-page-delivery__delivery-address').show();
	});


	/* Кнопка "Прикрепить реквизиты"" на второй странице корзины */
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});


	/* Удаление товаров в корзине */
	$('.goods-table-close-btn').click(function() {
		$(this).parent().remove();
	});

	/* Нажатие на кнопку "все характеристики" в карточке товара */
	$('.single-product__show-all').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.single-product__table').toggleClass('single-product__table--show-all');
		if ( $('.single-product__table').hasClass('single-product__table--show-all') ) {
			$(this).text( $(this).data('alt-text') );
		} else {
			$(this).text( $(this).data('text') );
		}
	});

	/* Нажатие на мениатюру в карточке товара */
	$('.single-product__small-preview').click(function(e) {
		var srcSmall = $(this).children('img').attr('src'),
				srcMedium = srcSmall.replace('-small', '-medium'),
				srcBig = srcSmall.replace('-small', '-big');
		$('.single-product__small-preview').removeClass('active');
		$(this).addClass('active');
		$('.single-product__big-preview img').attr('src', srcMedium);
		$('.single-product__big-preview a').attr('href', srcBig);
	});

	/* tooltip.js для внутреннего каталога */
	$('.goods-table-col .button').tooltip();

	/* Фильтр. Кнопка фильтр на моб. */
	$('.goods-filter-mbtn').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		// $(this).addClass('active');
		$('.goods-filter').fadeIn(200);
		$('body').css('overflow', 'hidden');
	});
	// Кнопка закрытия внутри окна фильтра
	$('.goods-filter__panel button').click(function(e) {
		// $('.goods-filter-mbtn').removeClass('active');
		$('.goods-filter').fadeOut(100);
		$('body').css('overflow', 'visible');
	});

	/* Сортировка. Выводить по. */
	$('.goods-sort__displayby a').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.goods-sort__displayby a').removeClass('active');
		$(this).addClass('active');
		$(this).parent().next().val( $(this).text() );
	});
	/* Сортировка. Размер */
	$('.goods-sort__size').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		if ( !$(this).hasClass('goods-sort__size--up') ) {
			$(this).addClass('goods-sort__size--up')
			$(this).next().val('up');
		} else {
			$(this).removeClass('goods-sort__size--up')
			$(this).next().val('down');
		}
	});
	/* Сортировка. Цена */
	$('.goods-sort__price').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		if ( !$(this).hasClass('goods-sort__price--up') ) {
			$(this).addClass('goods-sort__price--up')
			$(this).next().val('up');
		} else {
			$(this).removeClass('goods-sort__price--up')
			$(this).next().val('down');
		}
	});

	/* Фильтр. Кнопка сортировки на моб. */
	$('.goods-sort-mbtn').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active');
			$('.goods-sort').slideDown(100);
		} else {
			$(this).removeClass('active');
			$('.goods-sort').slideUp(100);
		}
	});

	/* .goods-catalog-btns__roll - Кнопка свернуть в внутреннем каталоге */
	$('.goods-catalog-btns__roll').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		if ( !$('.goods-catalog-btns__roll').hasClass('goods-catalog-btns__roll--down') ) {
			$('.goods-catalog-more, .goods-discount-more').slideDown(100);
			$('.goods-catalog-btns__roll').text( $('.goods-catalog-btns__roll').data('text-2') );
			$('.goods-catalog-btns__roll').addClass('goods-catalog-btns__roll--down');
		} else {
			$('.goods-catalog-more, .goods-discount-more').slideUp(100);
			$('.goods-catalog-btns__roll').text( $('.goods-catalog-btns__roll').data('text-1') );
			$('.goods-catalog-btns__roll').removeClass('goods-catalog-btns__roll--down');
		}
	});

	/* ==================== CART DROPDOWM ==================== */

	// Load images into Bootstrap Modal
	$('#modal-img').on('show.bs.modal', function (e) {
		$('#imagepreview').attr('src', '');
		$('#imagepreview').attr('src', $(e.relatedTarget).attr('href'));
	})

	/* Cart select dropdown */
	$('.cart-dropdown__select a').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		if( !$(this).next().is(":visible") ) {
			$('.cart-dropdown__select-dropdown').slideUp(100);
			$(this).next().slideDown(100);
		}
	});
	$(window).click(function(e) {
		if( !$(e.target).hasClass('cart-dropdown__select-dropdown') ){
			if($(e.target).closest('.cart-dropdown__select-dropdown').length) return;
			$('.cart-dropdown__select-dropdown').slideUp(100);
		}
	});
	// change values
	$('.cart-dropdown__select-dropdown li').click(function(e) {
		var dvalue = $(this).data('value'),
				dtext = $(this).data('text');
		// Hidden input
		$(this).parent().parent().prev().prev().val(dvalue);
		// Text
		$(this).parent().parent().prev().text(dtext);
		// Close dropdown
		$('.cart-dropdown__select-dropdown').slideUp(100);
	});


	/* Custom Input Number Plugin (https://www.jqueryscript.net/form/Custom-Number-InputSpinner-Plugin-jQuery-number.html) */
	$('.number').each(function () {
		$(this).number();
	});

	/* Cart Dropdown delete item */
	$('.cart-dropdown__close').click(function() {
		$(this).parent().remove();
	});

	/* Cart Dropdown */
	$('.header-bottom__cart-wrap').mouseenter(function() {
		if (window.matchMedia("(min-width: 768px)").matches) {
			if( !$(this).find('.cart-dropdown').is(":visible") ) {
				$('.cart-dropdown').hide();
				$(this).find('.cart-dropdown').slideDown(200);
			}
		}
	});
	$( ".header-bottom__cart-wrap" ).mouseleave(function(e) {
		if (window.matchMedia("(min-width: 768px)").matches) {
			$('.cart-dropdown').slideUp(200);
		}
	});


	/* ==================== CART DROPDOWM END ==================== */


	/* Product Items carousel */
	$('.products-item__headline').click(function(e) {
		if (window.matchMedia("(max-width: 575px)").matches) {
			if( !$(this).next('ul').is(":visible") ) {
				e.stopPropagation();
				e.preventDefault();
				$(this).parent().prev().slideDown(100);
				$(this).next('ul').slideDown(100);
			} else {
				e.stopPropagation();
				e.preventDefault();
				$(this).parent().prev().removeAttr('style');
				$(this).next('ul').removeAttr('style');
			}
		}
	});

	/* Clone items for mobile menu */
	var mSearch = $('.header-top__search').clone(),
			mFixedBtn1 = $('.delivery-flbtn').clone(),
			mFixedBtn2 = $('.calculator-flbtn').clone(),
			mLang = $('.header-top__lang').clone(),
			mEmail = $('.header-top__email').clone(),
			mSchedule = $('.header-top__schedule').clone();

	function cloneItemsForMobileMenu() {
		$('.header-bottom__mmenu-panel').after(mSearch);
		$('.header-bottom__menu').append('<div class="header-bottom__menu-btns-wrap"></div>');
		$('.header-bottom__menu-btns-wrap').append(mFixedBtn1);
		$('.header-bottom__menu-btns-wrap').append(mFixedBtn2);
		$('.header-bottom__menu').append(mLang);
		$('.header-bottom__menu').append(mEmail);
		$('.header-bottom__menu').append(mSchedule);
		// console.log(hSearch);
	}

	/* Mobile menu */
	$('.header-bottom__mmenu-button').click(function(e) {
		$('.header-bottom__menu').fadeIn(200);
		$('body').css('overflow', 'hidden');
		$('.goods-filter').hide();
	});
	$('.header-bottom__mmenu-panel button').click(function(e) {
		$('.header-bottom__menu').fadeOut(200);
		$('body').css('overflow', 'visible');
	});

	// Fixed Menu
	var nav = $('.header-bottom'),
			hheight = $('.header-bottom').height();
	$(window).scroll(function () {
		if (window.matchMedia("(max-width: 767px)").matches) {
			if ($(this).scrollTop() > $('.header-top').height()) {
				nav.addClass("fixed");
			} else {
				nav.removeClass("fixed");
			}
		} else
			if ($(this).scrollTop() > $('.header-top').height()) {
				nav.addClass("fixed");
				$('.header-top').css('marginBottom', hheight);
			} else {
				nav.removeClass("fixed");
				$('.header-top').css('marginBottom', 0);
			}
	});

	/* Dropdown menu */
	$('.header-bottom__menu>ul>li>a').mouseenter(function() {
		if (window.matchMedia("(min-width: 768px)").matches) {
			if( !$(this).next('.header-bottom__dropdown').is(":visible") ) {
				$('.header-bottom__dropdown').hide();
				$(this).next('.header-bottom__dropdown').slideDown(200);
			}
		}
	});
	$( ".header-bottom__menu" ).mouseleave(function() {
		if (window.matchMedia("(min-width: 768px)").matches) {
			$('.header-bottom__dropdown').slideUp(200);
		}
	});

	/* Mobile Dropdown */
	$('.header-bottom__menu ul li a').click(function(e) {
		if (window.matchMedia("(max-width: 767px)").matches) {
			if( $(this).next().hasClass('header-bottom__dropdown') ) {
				
				if( !$(this).next('.header-bottom__dropdown').is(":visible") ) {
					e.stopPropagation();
					e.preventDefault();
					$('.header-bottom__dropdown').hide();
					$(this).next('.header-bottom__dropdown').slideToggle(100);
				} else {
					e.stopPropagation();
					e.preventDefault();
					$('.header-bottom__dropdown').slideUp(100);
				}

			}
		}
	});

	/* Slick */
	$('.often-buy-items').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
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
					slidesToScroll: 1
				}
			}
		]
	});

	$('.goods-about-production-items').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 2,
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
					slidesToScroll: 1
				}
			}
		]
	});


	$('.viewed-items').slick({
		arrows: true,
		infinite: false,
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
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
		// 			slidesToShow: 2,
		// 			slidesToScroll: 1
		// 		}
		// 	},
			{
				breakpoint: 768,
				settings: {
					vertical: true,
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}
		]
	});


	$('.certificates').slick({
		arrows: true,
		infinite: false,
		speed: 400,
		slidesToShow: 6,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 2
				}
			},
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
					slidesToScroll: 1
				}
			}
		]
	});


	/* Partners */
	// Check on load
	if (window.matchMedia("(max-width: 575px)").matches) {
		slickDeactivate();
	} else {
		slickActivate();
	}
	// Check when resize
	$(window).resize(function(){
		if (window.matchMedia("(max-width: 575px)").matches) {
			slickDeactivate();
		} else {
			slickActivate();
		}
	});
	// Slick activate
	function slickActivate() {
		if ( !$('.parnters').hasClass('slick-activated') ) {
			$('.parnters').slick({
				arrows: true,
				infinite: false,
				speed: 400,
				slidesToShow: 6,
				slidesToScroll: 3,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 2
						}
					},
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
					}
				]
			});
			$('.parnters').addClass('slick-activated');
		}
	}
	// Slick deactivate
	function slickDeactivate() {
		if ( $('.parnters').hasClass('slick-activated') ) {
			$('.parnters').slick('unslick');
			// Reload element. Add space between URL and selector.
			$("#parnters").load(location.href + " #parnters>*", "");
		}
	}

	/* Слайдер для страницы внутреннего каталога */
	// Check on load
	if (window.matchMedia("(min-width: 768px)").matches) {
		slickDeactivate2();
	} else {
		slickActivate2();
	}
	// Check when resize
	$(window).resize(function(){
		if (window.matchMedia("(min-width: 768px)").matches) {
			slickDeactivate2();
		} else {
			slickActivate2();
		}
	});
	// Slick activate
	function slickActivate2() {
		if ( !$('.goods-catalog').hasClass('goods-catalog--discount') ) {
			if ( !$('.goods-catalog-items').hasClass('slick-activated') ) {
				$('.goods-catalog-items').slick({
					arrows: true,
					infinite: false,
					speed: 400,
					slidesToShow: 2,
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 526,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
				$('.goods-catalog-items').addClass('slick-activated');
			}
		} else {
			if ( !$('.goods-catalog-items').hasClass('slick-activated') ) {
				$('.goods-catalog-items').slick({
					arrows: true,
					infinite: false,
					speed: 400,
					slidesToShow: 1,
					slidesToScroll: 1,
				});
				$('.goods-catalog-items').addClass('slick-activated');
			}
		}
	}
	// Slick deactivate
	function slickDeactivate2() {
		if ( $('.goods-catalog-items').hasClass('slick-activated') ) {
			$('.goods-catalog-items').removeClass('slick-activated');
			$('.goods-catalog-items').slick('unslick');
			// Reload element. Add space between URL and selector.
			$("#goods-catalog-items").load(location.href + " #goods-catalog-items>*", "");
		}
	}


	$('.best-prices-items').slick({
		arrows: true,
		infinite: false,
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
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// Footer headline carousel
	$('.footer__headline').click(function(e) {
		if (window.matchMedia("(max-width: 575px)").matches) {
			e.stopPropagation();
			e.preventDefault();
			if( !$(this).next('ul').is(":visible") ) {
				$('.footer__headline').next('ul').slideUp(100);
				$(this).next('ul').slideDown(100);
				// setTimeout(StickyFooter, 200);
			}
		}
	});


	// equalheight
	equalheight2 = function(container){
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

	// equalHeights
	function equalCatalogItemHeadlines() {
		$('.catalog-item__headline').equalHeights();
		// $('.manufacturers-item').equalHeights();
	}

	// On resize
	$(window).resize(function(){
		equalCatalogItemHeadlines();
		equalheight2('.manufacturers-item');
		/* для моб. меню */
		if (window.matchMedia("(min-width: 768px)").matches) {
			if ( $('body').css('overflow') == 'hidden' ) {
				$('body').css('overflow', 'visible');
			}
		} else {
			if ( $('.header-bottom__menu').is(':visible') ) {
				$('body').css('overflow', 'hidden');
			}
		}
		/* для фильтра каталога */
		if (window.matchMedia("(min-width: 576px)").matches) {
			if ( $('body').css('overflow') == 'hidden' && !$('.header-bottom__menu').is(':visible') ) {
				$('body').css('overflow', 'visible');
			}
		} else {
			if ( $('.goods-filter').is(':visible') ) {
				$('body').css('overflow', 'hidden');
			}
		}
		/* For Fixed Menu */
		$('.header-top').css('marginBottom', 0);
		/* Секция "Наша продукция" */
		if (window.matchMedia("(min-width: 576px)").matches) {
			$('.products-item__img').show();
			$('.products-item__content ul').show();
		}
	});

	// On start
	cloneItemsForMobileMenu();
	equalCatalogItemHeadlines();
	equalheight2('.manufacturers-item');


});