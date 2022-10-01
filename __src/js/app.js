//import * as flsFunctions from "./modules/functions.js";
//flsFunctions.isWebP();


var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};



/**if (window.getCookie("cookie_name") !== "Y") */
function getCookie(a) {
    var b = document.cookie.match(new RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return b ? decodeURIComponent(b[1]) : undefined
}

/**window.setCookie("cookie_name", "Y", {
		expires: 31557600,
		path: "/",
		domain: window.location.hostname
	}); */
function setCookie(b, f, c) {
    c = c || {};
    var i = c.expires;
    if (typeof i == "number" && i) {
        var h = new Date();
        h.setTime(h.getTime() + i * 1000);
        i = c.expires = h
    }
    if (i && i.toUTCString) {
        c.expires = i.toUTCString()
    }
    f = encodeURIComponent(f);
    var a = b + "=" + f;
    for (var e in c) {
        a += "; " + e;
        var g = c[e];
        if (g !== true) {
            a += "=" + g
        }
    }
    document.cookie = a
}


/**Рандомное целое число между заданными от и до */
function getRandomWholeNumber(min, max) {
    return (Math.random() * (max - min) + min);
}

/**Перемешивает массив */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

//import Sticky from 'sticky-js';
import Sticky from './modules/sticky-js/sticky.js';
var sticky = new Sticky('[data-sticky]', {});
window.addEventListener('resize', function (event) {
    sticky.update();
});


import Swiper, { Navigation, Autoplay } from 'swiper';
//import Swiper, { Navigation, Autoplay, EffectFade, EffectCreative, EffectCoverflow } from 'swiper';

Swiper.use([Navigation, Autoplay]);
//Swiper.use([Navigation, Autoplay, EffectFade, EffectCreative, EffectCoverflow]);

const slider = new Swiper('.main-slider', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,

    // mousewheel: {
    //     invert: true,
    // },


    // autoplay: {
    //     delay: 5000,
    // },
    // effect: 'fade',
    // fadeEffect: {
    //     crossFade: true
    // },
    // effect: "creative",
    // creativeEffect: {
    //     prev: {
    //         shadow: true,
    //         translate: ["-125%", 0, -800],
    //         rotate: [0, 0, -90],
    //     },
    //     next: {
    //         shadow: true,
    //         translate: ["125%", 0, -800],
    //         rotate: [0, 0, 90],
    //     },
    // },
});

const newsSlider = new Swiper('.news-slider', {
    //slidesPerView: 4,
    slidesPerView: "auto",
    loop: false,
    centeredSlides: false,
    spaceBetween: 20,
    breakpoints: {
        // 576: {
        //     slidesPerView: 2,
        // },
        // 768: {
        //     slidesPerView: 3,
        // },
        // 992: {
        //     slidesPerView: 3,
        // },
        // 1100: {
        //     slidesPerView: 2,
        // },
        // 1200: {
        //     slidesPerView: 3,
        // },
        // 1400: {
        //     slidesPerView: 4,
        // },
        //1600: {
        //  slidesPerView: 5,
        //spaceBetween: 50,
        //},
    },
    on: {
        init: function () {
            newsItemTextHeight();
        },
    },
});

const gallerySlider = new Swiper('.gallery-slider', {
    // configure Swiper to use modules
    //modules: [Navigation],
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    spaceBetween: 0,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    on: {
        init: function () {
            setGallerySliderHeight(this);
        },
        resize: function () {
            setGallerySliderHeight(this);
        }
    },
});

function setGallerySliderHeight(slider) {
    const gallSlider = document.querySelector('.gallery-slider');
    if (gallSlider) {
        var currentImg = slider.el.querySelector('.swiper-slide-active img');
        var h = currentImg.clientHeight;
        Array.prototype.forEach.call(slider.slides, function (slide) {
            slide.style.height = h + "px";
        });
    }

}


/**Toggle swiper slider full-screen */
function swiperFullScreen() {
    Array.prototype.forEach.call(document.querySelectorAll(".swiper-slide-fullscreen"), function (slide) {
        slide.addEventListener("click", function () {
            document.querySelector("body").classList.add("swiper-slider-fullscreen");
        });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".close-slider"), function (close) {
        close.addEventListener("click", function () {
            document.querySelector("body").classList.remove("swiper-slider-fullscreen");
        });
    });
}



/**collapse сontent*/
function collapseContent() {
    var collapseContainers = document.querySelectorAll(".collapse-container");

    Array.prototype.forEach.call(collapseContainers, function (collapseContainer) {

        var collapseBtn = collapseContainer.querySelector(".collapse-btn");
        var collapseContent = collapseContainer.querySelector(".collapse-content");

        collapseBtn.addEventListener("click", function () {
            if (collapseContent.clientHeight > 0) {
                collapseContent.style.height = 0;
                collapseContent.classList.remove("active");
                collapseBtn.classList.remove("active");
            }
            else {
                collapseContent.style.height = collapseContent.scrollHeight + "px";
                collapseContent.classList.add("active");
                collapseBtn.classList.add("active");
            }
        });

    });
}


/**auto resize textarea height on input*/
function resizeTextarea() {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {

        tx[i].style.height = (tx[i].scrollHeight) + "px";
        var borderRadius = 70;
        if (tx[i].offsetHeight > 60)
            borderRadius = 24;
        tx[i].style.borderRadius = borderRadius + "px";


        tx[i].addEventListener("input", OnInput, false);
    }
}

function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
    var borderRadius = 70;
    if (this.offsetHeight > 60)
        borderRadius = 24;
    this.style.borderRadius = borderRadius + "px";
}



/**Всплывающее окно по наведению на кнопку, закрытие по клику по кнопке закрытия */
function popoversInit() {
    var div = document.createElement("div");
    div.classList.add("popover-placeholder");
    document.querySelector("body").append(div);
}

function popovers() {

    Array.prototype.forEach.call(document.querySelectorAll('[data-popover]'), (popover_btn) => {
        const popover = document.getElementById(popover_btn.getAttribute('data-popover'));
        const popover_btn_close = popover.querySelector(".popover-close");

        document.querySelector(".popover-placeholder").innerHTML = "";
        document.querySelector(".popover-placeholder").append(popover);

        popoverHide(popover);

        popover_btn.addEventListener('mouseenter', e => {
            popoverShow(popover);
            popoverPos(popover, popover_btn);
        });

        popover.addEventListener('mouseenter', e => {
            popoverShow(popover);
        });

        popover_btn_close.addEventListener("click", function () {
            popoverHide(popover);
        });

        window.addEventListener('resize', function (event) {
            popoverPos(popover, popover_btn);

        });

    });

    function popoverShow(popover) {
        popover.classList.add("active");
        popover.setAttribute('data-hidden', '');
    }

    function popoverHide(popover) {
        popover.classList.remove("active");
        popover.setAttribute('data-hidden', 'true');
        popover.setAttribute("style", '');
    }

    function popoverPos(popover, popover_btn) {

        var popoverBtnRect = popover_btn.getBoundingClientRect();
        var bodyRect = document.querySelector("body").getBoundingClientRect();

        var margin = 20;

        var top = popoverBtnRect.top - bodyRect.top + "px";
        var left = popoverBtnRect.left - bodyRect.left - 10 + "px";
        var right = "auto";
        var bottom = "auto";

        var position = "top:" + top + ";left:" + left + ";right:" + right + ";bottom:" + bottom + ";"
        popover.setAttribute("style", position);
        //console.log(position);

        var popoverRect = popover.getBoundingClientRect();


        //правая граница зашла за левую границу экрана (блок полностью за левой границей)
        if ((popoverRect.x + popoverRect.width) < 0) {
            left = margin + "px";
            right = "auto";
        }

        //нижняя граница зашла за верхнюю границу экрана  (блок полностью за верхней границей)
        // if (popoverRect.y < 0 || (popoverRect.y + popoverRect.height) < 0) {
        //     top = margin + "px";
        //     bottom = "auto";
        // }

        //левая граница зашла за правую границу экрана (блок полностью за правой границей) 
        //или правая граница зашла правую границу экрана 
        if (popoverRect.x > window.innerWidth || (popoverRect.x + popoverRect.width) > (window.innerWidth) - 17) {
            right = margin + "px";
            left = "auto";
        }

        //верхняя граница зашла за нижнюю страницу экрана (блок полностью за нижней границей)  
        //или нижняя граница зашла за нижнюю страницу экрана
        // if (popoverRect.y > window.innerHeight || (popoverRect.y + popoverRect.height) > window.innerHeight) {
        //     bottom = margin + "px";
        //     top = "auto";
        // }

        var position = "top:" + top + ";left:" + left + ";right:" + right + ";bottom:" + bottom + ";"
        popover.setAttribute("style", position);
    }

}




/**Tabs */
function tabs() {
    const tabList = document.querySelectorAll(".tab-list-item");
    const tabContent = document.querySelectorAll(".tab");

    var cookieTab = getCookie("tab");

    Array.prototype.forEach.call(tabList, function (tabListItem) {

        const thisId = tabListItem.id;
        const tabContentId = thisId + "-content";
        let thisTabContentItem = document.getElementById(tabContentId);

        
        if(cookieTab && cookieTab == thisId) {
            //Скрытие всех tab-content
            Array.prototype.forEach.call(tabContent, function (tabContentItem) {
                tabContentItem.classList.add("d-none");
            });
            //Открытие активной tab-content
            thisTabContentItem.classList.remove("d-none");

            //Убрать активность у всех tab
            Array.prototype.forEach.call(tabList, function (tabListItem) {
                tabListItem.classList.remove("active");
            });
            
            //Добавить активность активной tab
            tabListItem.classList.add("active");
        }


        tabListItem.addEventListener("click", function () {

            setCookie("tab", thisId, {
                expires: 31557600,
                path: "/",
                domain: window.location.hostname
            }); 

            //Скрытие всех tab-content
            Array.prototype.forEach.call(tabContent, function (tabContentItem) {
                tabContentItem.classList.add("d-none");
            });
            //Открытие активной tab-content
            thisTabContentItem.classList.remove("d-none");

            //Убрать активность у всех tab
            Array.prototype.forEach.call(tabList, function (tabListItem) {
                tabListItem.classList.remove("active");
            });

            //Добавить активность активной tab
            tabListItem.classList.add("active");


            collapseContent();
            resizeTextarea();
            popovers();
            swiperFullScreen();
            //setGallerySliderHeight(gallerySlider);

        });
    });
}




document.addEventListener("DOMContentLoaded", function () {
    //tabs();
    //swiperFullScreen();
    //collapseContent();
    //resizeTextarea();
    //opoversInit();
    //popovers();


    window.addEventListener('resize', function (event) {
        //collapseContent();
    });




});





