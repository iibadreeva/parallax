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
        }
    }

}());

var svgScroll = (function () {
    var svg = document.querySelector('.flower__svg'),
        svgPath = document.querySelector('.flower__group'),
        body = document.body,
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
                    svgPath.style.strokeDashoffset = drawAmount;
                    svgPath.style.strokeDasharray = 1200
                }else {
                    svgPath.style.strokeDasharray = 0
                }
            }
        }
    }
}());

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


function loadImage(url, className, img='bg') {
    return new Promise(function (resolve, reject) {
        let image = new Image(200);
        let body = Array.isArray(className) ? document.querySelectorAll(className) : document.querySelector(className);

        if(img === 'bg'){
            image.src = url;
            image.addEventListener('load', function () {
                if(Array.isArray(className)){
                    for(let i =0; i < body.length; i++){
                        body[i].style.backgroundImage=`url(${url})`;
                    }
                }else {
                    body.style.backgroundImage=`url(${url})`;
                }
                resolve();
            });
        }else{
            body.appendChild(image);
            image.src = url;
            image.addEventListener('load', function () {
                resolve();
            });
        }
    })
}

const url1 = "../images/animate-top.jpg",
      url2 = "../images/least.png",
      url3 = "../images/wing.png",
      url4 = "../images/birds.svg",
      url5 = "../images/butterfly3-rightwing.png",
      url6 = "../images/butterfly3-leftwing.png",
      url7 = "../images/butterfly3-body.png";


Promise.all([
    loadImage(url1, '.animate-top'),
    loadImage(url2, '.animate-top__least'),
    loadImage(url4, '.animate-top__birds'),
    loadImage(url3, ['.butterfly__left','.butterfly__right']),
    loadImage(url5, '.butterfly-two__rightwing','img'),
    loadImage(url6, '.butterfly-two__leftwing', 'img'),
    loadImage(url7, '.butterfly-two__body', 'img'),
])
    .then(function () {
    const circle = document.querySelector('.circle'),
          body = document.querySelector('.animate-top'),
          logo =  document.querySelector('.logo'),
          boxes = [
              'animate-top__birds',
              'butterfly',
              'butterfly-two',
              'animate-top__least'
          ];

    body.removeChild(circle);
    logo.classList.add('active');
    for(let i=0; i < boxes.length; i++){
        // console.log( document.querySelectorAll(`.${boxes[i]}`)[0] )
        document.querySelectorAll(`.${boxes[i]}`)[0].style.display = 'block';
    }
});

window.onscroll = function () {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
    svgScroll.grow(wScroll);
};

