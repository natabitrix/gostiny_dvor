import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebP();
//flsFunctions.isMobile();


import VanillaScrollspy from 'vanillajs-scrollspy';
const menu = document.querySelector('#navbar');
if (menu) {
    const scrollspy = VanillaScrollspy({ menu });
    scrollspy.init();
}

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




// import Lightense from 'lightense-images';
// window.addEventListener('load', function () {
//     var el = document.querySelectorAll('img.lightense');
//     Lightense(el, {
//         time: 300,
//         padding: 10,
//         offset: 40,
//         keyboard: true,
//         cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
//         background: 'rgba(46, 48, 54, .9)',
//         zIndex: 50,
//         beforeShow(config) {
//             //document.querySelector('body').classList.add('img-enlarge');
            
//         },
//         afterShow(config) {
//         },
//         beforeHide(config) {
//         },
//         afterHide(config) {
//             //document.querySelector('body').classList.remove('img-enlarge');
//         }
//     });
// }, false);



const viewportWidth = document.documentElement.clientWidth;//вычисляем ширину вьюпорта


addEventListener('DOMContentLoaded', () => {

    flsFunctions.interactiveSvgPath(arrInteractiveSvgPath);
    flsFunctions.interactiveSvgPathDouble("svg_arenda", arrInteractiveSvgPathDouble);
    flsFunctions.modals();
    flsFunctions.tabs();
    flsFunctions.mobileMenu();
    flsFunctions.scrollTopButton();


    addEventListener('resize', (event) => {

    });


    addEventListener('scroll', (event) => {

    });


});





