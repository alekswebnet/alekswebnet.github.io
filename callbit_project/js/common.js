$(function() {

// Navbar shrink
$(window).scroll(function() {
  if ($(document).scrollTop() > 30) {
    $('.main-header').addClass('shrink');
  } else {
    $('.main-header').removeClass('shrink');
  }
});

// Menu scroll to

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top-73
    }, 1000);
    return false;
});

});
