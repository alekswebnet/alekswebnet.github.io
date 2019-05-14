// Mobile menu

var menuToggle = document.querySelector(".mob-menu-toggle");
var menu = document.querySelector(".top-nav");

menuToggle.addEventListener("click", toggleMenu);

function toggleMenu() {
	menu.classList.toggle("menu-show");
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("lp-header").classList.add('shrink');
  } else {
    document.getElementById("lp-header").classList.remove('shrink');
  }
} 

// Tabs

function openTab(evt, tabName) {

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("prices-table__col");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
} 

// Modals

var modal = document.querySelector(".modal");
var modalTrigger = document.querySelectorAll(".js-open-modal");

var thanksModal = document.querySelector(".thanks-modal");
var thanksModalTrigger = document.querySelector(".js-open-thanks-modal");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    function toggleThanksModal() {
        thanksModal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal || event.target === thanksModal) {
            if (modal.classList.contains('show-modal')) {
              toggleModal();
            }
            else {
              toggleThanksModal();
            }
        }
    }
for (var j = 0; j < modalTrigger.length; j++) {
  modalTrigger[j].addEventListener("click", toggleModal);
}
for (var i = 0; i < thanksModalTrigger.length; i++) {
  thanksModalTrigger[i].addEventListener("click", toggleThanksModal);
} 
window.addEventListener("click", windowOnClick);

// Scrol to acnchor fix
var headerHeight = document.getElementById('lp-header').offsetHeight;
(function(document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);

  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 90,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function() {
      this.scrollToCurrent();
      window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
      document.body.addEventListener('click', this.delegateAnchors.bind(this));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function() {
      return this.OFFSET_HEIGHT_PX;
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function(href, pushToHistory) {
      var match, rect, anchorOffset;

      if(!this.ANCHOR_REGEX.test(href)) {
        return false;
      }

      match = document.getElementById(href.slice(1));

      if(match) {
        rect = match.getBoundingClientRect();
        anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
        window.scrollTo(window.pageXOffset, anchorOffset);

        // Add the state to history as-per normal anchor links
        if(HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function() {
      this.scrollIfAnchor(window.location.hash);
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function(e) {
      var elem = e.target;

      if(
        elem.nodeName === 'A' &&
        this.scrollIfAnchor(elem.getAttribute('href'), true)
      ) {
        e.preventDefault();
      }
    }
  };

  window.addEventListener(
    'DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls)
  );
})(window.document, window.history, window.location);