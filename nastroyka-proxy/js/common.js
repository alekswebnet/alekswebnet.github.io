// Slideout offcanvas menu init https://github.com/Mango/slideout
var slideout = new Slideout({
    'panel': document.getElementById('main'),
    'menu': document.getElementById('top-nav'),
    'padding': 270,
    'tolerance': 10,
    'touch': false,
    'duration': 200,
    'easing': 'cubic-bezier(.32,2,.55,.27)'
  });

document.querySelector('.main-menu__btn').addEventListener('click', function() {
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
// Change select color
var selects = document.querySelectorAll('.select-css');
for (var i = 0; i < selects.length; i++) {
	selects[i].addEventListener("change", function() {
		this.style.color = "white";
	})
}

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
    var accordionClose = panel.children[1];
    accordionClose.addEventListener("click", function() {
    	panel.style.maxHeight = null;
    	panel.previousElementSibling.classList.remove("active");
    })
  });
}

/*// Video controls
var ppbutton = document.getElementsByClassName("about-video__btn")[0];
ppbutton.addEventListener("click", playPause);
myVideo = document.getElementsByClassName("about-video")[0];
function playPause() { 
  if (myVideo.paused) {
    myVideo.play();
  }
  else  {
    myVideo.pause(); 
  }
}*/

// Tabs
tabBtns = document.getElementsByClassName("tabs__link");
tabBtns[0].classList.add('active');
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs__content"); 
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tabs__link");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
