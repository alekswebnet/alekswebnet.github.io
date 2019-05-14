$(function() {

	// Slick init

	$(document).ready(function(){
	  $('.header-slider').slick({
	    arrows: true,
	    dots: true,
	    autoplay: true,
  		autoplaySpeed: 3000,
  		nextArrow: '<i class="fa fa-chevron-right"></i>',
 		prevArrow: '<i class="fa fa-chevron-left"></i>',
	  });
	});

});
