var parallax = (function () {
    var least = document.querySelector('.animate-top__least');
    var birds = document.querySelector('.animate-top__birds');
    var logo = document.querySelector('.logo');

    return {
        move: function (block, windowScroll, strafeAmount, pos='v') {
            // console.log(windowScroll)
            var strafe = windowScroll / - strafeAmount + '%';
            if(pos == 'v')
                var transformString = `translateY(${strafe})`;
            else
                var transformString = `translateX(${strafe})`;

            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;
        },

        init: function (wScroll) {
            this.move(logo, wScroll, 2);
            this.move(least, wScroll, 20, 'h');
            this.move(birds, wScroll, 3, 'h');
        }
    }

}());

var svgScroll = (function () {
    var svg = document.querySelector('.flower__svg'),
        svgPath = document.querySelectorAll('.flower__group'),
        windowMargin = window.innerHeight / 3,
        svgCoord = getCoords(svg),
        svgPosCoord = svgCoord.top;

    return {
        grow: function (wScroll) {
            var startAnimate = wScroll - svgPosCoord + windowMargin,
                pixelsElapsed = svgPosCoord - wScroll,
                percentsElapsed = 100 - Math.ceil(pixelsElapsed / windowMargin * 100),
                percentsDraw = 1200 / 100 * percentsElapsed;

            if (startAnimate >= 0) {
                var drawAmount = 1200 - percentsDraw;

                if (drawAmount > 0) {
                    svgPath.forEach(function (item) {
                        item.style.strokeDashoffset = drawAmount;
                    });
                }
            }
        }
    }
}());

window.onscroll = function () {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
    svgScroll.grow(wScroll);
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;


    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;


    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;


    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left
    };
}