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
        flange = document.querySelector('.flange'),
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
                    svgPath.style.strokeDasharray = 0;
                    flange.classList.add('active');
                }
            }
        }
    }
}());

var grass = (function () {
    var grass = document.getElementsByClassName('grass')[0];

    return {
        drow: function (blade) {
            let randomHeight =  Math.floor(Math.random() * 100),
                randomLeft = Math.floor(Math.random() * (window.innerWidth - 8)),
                randomRotation = Math.floor(Math.random() * 10) - 5;

            blade.style.height = (randomHeight + 100) + 'px';
            blade.style.zIndex = randomHeight;
            blade.style.opacity = randomHeight * 0.02;
            blade.style.left = randomLeft + 'px';
            blade.style.transform = 'rotate(' + randomRotation + 'deg)';
        },

        init: function (num) {
            let numberOfBlades = num / 3;
            grass.innerHTML = '';
            for (var i = 0; i < numberOfBlades; i++) {
                var blade = document.createElement('div');
                this.drow(blade);
                grass.appendChild(blade);
            }
        }
    }
}());

var moveLayers = (function () {
    var parallaxContainer = document.querySelector('.parallax__inner'),
        layers = parallaxContainer.children;

    return {
        init: function (e) {
            var initialX = (window.innerWidth / 2) - e.pageX,
            initialY = (window.innerHeight / 2) - e.pageY;

            [].slice.call(layers).forEach(function (layer, i) {
                var
                    divider = i / 200,
                    positionX = initialX * divider,
                    positionY = initialY * divider,
                    // bottomPosition = (window.innerHeight / 2) * divider,
                    layerStyle = layer.style,
                    transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px , 0)';

                layerStyle.transform = transformString;
                // layerStyle.bottom = '-' + bottomPosition + 'px';
                // parallaxContainer.style.transform = `translateY(${Math.abs(10)}px)`
            });
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

const url1 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/animate-top.jpg",
      url2 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/least.png",
      url3 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/wing.png",
      url4 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/birds.png",
      url5 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/butterfly3-rightwing.png",
      url6 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/butterfly3-leftwing.png",
      url7 = "https://raw.githubusercontent.com/iibadreeva/parallax/master/app/images/butterfly3-body.png";


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
          boxes = [
              'animate-top__birds',
              'butterfly',
              'butterfly-two',
              'animate-top__least',
              'logo'
          ];

    body.removeChild(circle);
    for(let i=0; i < boxes.length; i++){
        document.querySelectorAll(`.${boxes[i]}`)[0].style.display = 'block';
    }
});

window.onscroll = function () {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
    svgScroll.grow(wScroll);
};

window.addEventListener('load', function () {
    let width = window.innerWidth;

    grass.init(width);
})

window.addEventListener('resize', function () {
    let width = window.innerWidth;

    grass.init(width);
})

window.addEventListener('mousemove', function (e) {
    moveLayers.init(e)
});