document.addEventListener("DOMContentLoaded", function() {
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
        group: 'Именинник',
        label: 'Именинники',
        icon: './img/birthday-boy.svg',
        count: 0,
        maxCount: 50,
        isDecDisabled: true,
        isSingle: true,
        isInkDisabled: false,
        pricePer: 0,
        onWorks: 'Бесплатно',
        onWeeks: '0₴',
        price: 0
      },
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
    animations: [
      {
        name: 'Миньоны',
        image: 'img/Screenshot_2.jpg',
        type: '',
        active: false,
        tariffs: [
          {
            time: '30 мин',
            price: 600
          },
          {
            time: '1 час',
            price: 800
          },
          {
            time: '1 час 30 мин',
            price: 900
          }
        ],
        curTime: '',
        curTariff: '',
        curTariffIndex: 1,
        price: 0,
      },
      {
        name: 'Трансформеры',
        image: 'img/Screenshot_1.jpg',
        type: '',
        active: false,
        tariffs: [
          {
            time: '30 мин',
            price: 600
          },
          {
            time: '1 час',
            price: 800
          },
          {
            time: '1 час 30 мин',
            price: 900
          }
        ],
        curTime: '',
        curTariff: '',
        curTariffIndex: 1,
        price: 0,
      },
      {
        name: 'Мстители',
        image: 'img/Screenshot_3.jpg',
        type: '',
        active: false,
        tariffs: [
          {
            time: '30 мин',
            price: 600
          },
          {
            time: '1 час',
            price: 800
          },
          {
            time: '1 час 30 мин',
            price: 900
          }
        ],
        curTime: '',
        curTariff: '',
        curTariffIndex: 1,
        price: 0,
      }
    ],
    shows: [
      {
        name: 'Мыльные пузыри',
        image: './img/A7292BE4-CA5E-E251-102D-01E5D21A11DF.jpg',
        time: '45 мин',
        price: 1200,
        desc: 'Если Вы хотите удивить своих гостей, тогда это отличный выбор! В отдельной комнате, со световой иллюминацией, активной музыкой и яркими ведущими вы почувствуете себя в сказке, а ваши гости и дети незамедлительно начнут прыгать под потоки летящей серебренной бумаги, которая раздувается мощными воздушными пушками!<br>Атмосфера будет что надо!',
        active: false,
      },
      {
        name: 'Серебряное шоу',
        image: './img/222682F7-AF14-6598-3836-DBCD421625AD.jpg',
        time: '45 мин',
        price: 1200,
        desc: 'Если Вы хотите удивить своих гостей, тогда это отличный выбор! В отдельной комнате, со световой иллюминацией, активной музыкой и яркими ведущими вы почувствуете себя в сказке, а ваши гости и дети незамедлительно начнут прыгать под потоки летящей серебренной бумаги, которая раздувается мощными воздушными пушками!<br>Атмосфера будет что надо!',
        active: false,
      },
      {
        name: 'Химическое шоу',
        image: './img/7584AF9B-2E91-D25B-B67D-8B804F902AC9.jpg',
        time: '45 мин',
        price: 1200,
        desc: 'Если Вы хотите удивить своих гостей, тогда это отличный выбор! В отдельной комнате, со световой иллюминацией, активной музыкой и яркими ведущими вы почувствуете себя в сказке, а ваши гости и дети незамедлительно начнут прыгать под потоки летящей серебренной бумаги, которая раздувается мощными воздушными пушками!<br>Атмосфера будет что надо!',
        active: false,
      },
    ],
    masterclasses: [
      {
        name: 'Пицца-суши',
        image: './img/13edbadedcacc4d15e75b9c9ecc8146e.jpg',
        time: '45 мин',
        tariff: 50,
        count: 0,
        maxCount: 50,
        price: 0,
        desc: 'Если Вы хотите удивить своих гостей, тогда это отличный выбор! В отдельной комнате, со световой иллюминацией, активной музыкой и яркими ведущими вы почувствуете себя в сказке, а ваши гости и дети незамедлительно начнут прыгать под потоки летящей серебренной бумаги, которая раздувается мощными воздушными пушками!<br>Атмосфера будет что надо!',
        active: false,
      },
      {
        name: 'Пряники',
        image: './img/331791264_331791264.jpg',
        time: '45 мин',
        tariff: 50,
        count: 0,
        maxCount: 50,
        price: 0,
        desc: 'Если Вы хотите удивить своих гостей, тогда это отличный выбор! В отдельной комнате, со световой иллюминацией, активной музыкой и яркими ведущими вы почувствуете себя в сказке, а ваши гости и дети незамедлительно начнут прыгать под потоки летящей серебренной бумаги, которая раздувается мощными воздушными пушками!<br>Атмосфера будет что надо!',
        active: false,
      },
      {
        name: 'Коктейли',
        image: './img/Ymb9OdtUdqc.jpg',
        time: '45 мин',
        tariff: 50,
        count: 0,
        maxCount: 50,
        price: 0,
        desc: 'Если Вы хотите удивить своих гостей, тогда это отличный выбор! В отдельной комнате, со световой иллюминацией, активной музыкой и яркими ведущими вы почувствуете себя в сказке, а ваши гости и дети незамедлительно начнут прыгать под потоки летящей серебренной бумаги, которая раздувается мощными воздушными пушками!<br>Атмосфера будет что надо!',
        active: false,
      },
    ],
    decors: [
      {
        name: 'Пиньята',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 300,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Канекалоны',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 170,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Аквагрим малюнок',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 40,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Аквагрим маска',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 80,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шар-сюрприз',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 250,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шар двойной сюрприз',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 350,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шар на палочке',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 10,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шар гелиевый',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 30,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шар фольгированный',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 100,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Цифра фольгированный гелиевый шарик',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 350,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Арка из шариков на вход в банкетный зал',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 360,
        isCount: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шарик с конфетти',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 30,
        isCount: true,
        count: 0,
        isDecDisabled: true,
        isInkDisabled: false,
        isCheckActive: false,
        summ: 0,
      },
      {
        name: 'Шарики на пол',
        image: 'img/F08A7A5A-4A15-8ED6-65FE-7680E0621DBD.jpg',
        price: 150,
        pieces: 50,
        isCount: false,
        isCheckActive: false,
        summ: 0,
      },
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
    incCountAnim: function(index) {
      var item = this.animations[index]
      var tabs = document.querySelectorAll('.animation-wrapper .tabs__tab-list')[index].querySelectorAll('.tabs__trigger')

      if (item.curTariffIndex < (item.tariffs.length-1)) {
        item.curTariffIndex++
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.remove('is-selected')
        }
        tabs[item.curTariffIndex].classList.add('is-selected')
        tabs[index].parentNode.classList.remove('w-33-1', 'w-33-2', 'w-33-3')
        tabs[index].parentNode.classList.add('w-33-'+(item.curTariffIndex+1)+'')
        item.curTime = item.tariffs[item.curTariffIndex].time
        item.curTariff = item.tariffs[item.curTariffIndex].price
      } 
    },
    decCountAnim: function(index) {
      var item = this.animations[index]
      var tabs = document.querySelectorAll('.animation-wrapper .tabs__tab-list')[index].querySelectorAll('.tabs__trigger')

      if (item.curTariffIndex > 0) {
        item.curTariffIndex--
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.remove('is-selected')
        }
        tabs[item.curTariffIndex].classList.add('is-selected')
        tabs[index].parentNode.classList.remove('w-33-1', 'w-33-2', 'w-33-3')
        tabs[index].parentNode.classList.add('w-33-'+(item.curTariffIndex+1)+'')
        item.curTime = item.tariffs[item.curTariffIndex].time
        item.curTariff = item.tariffs[item.curTariffIndex].price
      } 
    },
    incCountMc: function(index) {
      var item = this.masterclasses[index]

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
    decCountMc: function(index) {
      var item = this.masterclasses[index]

      if (item.count > 0) {
        item.count--
        item.isInkDisabled = false
      }
      if (item.count == 0) {
        item.isDecDisabled = true
      }
    },
    incCountDecor: function(index) {
      var item = this.decors[index]

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
    decCountDecor: function(index) {
      var item = this.decors[index]

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
          if (parent.dataset.part == '33') {
            parent.classList.remove('w-33-1', 'w-33-2', 'w-33-3')
            parent.classList.add('w-33-'+(index+1)+'')
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
    filterAnimAge: function(e) {
      this.setActiveTab(e)
    },
    setAnimTime: function(event, index) {
      this.setActiveTab(event)
      var item = this.animations[index]
      item.curTariffIndex = event.target.dataset.index
      item.curTime = item.tariffs[item.curTariffIndex].time
      item.curTariff = item.tariffs[item.curTariffIndex].price
    },
    setAnimType: function(event, index) {
      document.querySelectorAll('.animation-item__type .btn').forEach(function(item){
        item.classList.remove('btn--active')
      })
      var item = this.animations[index]
      document.querySelectorAll('.animation-wrapper .tabs__tab-list')[index].classList.remove('tabs__tab-list--disabled')
      event.target.classList.add('btn--active')
      item.type = event.target.dataset.type
      item.active = true
      item.curTime = item.tariffs[item.curTariffIndex].time
      item.curTariff = item.tariffs[item.curTariffIndex].price
    },
    removeAnim: function(index) {
      var item = this.animations[index]
      item.active = false
      document.querySelectorAll('.animation-item__type')[index].querySelectorAll('.btn').forEach(function(item){
        item.classList.remove('btn--active')
      })
      document.querySelectorAll('.animation-wrapper .tabs__tab-list')[index].classList.add('tabs__tab-list--disabled')
      item.price = 0
    },
    setShow: function(event, index) {
      var btn = event.target
      var isActive = this.shows[index].active

      if (isActive) {
        this.shows[index].active = false
        btn.classList.remove('btn--active')
        btn.innerText = 'Выбрать'
      } else {
        this.shows[index].active = true
        btn.classList.add('btn--active')
        btn.innerText = 'Выбрано'
      } 
    },
    setMasterclass: function(event, index) {
      var btn = event.target
      var isActive = this.masterclasses[index].active

      if (isActive) {
        this.masterclasses[index].active = false
        btn.classList.remove('btn--active')
        btn.innerText = 'Выбрать'
      } else {
        this.masterclasses[index].active = true
        btn.classList.add('btn--active')
        btn.innerText = 'Выбрано'
      } 
    },
    removeShow: function(event, index) {
      var btns = document.querySelectorAll('.show-item--show .btn')
      btns[index].classList.remove('btn--active')
      btns[index].innerText = 'Выбрать'
      this.shows[index].active = false
    },
    removeMasterclass: function(event, index) {
      var btns = document.querySelectorAll('.show-item--masterclass .btn')
      btns[index].classList.remove('btn--active')
      btns[index].innerText = 'Выбрать'
      this.masterclasses[index].active = false
    },
  },
  computed: {
    summ: function() {
      var guests = this.guests
      var total = 0
      for (var i = 0; i < guests.length; i++) {
        total += guests[i].price
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
    masterclassPrice: function() {
      return this.masterclasses.map(function(item) {
        item.price = item.count*item.tariff
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
  console.log('scrolldown')
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