$(function() {

// Carousels init

$('.gifts-slider').owlCarousel({
    loop:true,
    margin:30,
    loop: true,
    dots:false,
    nav:true,
    autoplay: true,
    autoplayTimeout: 3000,
    navText : ['<div class="arrow-left-image"></div>','<div class="arrow-left-image"></div>'],
    navContainer: '#gifts-slideshow',
    responsive:{
        0:{
            items:1
        },
        450:{
            items:2
        },
        768:{
            items:3
        },
        1000:{
            items:4
        }
    }
})
$(".products-slider").owlCarousel({
	items : 1,
	singleItem:true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    nav:true,
    navText : ['<div class="arrow-left-image"></div>','<div class="arrow-left-image"></div>'],
 });

$(".partners-slider").owlCarousel({
    items : 1,
    singleItem:true,
    loop: true,
    dots: true,
    autoHeight:true,
    nav:true,
 });

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 700, "easeInOutExpo");
        return false;
      }
    }
});

});


