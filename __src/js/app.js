import * as flsFunctions from "./modules/functions.js";
//flsFunctions.isWebP();


import VanillaScrollspy from 'vanillajs-scrollspy';
const menu = document.querySelector('#navbar');
const scrollspy = VanillaScrollspy({ menu });
scrollspy.init();


import Sticky from './modules/sticky-js/sticky.js';
var sticky = new Sticky('[data-sticky]', {});
window.addEventListener('resize', function (event) {
    sticky.update();
});


import Swiper, { Navigation, Autoplay } from 'swiper';
Swiper.use([Navigation, Autoplay]);
const slider = new Swiper('.slider', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,
});



const viewportWidth = document.documentElement.clientWidth;//вычисляем ширину вьюпорта

function findBgMiddle(event) {
    const element = document.querySelector('.bg');
    const viewportHeight = document.documentElement.clientHeight;
    const viewporCenter = viewportHeight/2;

    var elementTop = element.getBoundingClientRect().top;
    var elementHeight = element.getBoundingClientRect().height;
    var elementCenter = elementTop + elementHeight / 2;

    var fixed = false;

    // if(elementCenter < viewporCenter && elementHeight < viewportHeight) {
    //     element.classList.add('fixed');
    //     fixed = true;
    // }
    // else {
    //     element.classList.remove('fixed');
    // }

    if(elementCenter < viewporCenter) {
        element.classList.add('fixed');
        fixed = true;
    }
    else {
        //element.classList.remove('fixed');
    }

    console.log(viewporCenter);
    console.log(elementCenter);
    console.log(event);
}



addEventListener('DOMContentLoaded', () => {
//document.addEventListener("DOMContentLoaded", function () {
    //tabs();
    //swiperFullScreen();
    //collapseContent();
    //resizeTextarea();
    //opoversInit();
    //popovers();


    addEventListener('resize', (event) => {
        //collapseContent();
        //findBgMiddle();
    });


    addEventListener('scroll', (event) => {
        //findBgMiddle(event);
    });


});





