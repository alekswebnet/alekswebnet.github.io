/**
 * Created by Pascal on 22.11.2014.
 */

(function($) {
    $.extend({
        itexUp: function(options) {
            options = $.extend({
                elementID: 'up',
                showButtonHeight: 300,
                speed: 1000
            }, options);

            var element = $('#' + options.elementID);

            element.hide();

            var getPageScroll = (window.pageXOffset != undefined) ?
                function() {
                    return {
                        left: pageXOffset,
                        top: pageYOffset
                    };
                } :
                function() {
                    var html = document.documentElement;
                    var body = document.body;

                    var top = html.scrollTop || body && body.scrollTop || 0;
                    top -= html.clientTop;

                    var left = html.scrollLeft || body && body.scrollLeft || 0;
                    left -= html.clientLeft;

                    return { top: top, left: left };
                };

            $(window).scroll(function() {
                var scroll = getPageScroll();

                if(scroll['top'] > options.showButtonHeight) {
                    element.fadeIn(300);
                } else {
                    element.fadeOut(300);
                }
            });

            element.bind('click', function() {
                $('body, html').animate({scrollTop: 0}, options.speed);
                return false;
            });
        }
    });
})(jQuery);
