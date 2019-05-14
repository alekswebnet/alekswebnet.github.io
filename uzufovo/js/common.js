$(function() {

// Carousels init

$('.portfolio-slider').owlCarousel({
    items : 1,
    singleItem: true,
    autoHeight: true,
    nav: true,
    dots: true,
    loop: true,
    navText : ['<div class="arrow-left-image"></div>','<div class="arrow-right-image"></div>'],
    navContainer: '#portfolio-slider',
})

$(".news-slider").owlCarousel({
	items : 1,
	singleItem: true,
	autoHeight: true,
    dots: false,
    loop: true,
    nav: true,
    navText : ['<div class="arrow-left-image"></div>','<div class="arrow-right-image"></div>'],
 });

$('.partners-slider').owlCarousel({
    items : 1,
    loop: true,
    dots:false,
    nav:true,
    navText : ['<div class="arrow-left-image"></div>','<div class="arrow-right-image"></div>'],
    navContainer: '',
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

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1500, "easeInOutExpo");
        return false;
      }
    }
});

// Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: '.portfolio-box',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
    enabled: true,
    navigateByImgClick: true,
    preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  // Email send

  $(document).ready(function() {

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Спасибо за заявку!");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

});


});
