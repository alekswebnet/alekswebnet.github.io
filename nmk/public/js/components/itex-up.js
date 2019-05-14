Vue.component('itex-up', {
  template: '<transition name="fade">\n' +
  '  <a href="javascript:void(0)" v-show="isVisible" @click="scrollTop">\n' +
  '    <slot></slot>\n' +
  '  </a>\n' +
  '</transition>',
  data: function() {
    return {
      options: {
        showButtonHeight: 300,
        speed: 1000,
      },
      isVisible: false,
    };
  },
  mounted: function() {
    var getPageScroll;
    var self = this;
    if (typeof window.pageXOffset !== 'undefined') {
      getPageScroll = function () {
        return {
          left: pageXOffset,
          top: pageYOffset,
        };
      }
    } else {
      getPageScroll = function() {
        var html = document.documentElement;
        var body = document.body;

        var top = html.scrollTop || body && body.scrollTop || 0;
        top -= html.clientTop;

        var left = html.scrollLeft || body && body.scrollLeft || 0;
        left -= html.clientLeft;

        return {top: top, left: left};
      }
    }

    $(window).scroll(function () {
      self.isVisible = getPageScroll()['top'] > self.options.showButtonHeight;
    });
  },
  methods: {
    scrollTop: function() {
      $('body, html').animate({
        scrollTop: 0,
      }, this.options.speed);
    }
  }
});
