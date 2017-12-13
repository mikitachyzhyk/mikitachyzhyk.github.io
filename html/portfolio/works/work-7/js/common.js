/* LOAD YouTube video */

var youtubeContainer = 'player';

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// For more information
// https://developers.google.com/youtube/player_parameters?hl=ru#Parameters
var playerDefaults = {
	autoplay: 1, // 0 - disable autoplay
	autohide: 1, //parameter, which indicates whether the player's video controls will automatically hide after a video begins playing.
	//loop: 1, // infinite playing .works only if there is playlist parameter
	modestbranding: 1, // disable logo YouTube on contol panel
	rel: 0, // disable ralative videos
	showinfo: 0, // disable information about video (title, etc.)
	controls: 0, // disable controls
	disablekb: 1, // disable keyboard
	enablejsapi: 0, // 0 - default (API Javascript)
	iv_load_policy: 3 // disable annotations
};

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player(youtubeContainer, {
		// height: '360',
		// width: '640',
		// videoId: 'R7QnAYeZGwcC',
		videoId: 'R7QnAYeZGwc',
		// videoId: 'qs66U8P1vco',
		playerVars: playerDefaults,
		// suggestedQuality: 'hd1080', //- NOT WORKING
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
	// Set quality. THE RIGHT WAY! Part 1 of 2
	// event.target.setPlaybackQuality('hd1080');
	// Play video (ALSO WORKS ON MOBILE AND TABLETS)
	event.target.playVideo();
	// Disable sound
	player.mute();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
	// Set quality. THE RIGHT WAY! Part 2 of 2
	// if (event.data == YT.PlayerState.BUFFERING) {
	// 	event.target.setPlaybackQuality('hd1080');
	// }
	// if (event.data == YT.PlayerState.PLAYING && !done) {
	// 	setTimeout(stopVideo, 6000);
	// 	done = true;
	// }
	// Show youtubeContainer when video starts playing
	if (event.data == YT.PlayerState.PLAYING) {
		document.getElementById(youtubeContainer).style.display = "block";
	}
	// Replay the video when it ends (instead of loop)
	if (event.data === YT.PlayerState.ENDED) {
		player.playVideo(); 
	}
}
// function stopVideo() {
// 	player.stopVideo();
// }

/* LOAD YouTube video END */

$(document).ready(function(){

	//Smooth scroll
	$('.head-section__triangle').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 600);
				return false;
			}
		}
	});

	// Remove active class from accordion
	$('.sidebar-accordion .panel a').click(function() {
		var id = $(this).attr('href'),
				panels = $('.sidebar-accordion .panel');
		if ( $(id).hasClass('in') ) {
			panels.removeClass('active');
		} else {
			panels.removeClass('active');
			$(id).parent('.panel').addClass('active');
		}
	});

	// Swipe for Bootstrap carousel
	$("#carousel-reviews").swipe({
		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');
		},
		allowPageScroll:"vertical"
	});

	/* Slick */
	$('.carousel-letters').slick({
		arrows: true,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 590,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('.carousel-partners').slick({
		arrows: true,
		infinite: true,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 590,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$(".carousel-letters__link").click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('#imagepreview').attr('src', $(this).attr('href'));
		$('#modal-img').modal('show');
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