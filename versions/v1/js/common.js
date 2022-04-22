$(function() {
	// On load
	var hash = window.location.hash.substr(1),
			param = window.location.search.substr(1);

	$("#about, #skills, #work, #contact").hide();
	$(".sections_top").addClass("sections_top-js");
	$(".header__arrow").hide();
	$(".to-top").hide();
	$(".footer").addClass("footer_fixed");
	$("#russian").removeClass("tooltip");

	if (hash == "about" || hash == "skills" || hash == "work" || hash == "contact") {
		$("header").hide();
		$("#" + hash).show();
		$(".nav__link[href='#" + hash + "']").addClass("active");
		$(".nav__wrapper").show();
		$(".footer").addClass("footer_internal");
	}

	// Tabs
	$(".nav__link, .header-list__link").click(function(e){
		var sid = $(this).attr("href");
		$(".sections").hide();
		$(".nav__link").removeClass("active");
		$(sid).show();
		$(".nav__link[href='" + sid + "']").addClass("active");
		// If click to the main page
		if ($(this).attr("href") != "#header") {
			$(".nav__wrapper").show();
			$(".footer").addClass("footer_internal");
		} else {
			e.stopPropagation();
			e.preventDefault();
			//window.location.hash = "";
			history.pushState("", document.title, window.location.pathname + window.location.search);
			$(".nav__wrapper").hide();
			$(".footer").removeClass("footer_internal");
		}
	});

	// Click on links in Work section
	$(".work__link").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		window.location.hash = "#contact";
		$("#subject").val( $(this).attr("data-value") );
		$(".sections").hide();
		$(".nav__link").removeClass("active");
		$("#contact").show();
		$(".nav__link[href='#contact']").addClass("active");
		//console.log($(this).text());
	});



	//-__________ SWITCH LANGUAGE __________ -//

	function changeLanguage(){
		$.getJSON( "lng/russian-lng.json", function( json ) {
			// Menu
			$(".nav__link[href='#header']").text( json.menu.header );
			$(".nav__link[href='#about']").text( json.menu.about );
			$(".nav__link[href='#skills']").text( json.menu.skills );
			$(".nav__link[href='#work']").text( json.menu.work );
			$(".nav__link[href='#contact']").text( json.menu.contact );
			// Header menu
			$(".header-list__link[href='#about']").text( json.header_menu.about );
			$(".header-list__link[href='#skills']").text( json.header_menu.skills );
			$(".header-list__link[href='#work']").text( json.header_menu.work );
			$(".header-list__link[href='#contact']").text( json.header_menu.contact );
			// About section
			$(".about__wrapper h3:eq(0)").text( json.about_section.heading_1 );
			$(".about__wrapper p:eq(0)").text( json.about_section.paragraph_1 );
			$(".about__wrapper p:eq(1)").text( json.about_section.paragraph_2 );
			$(".about__wrapper h3:eq(1)").text( json.about_section.heading_2 );
			$(".about__wrapper p:eq(2)").text( json.about_section.paragraph_3 );
			$(".about__wrapper p:eq(3)").text( json.about_section.paragraph_4 );
			// Skills section
			$("#skills h3").first().text( json.skills_section.heading_1 );
			$("#skills h4:eq(0)>span").text( json.skills_section.skill_heading_1 );
			$("#skills h4:eq(1)>span").text( json.skills_section.skill_heading_2 );
			$("#skills h4:eq(2)>span").text( json.skills_section.skill_heading_3 );
			$("#skills h4:eq(3)>span").text( json.skills_section.skill_heading_4 );
			$("#skills .skills__item:eq(17)").text( json.skills_section.skill_1 );
			$("#skills .skills__item:eq(18)").text( json.skills_section.skill_2 );
			$("#skills .skills__item:eq(19)").text( json.skills_section.skill_3 );
			$("#skills .resume-text").html( json.skills_section.resume_text );
			// Work section
			$("#work h3").first().text( json.work_section.heading_1 );
			$("#work p:eq(0)").text( json.work_section.paragraph_1 );
			$("#work p:eq(1)").text( json.work_section.paragraph_2 );
			$("#work h4:eq(0)").text( json.work_section.heading_2 );
			$("#work .work__link:eq(0)").text( json.work_section.work_link_1 );
			$("#work .work__link:eq(1)").text( json.work_section.work_link_2 );
			$("#work .work__link:eq(2)").text( json.work_section.work_link_3 );
			$("#work .work__link:eq(3)").text( json.work_section.work_link_4 );
			$("#work .work__link:eq(4)").text( json.work_section.work_link_5 );
			$("#work .work__link:eq(0)").attr("data-value", json.work_section.link_data_1 );
			$("#work .work__link:eq(1)").attr("data-value", json.work_section.link_data_2 );
			$("#work .work__link:eq(2)").attr("data-value", json.work_section.link_data_3 );
			$("#work .work__link:eq(3)").attr("data-value", json.work_section.link_data_4 );
			$("#work .work__link:eq(4)").attr("data-value", json.work_section.link_data_5 );
			$("#work h4:eq(1)").text( json.work_section.heading_3 );
			$("#work p:eq(2)").text( json.work_section.paragraph_3 );
			// $("#work .examples__link:first-child span").text( json.work_section.examples_link_1 );
			// $("#work .examples__link:last-child span").text( json.work_section.examples_link_2 );
			// Contact section
			$("#contact h3").first().text( json.contact_section.heading_1 );
			$("#contact #name").attr("placeholder", json.contact_section.placeholder_1 );
			$("#contact #email").attr("placeholder", json.contact_section.placeholder_2 );
			$("#contact #subject").attr("placeholder", json.contact_section.placeholder_3 );
			$("#contact #message").attr("placeholder", json.contact_section.placeholder_4 );
			$("#contact .button_contact").text( json.contact_section.submit );
			$("#contact .contact-info__text").text( json.contact_section.more_info );
		});
	}
	// Change current links
	function changeCurrent() {
		$(".current-lang").remove();
		$(".lang").append("<a id='english' class='footer__link' href='#'> English</a>");
		$("#russian").remove();
		$(".lang").prepend("<span class='current-lang'>Русский</span>");
	}
	// Get parameters
	function getParameter(paramName) {
		var searchString = window.location.search.substring(1),
				i, val, params = searchString.split("&");

		for (i=0;i<params.length;i++) {
			val = params[i].split("=");
			if (val[0] == paramName) {
				return val[1];
			}
		}
		return null;
	}
		// Get Cookie
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
						c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
				}
		}
		return "";
	}
	// Set cookie
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	//
	if ( getParameter("lang") == "en" && getCookie("language") == "russian" ) {
		document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.history.replaceState(null, null, window.location.pathname + window.location.hash);
		//location.reload(true);
	}
	// Check cookie on load
	if ( getCookie("language") == "russian" ) {
		changeLanguage();
		changeCurrent();
		window.history.replaceState(null, null, window.location.pathname + "?lang=ru" + window.location.hash);
	}
	// Check params on load
	if ( getParameter("lang") == "ru" && getCookie("language") != "russian" ) {
		changeLanguage();
		changeCurrent();
		setCookie("language","russian",3666);
	}
	// Click on Russian
	$("#russian").click(function(e){
		e.stopPropagation();
		e.preventDefault();
		// 
		changeLanguage();
		// Set cookie
		setCookie("language","russian",3666);
		// Change current links
		changeCurrent();
		// Add lang paremeter
		window.history.replaceState(null, null, window.location.pathname + "?lang=ru" + window.location.hash);
	});
	// Click on English
	$(".lang").on("click", "#english", function(e){
		e.stopPropagation();
		e.preventDefault();
		// Remove cookie
		document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		//window.history.pushState({}, document.title, window.location.pathname);
		window.history.replaceState(null, null, window.location.pathname + window.location.hash);
		//location.reload();
		//location.href = location.pathname;
		location.reload(true); // true - Reloads the current page from the server. Need for avoid the Firefox problem
	});


	//-__________ CONTACT INFO __________ -//
	$(".contact-info__content").hide();
	$(".contact-info__text").click(function(){
		$(".contact-info__content").fadeToggle(100);
	});

	//-__________ FRAME __________ -//

	$(".open-frame").click(function(e){
		if (!window.matchMedia("(max-width: 1024px)").matches) {
			var src = $(this).attr("href");
			e.stopPropagation();
			e.preventDefault();
			window.open('frame.html?src=' + src, '_blank');
			// console.log(src);
		}
	});

	//-__________ MODAL __________ -//

	var modal = ".modal";
		// Open modal
	function OpenModal(link){
		$(modal).addClass("modal_visible");
		$(modal).append("<img class='modal__img' src='" + link + "'>");
		$("body").css("overflow-y", "hidden");
		$(modal).scrollTop(0);
	}
	// Close modal
	function CloseModal(){
		$(modal).removeClass("modal_visible");
		$(".modal__img").remove();
		$("body").css("overflow-y", "visible");
	}
	// Show a modal window when click on a link
	$(".examples__img-link").click(function(e){
		var link = $(this).attr("href");
		e.stopPropagation();
		e.preventDefault();
		OpenModal(link);
	})
	// When clich on modal overlay
	$(modal).click(function(e){
		if ( !$(e.target).hasClass(".modal__img") ) {
			if($(e.target).closest('.modal__img').length) return;
		}
		CloseModal();
	})
	// Close modal when Esc pressed
	$(document).bind('keydown', function(e) { 
		if (e.which == 27) {
			if ( $(modal).hasClass("modal_visible") ) {
				CloseModal();
			}
		}
	}); 

	//-__________ SELECTABLE ITEMS __________ -//

	$(".contact-info__item").on('mouseup', function() {
		var sel, range;
		var el = $(this)[0];
		if (window.getSelection && document.createRange) { //Browser compatibility
			sel = window.getSelection();
			if(sel.toString() == ''){ //no text selection
				window.setTimeout(function(){
					range = document.createRange(); //range object
					range.selectNodeContents(el); //sets Range
					sel.removeAllRanges(); //remove all ranges from selection
					sel.addRange(range);//add Range to a Selection.
				},1);
			}
		}else if (document.selection) { //older ie
			sel = document.selection.createRange();
			if(sel.text == ''){ //no text selection
					range = document.body.createTextRange();//Creates TextRange object
					range.moveToElementText(el);//sets Range
					range.select(); //make selection.
			}
		}
	});

	//-__________ PRELOADER __________ -//

	function onLoad(loading, loaded) {
			if (document.readyState === 'complete') {
					return loaded();
			} 
			loading();

			if (window.addEventListener) {
					window.addEventListener('load', loaded, false);
			} else if (window.attachEvent) {
					window.attachEvent('onload', loaded);
			}
	}

	onLoad(function() {
			//console.log('I am waiting for the page to be loaded');
	}, function() {
			//console.log('The page is loaded');
			$("#preloader").fadeOut(100);
	});

	// $(window).on('load', function() {
	// 	$("#preloader").fadeOut(100);
	// })

});