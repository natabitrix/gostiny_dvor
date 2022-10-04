import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebP();
flsFunctions.isMobile();


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





addEventListener('DOMContentLoaded', () => {

    //flsFunctions.swiperFullScreen();
    //flsFunctions.collapseContent();
    //flsFunctions.resizeTextarea();
    //flsFunctions.popovers();

    flsFunctions.modals();
    flsFunctions.tabs();
    flsFunctions.korpusHover();


    addEventListener('resize', (event) => {

    });


    addEventListener('scroll', (event) => {

    });


});





