// Pjax links init https://github.com/MoOx/pjax

var pjax = new Pjax({
  elements: "a", // default is "a[href], form[action]"
  selectors: ["title", "meta[name=description]", ".page-wrapper"]
});

// Reinit common scripts after pjax success

document.addEventListener("pjax:success", function () {
  initCommonScripts();
  document.getElementsByTagName('html')[0].classList.remove('slideout-open');
});

// Common scripts init

initCommonScripts();
function initCommonScripts() {

var menu =  document.getElementById('navbar-top');
var callBottom = document.getElementById('call-bottom');
var closeBtn = document.getElementById('top-close');
var callBtn = document.getElementById('callme');
var dropDownBtn = document.getElementById('dropBtn');
var dropDown = document.getElementById('dropdown');
var offCanvOvrl = document.getElementById('top-nav');
var offCanvMenu = document.getElementById('menu');
var offCanvBtn = document.getElementById('main-menu-toggle');

// Main menu

function closeElement(element, className) {
  element.classList.remove(className);
}

closeBtn.onclick = function() {
  callBottom.classList.toggle('top-hide');
  callBtn.innerHTML = 'Перезвонить вам?';
};
callBtn.onclick = function(e) {
  if (callBottom.classList.contains('top-hide')) {
    e.preventDefault();
    callBottom.classList.toggle('top-hide');
    callBtn.innerHTML = 'Перезвоните мне';
  } 
}

// Slideout offcanvas menu init https://github.com/Mango/slideout

var slideout = new Slideout({
    'panel': document.getElementById('main'),
    'menu': document.getElementById('top-nav'),
    'padding': 256,
    'tolerance': 10,
    'touch': false,
    'duration': 200,
    'easing': 'cubic-bezier(.32,2,.55,.27)'
  });

document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
  slideout.toggle();
});
document.querySelector('.slideout-close-btn').addEventListener('click', function() {
  slideout.toggle();
});

function closeSlideout(eve) {
  eve.preventDefault();
  slideout.close();
}

slideout
  .on('beforeopen', function() {
    this.panel.classList.add('panel-open');
  })
  .on('open', function() {
    this.panel.addEventListener('click', closeSlideout);
  })
  .on('beforeclose', function() {
    this.panel.classList.remove('panel-open');
    this.panel.removeEventListener('click', closeSlideout);
  });


// Sticky header

var siteHeaderWrapper = document.getElementsByClassName('site-header__wrapper')[0];

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    siteHeaderWrapper.classList.add('sticky-header');
    callBottom.classList.add('visually-hidden');
  } else {
    siteHeaderWrapper.classList.remove('sticky-header');
    callBottom.classList.remove('visually-hidden');
  }
}

// Add current year to footer

var currDate = new Date();
var currYear = currDate.getFullYear();
  if (currYear != 2018) {
    document.getElementById("current-year").innerHTML = ' ' + '-' + ' ' + currYear;
}

// Mask for inputs

document.querySelectorAll('.input-phone').forEach(function(el) {
  el.onfocus = function() {
    console.log('ok');
    
  };
  el.onblur = function() {
    console.log('ok');
    
  };
  new Cleave(el, {
    prefix: '+38',
    numericOnly: true,
    delimiters: ['(', ')','-','-'],
    blocks: [3, 3, 0, 3, 2, 2],
    delimiterLazyShow: true,
    noImmediatePrefix: true,
  })
});


// Single page logic

var pages = document.getElementsByClassName('main-content');
   
    for (var i = 0; i < pages.length; i++) {
     if (pages[i].classList.contains('home-page')) {

      // About us counters

      var counterOptions = {
        useEasing : true,
        useGrouping : true,
        separator : '',
        decimal : '.',
        prefix : '',
        suffix : ''
      };

      var counterYears = new CountUp("counter-years", 0, 5, 0, 7, counterOptions);
      var counterMonths = new CountUp("counter-months", 0, 6, 0, 7, counterOptions);
      var counterClients = new CountUp("counter-clients", 0, 277, 0, 7, counterOptions);
      var counterLines = document.querySelectorAll('.counter-wrap-bg');

      var waypoint = new Waypoint({
        element: document.getElementById('counters'),
        handler: function(direction) {
        for (var i = 0; i < counterLines.length; i++) {
          counterLines[i].classList.add('animate-counters');
        }
          counterYears.start();
          counterMonths.start();
          counterClients.start();
        },
        offset: '90%'
      })
    }

    if (pages[i].classList.contains('home-page') || pages[i].classList.contains('repair-page') || pages[i].classList.contains('exchange-page') || pages[i].classList.contains('buy-page') || pages[i].classList.contains('catalog-page')) {

    // Modals

    var modal = document.querySelector(".modal");
    var modalTrigger = document.querySelectorAll(".js-open-modal");
    var modalCloseButton = document.querySelector(".modal-close");

    var priceModal = document.querySelector(".price-modal");
    var priceModalTrigger = document.querySelector(".js-open-price-modal");
    var priceModalCloseButton = document.querySelector(".price-modal-close");

        function toggleModal() {
            modal.classList.toggle("show-modal");
        }
        function togglePriceModal() {
            priceModal.classList.toggle("show-modal");
        }

        function windowOnClick(event) {
            if (event.target === modal || event.target === priceModal) {
                if (modal.classList.contains('show-modal')) {
                  toggleModal();
                }
                else {
                  togglePriceModal();
                }
            }
        }
    for (var j = 0; j < modalTrigger.length; j++) {
      modalTrigger[j].addEventListener("click", toggleModal);
    }  
    modalCloseButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
    }

    if (pages[i].classList.contains('catalog-page')) {

    var modalBtnArr = document.querySelectorAll('.btn-buy-tech');
    var orderNameContainer = document.getElementsByClassName('order-name')[0];
    var orderPriceContainer = document.getElementsByClassName('order-price')[0];

    for (j = 0; j < modalBtnArr.length; j++) {
      modalBtnArr[j].addEventListener("click", function() {
        var orderPrice = this.parentNode.firstElementChild;
        var orderParent = this.closest('.tech-item__desc');
        orderNameContainer.textContent = orderParent.querySelector('.tech-item__mark').textContent + ' ' + orderParent.querySelector('.tech-item__model').textContent;
        orderPriceContainer.textContent = orderPrice.textContent;
      });
    }

    var specMoreButtons = document.querySelectorAll('.btn-spec-more');

     for (j = 0; j < specMoreButtons.length; j++) {
      specMoreButtons[j].addEventListener("click", function() {
        var techItemSpecMain = this.previousElementSibling;
        var specMore = techItemSpecMain.querySelector('.spec-more');
        specMore.classList.toggle('show');
      });
    }

     var sidebar = new StickySidebar('#sidebarBlock', {
       topSpacing: 100,
       bottomSpacing: 0,
       containerSelector: false,
       innerWrapperSelector: '.tech-categories',
       resizeSensor: true,
       stickyClass: 'is-affixed',
       minWidth: 0
      });

      document.querySelector(".tech-categories__header").addEventListener("click", function() {
      document.querySelector(".tech-categories__inputs").classList.toggle("show")
      })

    }

    if (pages[i].classList.contains('repair-page')) {

    // Price modal

    priceModalTrigger.addEventListener("click", togglePriceModal);
    priceModalCloseButton.addEventListener("click", togglePriceModal);

      // Text slider

      var nextBtn = document.querySelector(".modal-next");
      var txtSlides = document.querySelectorAll(".text-slide");
      nextBtn.addEventListener("click", function()
      {

        for(var i = 0; i < txtSlides.length; i++)
        {
          if (txtSlides[i].classList.contains("active-slide"))
          {
            txtSlides[i].classList.remove("active-slide");
            if (i < txtSlides.length - 1)
            {
              txtSlides[i + 1].classList.add("active-slide");
            }
            else
            {
              txtSlides[0].classList.add("active-slide");
            }
            break;
          }
        }
      });
      
      // Accordions

      var accordions = document.getElementsByClassName("accordion");

      for (i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight){
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } 
        });
      }
    }

    
  }

  // Photo galleries

  var photoGalleries = document.getElementsByClassName('photo-gallery');

  for (i = 0; i < photoGalleries.length; i++) {
    lightGallery(photoGalleries[i]),{
      preload: 2
    };
  }


} // end init function