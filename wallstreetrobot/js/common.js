 // Animation lcenses counter

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

//Number counter

var numberFromCookie = getCookie('number'),
    number = 9;

if (typeof(numberFromCookie) !== 'undefined') {
    number = parseInt(numberFromCookie);
}

var myCountDown = function() {
    var $counterElement = $(this),
        originalNumber = parseInt($counterElement.text()),
        number = originalNumber;

    if (typeof(numberFromCookie) !== 'undefined') {
        number = parseInt(numberFromCookie);
    }

    $counterElement.text(number);

    var counterInterval = setInterval(function() {
        var number = parseInt($counterElement.text());

        if (number === 2) {
            clearInterval(counterInterval);
            return;
        }
        $('.licenses-counter').addClass('scale');
        $('.licenses-counter-bg').addClass('rotate');
        setTimeout(function () {
            $('.licenses-counter').removeClass('scale');
            $('.licenses-counter-bg').removeClass('rotate');
        }, 1000);
        number = number - 1;

        setCookie("number", number, {'expires': 360000000});
        $counterElement.text(number);

    }, 10 * 1000); // 10 sec
};

$('.licenses-counter').each(myCountDown);

 // Toogle text

 $('#toogle-text').click(function(){
    $('.hidden-text').slideToggle(250);
    $(".btn-angle").toggleClass("btn-angle-anim")
    return false;
});

 // Calculator

  function declension(num, expressions) {
    var result, count = num % 100;
    if (count >= 5 && count <= 21) {
      result = expressions['2'];
    } else {
      count = count % 10;
      if (count == 1) {
        result = expressions['0'];
      } else if (count >= 2 && count <= 4) {
        result = expressions['1'];
      } else {
        result = expressions['2'];
      }
    }
    return result;
  }

  var hourValue = 0, daysValue = 0, depositValue = 0, feeValue = 0, rateValue = 0;
  function totalPrice(){
    var total = ((depositValue*0.2*hourValue*daysValue)+(depositValue*0.2*hourValue*daysValue)*feeValue/100);
    $('.js_total_sum').html(total.toFixed());
  }

  function rangeHourFunc(data) {
    hourValue = data;
    $('.js_hour_value').val(data);
    var hourTxt = declension(data, [$('.js_hour_txt').data('s1'),$('.js_hour_txt').data('s2'),$('.js_hour_txt').data('s3')]);
    $('.js_hour_txt').html(hourTxt);
    resizeInput();
    totalPrice();
  }
  var rangeHour = $(".range_hour");
  rangeHour.ionRangeSlider({
    min: 1,
    max: 12,
    from: 1,
    grid_num: 11,
    hide_min_max: true,
    hide_from_to: true,
    grid: true,
    onStart: function(data){
      rangeHourFunc(data.from);
    },
    onChange: function(data){
      rangeHourFunc(data.from);
    },
  });
  var rangeHourSlider = rangeHour.data("ionRangeSlider");

  function rangeDaysFunc(data) {
    daysValue = data;
    $('.js_days_value').val(data);
    var daysTxt = declension(data, [$('.js_days_txt').data('s1'),$('.js_days_txt').data('s2'),$('.js_days_txt').data('s3')]);
    $('.js_days_txt').html(daysTxt);
    resizeInput();
    totalPrice();
  }
  var rangeDays = $(".range_days");
  rangeDays.ionRangeSlider({
    min: 1,
    max: 24,
    from: 22,
    grid_num: 11,
    hide_min_max: true,
    hide_from_to: true,
    grid: true,
    onStart: function(data){
      rangeDaysFunc(data.from);
    },
     onChange: function(data){
      rangeDaysFunc(data.from);
    },
  });
  var rangeDaysSlider = rangeDays.data("ionRangeSlider");

  function rangeDepositFunc(data) {
    depositValue = data;
    console.log(data);
    rateValue = data * 0.05;
    rateValue = rateValue.toFixed(2);
    $('.js_deposit_value').val(data);
    $('.js_deposit_txt').html(data);
    $('.js_rate_value').html(rateValue);
    resizeInput();
    totalPrice();
  }
  var rangeDeposit = $(".range_deposit");
  rangeDeposit.ionRangeSlider({
    min: 250,
    max: 1750,
    from: 250,
    step: 1,
    grid_num: 6,
    hide_min_max: true,
    hide_from_to: true,
    grid: true,
    onStart: function(data){
      rangeDepositFunc(data.from);
    },
    onChange: function(data){
      rangeDepositFunc(data.from);
    },
  });
  var rangeDepositSlider = rangeDeposit.data("ionRangeSlider");

  function rangeFeeFunc(data) {
    feeValue = data;
    $('.js_fee_value').val(data);
    resizeInput();
    totalPrice();
  }
  var rangeFee = $(".range_fee");
  rangeFee.ionRangeSlider({
    min: 60,
    max: 90,
    from: 80,
    step: 1,
    grid_num: 3,
    hide_min_max: true,
    hide_from_to: true,
    grid: true,
    onStart: function(data){
      rangeFeeFunc(data.from);
    },
    onChange: function(data){
      rangeFeeFunc(data.from);
    },
  });
  var rangeFeeSlider = rangeFee.data("ionRangeSlider");
  totalPrice();

  function resizeInput() {
    $('input.value').each(function(){
      if($(this).val().length === 0){
        $(this).css('width', (($(this).val().length + 1) * 10) + 'px');
      }else{
        $(this).css('width', ($(this).val().length * 10) + 'px');
      }
    });
  }

// Sliders

$(document).ready(function(){
    $('.t-slider').slick({
      arrows: true,
      dots: true,
      mobileFirst: true,
      fade: true,
      speed: 200,
      infinite: false,
      nextArrow: '<div class="next-icon"></div>',
      prevArrow: '<div class="prew-icon"></div>',
    });
  });


$(".t-slider").on("init", function(event, slick){
    $(".count-prew").text(parseInt(slick.currentSlide ) + '`');
    $('.count-prew').addClass('hide');
    $('.prew-icon').addClass('hide');
});
$(".t-slider").on("init", function(event, slick){
    $(".count-next").text(parseInt(slick.currentSlide + 2) + '`');
});

$(".t-slider").on("afterChange", function(event, slick, currentSlide){
    if (parseInt(slick.currentSlide ) == 0) {
      $('.count-prew').addClass('hide');
      $('.prew-icon').addClass('hide');
    }
    else {
      $('.count-prew').removeClass('hide');
      $('.prew-icon').removeClass('hide');
    }
    if (parseInt(slick.currentSlide ) == 4) {
       $('.count-next').addClass('hide');
      $('.next-icon').addClass('hide');
    }
    else {
      $('.count-next').removeClass('hide');
      $('.next-icon').removeClass('hide');
    }
    $(".count-prew").text(parseInt(slick.currentSlide) + '`');
});
$(".t-slider").on("afterChange", function(event, slick, currentSlide){
    $(".count-next").text(parseInt(slick.currentSlide + 2) + '`');
});


// Cards change

$('.slide-button1').addClass('active');
$('.slide-button1').click(function() {
  $('#card_1').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('first-card');
  $('#card_2').removeClass('first-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('second-card');
  $('#card_3').removeClass('first-card').removeClass('second-card').removeClass('fourth-card').removeClass('five-card').addClass('third-card');
  $('#card_4').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('five-card').addClass('fourth-card');
  $('#card_5').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').addClass('five-card');
  $('.faq-slide-num').text('1');
  $('.faq-slide-header').text('How actually the trading system “Wall Street” can help me?');
  $('.faq-slide-text').text('This system is the algorithm that monitors and copies only successful trading operations of top traders from Wall Street. The trading robot makes deals even when you sleep, increasing your income when you’re doing what you want. The average profit from these trades is more than 76%. Thus, just by using our system you can increase your trading income.')
  $('.slide-button').removeClass('active')
  $(this).addClass('active');
});
$('.slide-button2').click(function() {
  $('#card_2').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('first-card');
  $('#card_3').removeClass('first-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('second-card');
  $('#card_4').removeClass('first-card').removeClass('second-card').removeClass('fourth-card').removeClass('five-card').addClass('third-card');
  $('#card_5').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('five-card').addClass('fourth-card');
  $('#card_1').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').addClass('five-card');
  $('.faq-slide-num').text('2');
  $('.faq-slide-header').text('What special is it about your trading system?');
  $('.faq-slide-text').text('Our system was developed by a team of professional traders, analysts and other people who know how to earn big sums of money via trading. They were able to create a unique mechanism which isn’t just an ordinary trading robot – it makes the same deals as real successful traders from Wall Street. This system has no competitors in area of trading and you don’t have to waste your time – this robot is fully automated.')
  $('.slide-button').removeClass('active')
  $(this).addClass('active');
});
$('.slide-button3').click(function() {
  $('#card_1').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('five-card').addClass('fourth-card');
  $('#card_2').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').addClass('five-card');
  $('#card_3').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('first-card');
  $('#card_4').removeClass('first-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('second-card');
  $('#card_5').removeClass('first-card').removeClass('second-card').removeClass('fourth-card').removeClass('five-card').addClass('third-card');
  $('.faq-slide-num').text('3');
  $('.faq-slide-header').text('What is the guarantee that I receive my money?');
  $('.faq-slide-text').text('Reputation is everything for us. Moreover, we cooperate with many collateral service providers. Such a cooperation also adds responsibility to our activity. When your deal is successful and you earn money, this capital is available for withdrawal as soon as it gets to your account. After that you can withdraw it using our partner services. The process takes only 40 minutes and you can chose one of the following services: PayPal, Visa, MasterCard, etc.')
  $('.slide-button').removeClass('active')
  $(this).addClass('active');
});
$('.slide-button4').click(function() {
  $('#card_1').removeClass('first-card').removeClass('second-card').removeClass('fourth-card').removeClass('five-card').addClass('third-card');
  $('#card_2').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('five-card').addClass('fourth-card');
  $('#card_3').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').addClass('five-card');
  $('#card_4').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('first-card');
  $('#card_5').removeClass('first-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('second-card');
  $('.faq-slide-num').text('4');
  $('.faq-slide-header').text('Is this system for professionals or a novice can use it as well?');
  $('.faq-slide-text').text('Our trading robot was created for people of different knowledge and experience. It has the algorithm which is easy to operate when making deals. Moreover, the whole system is automated and you don’t spend your time monitoring and performing direct trading. The trading system “Wall Street” is for ones who want to become rich while enjoying their lives.')
  $('.slide-button').removeClass('active')
  $(this).addClass('active');
});
$('.slide-button5').click(function() {
  $('#card_1').removeClass('first-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('second-card');
  $('#card_2').removeClass('first-card').removeClass('second-card').removeClass('fourth-card').removeClass('five-card').addClass('third-card');
  $('#card_3').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('five-card').addClass('fourth-card');
  $('#card_4').removeClass('first-card').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').addClass('five-card');
  $('#card_5').removeClass('second-card').removeClass('third-card').removeClass('fourth-card').removeClass('five-card').addClass('first-card');
  $('.faq-slide-num').text('5');
  $('.faq-slide-header').text('Why do you provide us this effective system?');
  $('.faq-slide-text').text('We see our mission in helping people to become successful and rich persons. Both sides of this bargain win: you earn your money, we spread our popularity and creditability among traders all over the world. Our company has agreements with several collateral companies-providers of services so when they’re get paid we get money as well in terms of partnership.')
  $('.slide-button').removeClass('active')
  $(this).addClass('active');
});


// Custom popups

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }



function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function() {
    if (copy.length < 1) { copy = array.slice(0); }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

var chooser = randomNoRepeats(['Jacob','Emily','Michael','Emma','Joshua','Madison','Matthew','Olivia','Ethan','Hannah','Andrew','Abigail','Daniel','Isabella','William','Ashley','Joseph','Samantha','Christopher','Elizabeth','Anthony','Alexis','Ryan','Sarah','Nicholas','Grace','David','Alyssa','Alexander','Sophia','Tyler','Lauren','James','Brianna','John','Kayla','Dylan','Natalie','Nathan','Anna','Jonathan','Jessica','Brandon','Taylor','Samuel','Chloe','Christian','Hailey','Benjamin','Ava','Zachary','Jasmine','Logan','Sydney','Jose','Victoria','Noah','Ella','Justin','Mia','Elijah','Morgan','Gabriel','Julia','Caleb','Kaitlyn','Kevin','Rachel','Austin','Katherine','Robert','Megan','Thomas','Alexandra','Connor','Jennifer','Evan','Destiny','Aidan','Allison','Jack','Savannah','Luke','Haley','Jordan','Mackenzie','Angel','Brooke','Isaiah','Maria','Isaac','Nicole','Jason','Makayla','Jackson','Trinity','Hunter','Kylie','Cameron','Kaylee','Gavin','Paige','Mason','Lily','Aaron','Faith','Juan','Zoe','Kyle','Stephanie','Charles','Jenna','Luis','Irea','Adam','Riley','Brian','Katelyn','Aiden','Angelina','Eric','Kimberly','Jayden','Madeline','Alex','Mary','Bryan','Leah','Sean','Lillian','Owen','Michelle','Lucas','Amia','Nathaniel','Sara','Ian','Sofia','Jesus','Jordan','Carlos','Alexa','Adrian','Rebecca','Diego','Gabrielle','Julian','Caroline','Cole','Vanessa','Ashton','Gabriella','Steven','Avery','Jeremiah','Marissa','Timothy','Ariana','Chase','Audrey','Devin','Jada','Seth','Autumn','Jaden','Evelyn','Colin','Jocelyn','Cody','Maya','Landon','Arianna','Carter','Isabel','Hayden','Amber','Xavier','Melanie','Wyatt','Diana','Dominic','Danielle','Richard','Sierra','Antonio','Leslie','Jesse','Aaliyah','Blake','Erin','Sebastian','Amelia','Miguel','Molly','Jake','Claire','Alejandro','Bailey','Patrick','Melissa']);
// повтор чере 10сек

var timerId = setInterval(function() {
  var randomEarn = randomInteger(500, 5000);
  $('.earn').text(randomEarn);
  $('.msg-earn-name').text(chooser());
  $('.msg-earn').fadeIn('1000');
  setTimeout(function(){ $('.msg-earn').fadeOut('slow'); }, 3000);
}, 10000);

// через 10мин остановить повторы

setTimeout(function() {
  clearInterval(timerId);
}, 600000);

// Phone numbers

$("#field-phone").intlTelInput({
  initialCountry: "auto",
  utilsScript: "../libs/intl-tel-input-12.2.0/build/js/utils.js",
  geoIpLookup: function(callback) {
    $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      callback(countryCode);
    });
  },
});

// Scroll to anchore

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 700);
});

// Scroll with input focus

$(document).on('click', 'a[href="#start-free-right"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 700);
    $('#field-name').focus();
});