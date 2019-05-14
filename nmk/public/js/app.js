$(function() {

	//for ie8
    var alertFallback = false;
    if (typeof console === "undefined" || typeof console.log === "undefined") {
        console = {};
        if (alertFallback) {
            console.log = function(msg) {
                alert(msg);
            };
        } else {
            console.log = function() {};
        }
    }

    $.itexUp({
        elementID: 'up', //ID элемента
        showButtonHeight: 300, //Высота прокрутки в пикселя, когда появляется кнопка
        speed: 1000 //Скорость прокрутки в милисекундах
    });

    $('table').wrap('<div class="table-responsive">');
});


$(document).ready(function() {
	$('.hrefpop').fancybox();
	
    $('.navN .firstpage').attr('title', 'На первую');
    $('.navN .lastpage').attr('title', 'На последнюю');
	$('.navN .nextpage').attr('title', 'На следущую');
	$('.navN .prevpage').attr('title', 'На предыдущую');

	// img alt fix
	$('img').each(function(){
		if (!$(this).attr('alt')) { $(this).attr('alt',""); }
	});

});

// Carousel home page
$('.carousel-item:first-of-type').addClass('active');
$('.carousel').carousel({
    pause: true,
    interval: false
});


// Tap on category image event 
// Add "on('touchstart click')" to click support

$('.production-item img').on('touchstart', function(e){
    e.stopPropagation(); e.preventDefault();
    var parent = $(this).parent();
    var anyItem = $('.production-item');
    if (parent.hasClass('shows')) {
        parent.removeClass('shows');
    } else {
        anyItem.removeClass('shows');
        parent.addClass('shows');   
    }
});
// Search dropdown

$('.search-btn').click(function() {
    $('.search-dropdown').toggleClass('shows');
    $('.search-dropdown input').focus();
    $('.search-icon').toggleClass('hide');
    $('.search-close').toggleClass('shows');
});

// News gallery

$(".gallery-news__item").fancybox();

//  Products subcategory nav

$('.current-categ').click(function() {
    $(this).css('display', 'none');
    $('.categ-menu').css('display', 'block');
});

var tapped = false;
var link = $(".categ-menu__link");
var href = $(link).attr('href');

link.on("click", function(e){
    th = $(this);
    if(!tapped){
      tapped=setTimeout(function(){
          single_tap(th);
          tapped = null;
      },300); //wait 300ms
    } else {
      clearTimeout(tapped);
      tapped = null;
      double_tap(th);
    }
    e.preventDefault();
});

function single_tap(th){
    $(th).next().slideToggle(100);
    $(th).toggleClass('menu-link--active');
};
function double_tap(th){
    location.href = $(th).attr('href');

};

// Custom select

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});