document.addEventListener("DOMContentLoaded", function(event) {
/**
 * Window onscroll events
 */
window.addEventListener('scroll', scrollFunction)
function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.querySelector(".page-header").classList.add('fixed')
  } else {
    document.querySelector(".page-header").classList.remove('fixed')
  }
} 
/**
 * TogglePanels function by redrobot753 
 */
togglePanels(".topnav", ".js-menu-toggle", "active")
togglePanels(".search-block", ".js-search-toggle", "active")

function togglePanels(panelSelector, openSelector, activeClass) {

  var panel = document.querySelector(panelSelector)
  var openTrigger = document.querySelectorAll(openSelector)
  var toggleClass = activeClass
  var panelIsOpen = false

  function togglePanel(el) {
    if (el.target.closest(panelSelector)&&!el.target.matches(openSelector)) return
    if (!panelIsOpen) {
      panelIsOpen = true
      var id = setInterval(function () {
        window.addEventListener('click', togglePanel)
        clearInterval(id)
      }, 100);
    } else {
      panelIsOpen = false
      window.removeEventListener("click", togglePanel)
    }       
    panel.classList.toggle(toggleClass)
    openTrigger[0].classList.toggle(toggleClass)
  }

  for (var j = 0; j < openTrigger.length; j++) {
    openTrigger[j].addEventListener("click", togglePanel)
  }
}
/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}
/*
** Accordion
*/
initAccordion();
function initAccordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active")
      if (this.previousElementSibling !== null) {
        this.previousElementSibling.classList.toggle("active");
      }
      var panel = this.nextElementSibling
      
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null
        panel.style.visibility = 'hidden'
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.visibility = 'visible'
      }
    });
  }
}
/*
** Focus search field
*/
var searchInput = document.querySelectorAll('input[type="search"]')

for (var i = 0; i < searchInput.length; i++) {

  searchInput[i].addEventListener("focus", function() {
    this.closest('.search').classList.add('focused');
  }, true);

  searchInput[i].addEventListener("blur", function() {
    this.closest('.search').classList.remove('focused');
  }, true);

}


/*
** Object fit polyfill init
*/ 
objectFitImages();
/*
** Custom select init
*/
initCustomSelect();
function initCustomSelect() {
var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select")
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0]
  a = document.createElement("DIV")
  a.setAttribute("class", "select-selected")
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
  x[i].appendChild(a)
  b = document.createElement("DIV")
  b.setAttribute("class", "select-items select-hide")
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV")
    c.innerHTML = selElmnt.options[j].innerHTML
    c.addEventListener("click", function(e) {
        var y, i, k, s, h
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i
            h.innerHTML = this.innerHTML
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class")
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      e.stopPropagation()
      closeAllSelect(this)
      this.nextSibling.classList.toggle("select-hide")
      this.classList.toggle("select-arrow-active")
    });
}
document.addEventListener("click", closeAllSelect)
function closeAllSelect(elmnt) {
  var x, y, i, arrNo = []
  x = document.getElementsByClassName("select-items")
  y = document.getElementsByClassName("select-selected")
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
}
/*
** Star rating click
*/
initRating()
function initRating() {
  var $stars = document.querySelectorAll('.post__rate .rating-wrap .stars li')
  var $score = document.querySelector('.post__rate .rating-wrap .score')

  for (i = 0; i < $stars.length; i++) {
    $stars[i].addEventListener('click', function () {
      this.classList.add('active')
      $score.textContent = this.getAttribute('title')
      var sibEls = getAllSiblings(this)
      for (j = 0; j < sibEls.length; j++) {
        sibEls[j].classList.remove('active')
      }
    })
  }
}
function getAllSiblings(elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;
  var skipMe = elem;
  for ( ; sibling; sibling = sibling.nextSibling ) 
    if ( sibling.nodeType == 1 && sibling != elem )
      siblings.push( sibling )
  return siblings;
}
/*
** Smooth scroll init
*/
var scroll = new SmoothScroll('[data-scroll]')

});// end


