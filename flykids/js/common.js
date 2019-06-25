document.addEventListener("DOMContentLoaded", function(event) {
/*
** Vue.js init
*/
Vue.filter('localPrice', function (value) {
  if (!value) return ''
  value = value.toLocaleString() + '₴'
  return value
})

var app = new Vue({
  el: '#calc-app',
  data: {
    curDate: '',
    curHours: '',
    curPlace: 'room',
    curRoomName: '',
    curRoomMinSumm: '',
    rooms: [
      {
        name: 'Миньоны',
        image: './img/room1.jpg',
        minSumm: 2000,
      },
      {
        name: 'Алиса в стране чудес',
        image: './img/room1.jpg',
        minSumm: 2500,
      },
      {
        name: 'Тачки',
        image: './img/room1.jpg',
        minSumm: 2300,
      },
      {
        name: 'L.O.L.',
        image: './img/room1.jpg',
        minSumm: 2100,
      },
      {
        name: 'Мстители',
        image: './img/room1.jpg',
        minSumm: 2600,
      },
    ],
    guests: [
      {
        group: 'Дети до 1 года',
        label: 'Дети до 1 г.',
        icon: './img/baby.svg',
        count: 0,
        maxCount: 50,
        isDecDisabled: true,
        isInkDisabled: false,
        pricePer: 0,
        onWorks: 'Бесплатно',
        onWeeks: '0₴',
        price: 0
      },
      {
        group: 'Дети до 16 лет',
        label: 'Дети',
        icon: './img/girl.svg',
        count: 0,
        maxCount: 50,
        isDecDisabled: true,
        isInkDisabled: false,
        pricePer: 200,
        onWorks: 'Будни - 170₴',
        onWeeks: 'Выходные - 200₴',
        price: 0
      },
      {
        group: 'Взрослые',
        label: 'Взрослые',
        icon: './img/woman.svg',
        count: 0,
        maxCount: 50,
        isDecDisabled: true,
        isInkDisabled: false,
        pricePer: 200,
        onWorks: 'Будни - 170₴',
        onWeeks: 'Выходные - 200₴',
        price: 0
      }
    ],
  },
  methods: {
    incCount: function(index) {
      var item = this.guests[index]

      if (item.count >= 0) {
        item.isDecDisabled = false
      }
      if (item.count < item.maxCount) {
        item.count++
      } 
      if (item.count == item.maxCount) {
        item.isInkDisabled = true
      }
    },
    decCount: function(index) {
      var item = this.guests[index]

      if (item.count > 0) {
        item.count--
        item.isInkDisabled = false
      }
      if (item.count == 0) {
        item.isDecDisabled = true
      }
    },
    setActiveTab: function(e) {
      var target = e.target
      var parent = target.parentNode
      var tabs = parent.querySelectorAll('.tabs__trigger')

      parent.classList.remove('tabs__tab-list--disabled')
      for (var index = 0; index < tabs.length; index++) {
        tabs[index].classList.remove('is-selected')
        if (tabs[index] == target) {
          if (parent.dataset.part == '50') {
            parent.classList.remove('w-50-1', 'w-50-2')
            parent.classList.add('w-50-'+(index+1)+'')
          }
          tabs[index].classList.add('is-selected')
        }
      }
    },
    setCurRoom: function(index) {
      var item = this.rooms[index]
      var buttons = document.querySelectorAll('.rooms-cell .btn')
      buttons.forEach(function(item){
        item.classList.remove('btn--active')
      })
      buttons[index].classList.add('btn--active')
      this.curRoomName = item.name
      this.curRoomMinSumm = item.minSumm

    },
    setPlace: function(e) {
      this.setActiveTab(e)
      this.setCurPlace(e)
    },
    setCurPlace: function(e) {
      if (e.target.dataset.place == 'room') {
        this.curPlace = 'room'
        initRoomsCarousel() 
        
      } else {
        this.curPlace = 'table'
      }
    },
    setHours: function(e) {
      this.setActiveTab(e)
      this.setCurHours(e)
    },
    setCurHours: function(e) {
      if (e.target.dataset.hours == '10:00 - 15:00') {
        this.curHours = '10:00 - 15:00'
      } else {
        this.curHours = '16:00 - 21:00'
      }
    },
  },
  computed: {
    summ: function() {
      var array = this.guests
      var total = 0
      for (var i = 0; i < array.length; i++) {
        total += array[i].price
      }
      total = total.toLocaleString()+'₴'
      return total
    },
    guestsPrice: function() {
      return this.guests.map(function(item) {
        item.price = item.count*item.pricePer
        var price = item.price.toLocaleString()+'₴'
        return price
      });
    },
  }
})
/*
** Object fit polyfill init for Internet Explorer
*/ 
objectFitImages();
/**
*** Pages
**/
if (document.querySelector('.page-calc-show')) {

  ;(function () {
    var acc = document.querySelectorAll('.accordion');
    var i;

    for (i = 0; i < acc.length; i++) {
      var trigger = acc[i].querySelector('.show-item__more')
      trigger.addEventListener("click", function(e) {
        e.preventDefault()
        var panel = this.closest('.accordion').querySelector('.show-item__desc')
        if (panel.style.maxHeight) {
          panel.classList.remove('active')
          panel.style.maxHeight = null;
          this.innerText = 'Подробнее'   
        } else {
          panel.classList.add('active')
          panel.style.maxHeight = panel.scrollHeight + "px";
          this.innerText = 'Скрыть'
        } 
      });
    }
  })()
}
/**
*** Custom scrollbar init (https://github.com/Diokuz/baron)
**/
baron({
    root: '.baron',
    cssGuru: true,
    scroller: '.baron__scroller',
    bar: '.baron__bar',
    scrollingCls: '_scrolling',
    draggingCls: '_dragging'
}).fix({
    elements: '.header__title',
    outside: 'header__title_state_fixed',
    before: 'header__title_position_top',
    after: 'header__title_position_bottom',
    clickable: true
}).controls({
    // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
    track: '.baron__track',
});
function checkScrollDown() {
  var busketItems = document.querySelector('.baron__scroller')
  if (document.querySelector('.baron__scroller')) {
    document.querySelector('.baron__scroller').scrollTop = busketItems.scrollHeight;
  }
}
checkScrollDown()
/**
*** Carousel init (https://github.com/metafizzy/flickity)
**/
if (document.querySelector( '.carousel')) {
  function initRoomsCarousel() {
    var flkty = new Flickity( '.carousel', {
      wrapAround: true,
      imagesLoaded: true,
      initialIndex: 1,
      resize: true
    }); 
  }
  initRoomsCarousel() 
}
/**
*** Datepicker init (https://github.com/flatpickr/flatpickr)
**/
flatpickr.localize(flatpickr.l10ns.ru) 
var calendar = flatpickr("#datepicker", {
	dateFormat: "d.m.Y",
  disableMobile: "true",

	onChange: function(selectedDates, dateStr, instance) {
    var dateParts = dateStr.split(".")
    var day = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]).getDay()
    var arr = app.$data.guests

    if ((day === 6) || (day === 0)) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].pricePer = 200
      }
      arr[0].pricePer = 0
    } else {
      for (var i = 0; i < arr.length; i++) {
        arr[i].pricePer = 170
      }
      arr[0].pricePer = 0
    }
		app.$data.curDate = dateStr
  }
})
if (document.querySelector('.datepicker__btn')) {
  document.querySelector('.datepicker__btn').addEventListener('click', function() {
    calendar.open()
  })
}
/**
*** Animation
**/
(function() {

// Rocket progressbar animation 

if (document.querySelector('#calc-app')) {
  var btns = document.querySelectorAll('.calc-nav .btn')

  btns.forEach(function(btn, index) {
    btn.addEventListener('click', function(e) {
      e.preventDefault()
      if (e.target.dataset.next) {
        localStorage.setItem("rocketForward", true)
      } else {
        localStorage.setItem("rocketForward", false)
      }
      window.location = e.target.href
    })
  })

  var points1 = document.querySelector('.page-calc-place .page-points')
  var points2 = document.querySelector('.page-calc-animation .page-points')
  var points3 = document.querySelector('.page-calc-show .page-points')
  var points4 = document.querySelector('.page-calc-decor .page-points')
  var points5 = document.querySelector('.page-calc-menu .page-points')
  var points6 = document.querySelector('.page-calc-pay .page-points')
  var pointsArr = document.querySelectorAll('.page-points .page-point')
  var isForward

  if (localStorage.getItem("rocketForward")) {
    var isForward = localStorage.getItem("rocketForward")
  } else {
    var isForward = true
  }

  if (isForward == 'true') {
    if (document.querySelector('.page-calc-place .page-points')) {
      points1.classList.remove('step1-r')
      points1.classList.add('step1')
      pointsArr[0].classList.add('active')
    }
    if (document.querySelector('.page-calc-animation .page-points')) {
      points2.classList.remove('step2-r')
      points2.classList.add('step2')
      pointsArr[0].classList.add('completed')
      pointsArr[1].classList.add('active')
    }
    if (document.querySelector('.page-calc-show .page-points')) {
      points3.classList.remove('step3-r')
      points3.classList.add('step3')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('completed')
      pointsArr[2].classList.add('active')
    }
    if (document.querySelector('.page-calc-decor .page-points')) {
      points4.classList.remove('step4-r')
      points4.classList.add('step4')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('completed')
      pointsArr[3].classList.add('active')
    }
    if (document.querySelector('.page-calc-menu .page-points')) {
      points5.classList.remove('step5-r')
      points5.classList.add('step5')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('checked')
      pointsArr[3].classList.add('completed')
      pointsArr[4].classList.add('active')
    }
    if (document.querySelector('.page-calc-pay .page-points')) {
      points6.classList.remove('step6-r')
      points6.classList.add('step6')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('checked')
      pointsArr[3].classList.add('checked')
      pointsArr[4].classList.add('completed')
      pointsArr[5].classList.add('active')
    }
  } else {
    if (document.querySelector('.page-calc-place .page-points')) {
      points1.classList.remove('step1')
      points1.classList.add('step1-r')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('active')
    }
    if (document.querySelector('.page-calc-animation .page-points')) {
      points2.classList.remove('step2')
      points2.classList.add('step2-r')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('active')
    }
    if (document.querySelector('.page-calc-show .page-points')) {
      points3.classList.remove('step3')
      points3.classList.add('step3-r')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('checked')
      pointsArr[3].classList.add('active')
    }
    if (document.querySelector('.page-calc-decor .page-points')) {
      points4.classList.remove('step4')
      points4.classList.add('step4-r')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('checked')
      pointsArr[3].classList.add('checked')
      pointsArr[4].classList.add('active')
    }
    if (document.querySelector('.page-calc-menu .page-points')) {
      points5.classList.remove('step5')
      points5.classList.add('step5-r')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('checked')
      pointsArr[3].classList.add('checked')
      pointsArr[4].classList.add('checked')
      pointsArr[5].classList.add('active')
    }
    if (document.querySelector('.page-calc-pay .page-points')) {
      points6.classList.remove('step6')
      points6.classList.add('step6-r')
      pointsArr[0].classList.add('checked')
      pointsArr[1].classList.add('checked')
      pointsArr[2].classList.add('checked')
      pointsArr[3].classList.add('checked')
      pointsArr[4].classList.add('checked')
      pointsArr[5].classList.add('checked')
      pointsArr[6].classList.add('active')
    }
  }
}

//  Flying elements animation

if (document.querySelector('.fig')) {

  var figsBig = document.querySelectorAll('.fig-big')

  figsBig.forEach(function(fig, index) {
    window.addEventListener('scroll', function() {
      var scrollTop = document.documentElement.scrollTop
      fig.style.top = -scrollTop/4 +'px'
    });
  });

  var figsSmall = document.querySelectorAll('.fig-small')

  figsSmall.forEach(function(fig, index) {
    window.addEventListener('scroll', function() {
      var scrollTop = document.documentElement.scrollTop
      fig.style.top = -scrollTop*1 +'px'
    });
  });
} 
})()
/**
*** END common.js
**/
})