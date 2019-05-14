/*
**  Slideout menu init. https://github.com/mango/slideout
*/
initSlideout();
function initSlideout() {
  var slideout = new Slideout({
    'panel': document.getElementById('main'),
    'menu': document.getElementById('topNav'),
    'padding': 300,
    'tolerance': 10,
    'touch': false,
    'duration': 200,
    'easing': 'cubic-bezier(.32,2,.55,.27)'
  });

document.querySelector('.menu-toggler').addEventListener('click', function() {
  slideout.toggle();
});
document.querySelector('.slideout-close').addEventListener('click', function() {
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
}
/*
**  Slider init. https://github.com/NickPiscitelli/Glider.js
*/
function sliderInit() {
  new Glider(document.querySelector('.glider'), {
    slidesToShow: 'auto',
    slidesToScroll: '1',
    itemWidth: undefined,
    exactWidth: false,
    duration: .5,
    arrows: {
      prev: '.btn-prew',
      next: '.btn-next'
    },
    draggable: false,
    dragVelocity: 3.3,
    easing: function (x, t, b, c, d) {
      return c*(t/=d)*t + b;
    },
    scrollPropagate: false,
    eventPropagate: false,
    scrollLock: false,
    scrollLockDelay: 250,
    resizeLock: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
    ]
  });
}
/*
**  Accordion
*/
initAccordion();
function initAccordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");

      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      console.log(panel);
      if (panel.classList.contains('d-flex')) {
        panel.classList.remove('d-flex');
      } else {
        panel.classList.add('d-flex');
      }
    });
  }
}
  