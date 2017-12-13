$(function() {

	var thumb = $('.thumb'),
			view = $('.view'),
			modal = $('.modal');

	thumb.click(function(e){
		var src = $(this).children('img').attr('src'), 
				dataLink = $(this).data('link');
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		// Change image in the view
		$(this).parent().parent().next().find('img').attr('src', src );
		// Change image in the view link
		src = src.replace('small', 'medium')
		$(this).parent().parent().next().find('a.view').attr('href', src );
		// Change image in the big image button
		src = src.replace('medium', 'big')
		$(this).parent().parent().next().find('a.button').first().attr('href', src );
		// Set link
		$(this).parent().parent().next().find('a.button').eq(1).attr('href', dataLink );
		e.stopPropagation();
		e.preventDefault();
	});

	view.click(function(e) {
		modal.addClass('show');
		modal.find('img').attr( 'src', $(this).attr('href') );
		$("body").css("overflow-y", "hidden");
		$(modal).scrollTop(0);
		e.stopPropagation();
		e.preventDefault();
	});

	modal.click(function(e) {
		if ( !$(e.target).hasClass(".modal__img") ) {
			if($(e.target).closest('.modal__img').length) return;
		}
		$('.modal__img').attr('src', '#');
		modal.removeClass('show');
		$("body").css("overflow-y", "visible");
		e.stopPropagation();
		e.preventDefault();
	});

	// Press Escape
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { // escape key maps to keycode `27`
			if ($('.modal').is(':visible')) {
				$('.modal__img').attr('src', '#');
				modal.removeClass('show');
				$("body").css("overflow-y", "visible");
			}
		}
	});

	/* FRAME */
	$(".open-frame").click(function(e){
		if (!window.matchMedia("(max-width: 1024px)").matches) {
			var src = $(this).attr("href");
			e.stopPropagation();
			e.preventDefault();
			window.open('frame.html?src=' + src, '_blank');
			// console.log(src);
		}
	});

});