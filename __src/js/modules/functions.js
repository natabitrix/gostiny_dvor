export function isWebP() {

    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}


export function isMobile() {
    let className = navigator.userAgentData.mobile === true ? 'mobile' : 'desktop';
    document.documentElement.classList.add(className);
}


export function ajax() {

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

}


/**if (window.getCookie("cookie_name") !== "Y") */
export function getCookie(a) {
    var b = document.cookie.match(new RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return b ? decodeURIComponent(b[1]) : undefined
}

/**window.setCookie("cookie_name", "Y", {
        expires: 31557600,
        path: "/",
        domain: window.location.hostname
    }); */
export function setCookie(b, f, c) {
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
export function getRandomWholeNumber(min, max) {
    return (Math.random() * (max - min) + min);
}

/**Перемешивает массив */
export function shuffle(array) {
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

/**Toggle swiper slider full-screen */
export function swiperFullScreen() {
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
export function collapseContent() {
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
export function resizeTextarea() {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {

        tx[i].style.height = (tx[i].scrollHeight) + "px";
        var borderRadius = 70;
        if (tx[i].offsetHeight > 60)
            borderRadius = 24;
        tx[i].style.borderRadius = borderRadius + "px";


        tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
        this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
        var borderRadius = 70;
        if (this.offsetHeight > 60)
            borderRadius = 24;
        this.style.borderRadius = borderRadius + "px";
    }
}

/**Всплывающее окно по наведению на кнопку, закрытие по клику по кнопке закрытия */
export function popoversInit() {
    var div = document.createElement("div");
    div.classList.add("popover-placeholder");
    document.querySelector("body").append(div);
    popovers();

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

}


/**Модальное всплывающее окно по клику на кнопку, закрытие по клику по кнопке закрытия */
export function modals() {

    if(document.querySelectorAll(".modal").length > 0)
    {
        Array.prototype.forEach.call(document.querySelectorAll('.modal'), (modal) => {

            const modal_btn = document.querySelector('[data-modal='+modal.id+']');
            const modal_btn_close = modal.querySelector(".modal-close");
            //const modal_overlay = modal.querySelector(".modal-overlay");
            const modal_content = modal.querySelector(".modal-content");

            modalHide(modal);

            modal_btn.addEventListener("click", function () {
                modalShow(modal);
                
                //setTimeout(function() { 
                //    modal_overlay.classList.add("active");
                //}, 30);
            });

            modal_btn_close.addEventListener("click", function () {
                modalHide(modal);
                //modal_overlay.classList.remove("active");
            });

            // modal_overlay.addEventListener("click", function () {
            //     modalHide(modal);
            //     modal_overlay.classList.remove("active");
            // });

            document.addEventListener("click", function (event) {
                var modalVisible = modal.getAttribute('data-hidden') !== "true";
                if (
                    modalVisible && 
                    !modal_btn.contains(event.target) && 
                    !modal_content.contains(event.target)
                ) {
                    modalHide(modal);
                }
            });

        });
    }

    function modalShow(modal) {
        modal.style.display = "block";
        setTimeout(function() { 
            modal.classList.add("active");
            document.querySelector('body').classList.add("lock");
            modal.setAttribute('data-hidden', ''); 
        }, 30);

        
    }


    function modalHide(modal) {      
        modal.classList.remove("active");
        document.querySelector('body').classList.remove("lock");
        modal.setAttribute('data-hidden', 'true');
        setTimeout(function() { 
            modal.style.display = "none";
        }, 100);

        
        
    }

}



/**Tabs */
export function tabs() {
    const tabList = document.querySelectorAll(".tab-list-item");

    //toggle tab
    Array.prototype.forEach.call(tabList, function (tabListItem) {
        tabListItem.addEventListener("click", function () {
            tabsHide();
            tabShow(tabListItem);
        });
    });

    //установить активной первую табу при открытии модала
    Array.prototype.forEach.call(document.querySelectorAll('[data-modal]'), function (modal_btn) {
        modal_btn.addEventListener("click", function () {
            const modal = document.getElementById(modal_btn.getAttribute('data-modal'));
            if(modal.querySelector(".tabs")){
                var tabListModal = modal.querySelectorAll(".tab-list-item");
                tabsHide();
                tabShow(tabListModal[0]);
            }
        });
    });



    function tabShow(tabListItem) {
        const thisId = tabListItem.id;
        const tabContentId = thisId + "-content";
        let thisTabContentItem = document.getElementById(tabContentId);
        //Добавить активность активной tab
        tabListItem.classList.add("active");
        //Открытие активной tab-content
        thisTabContentItem.classList.remove("d-none");
    }

    function tabsHide() {
        const tabList = document.querySelectorAll(".tab-list-item");
        const tabContent = document.querySelectorAll(".tab");
        //Убрать активность у всех tab
        Array.prototype.forEach.call(tabList, function (tabListItem) {
            tabListItem.classList.remove("active");
        });
        //Скрытие всех tab-content
        Array.prototype.forEach.call(tabContent, function (tabContentItem) {
            tabContentItem.classList.add("d-none");
        });
        
    }


}


export function korpusHover() {
    
    if(document.querySelectorAll(".korpus").length > 0)
    {
        Array.prototype.forEach.call(document.querySelectorAll('.korpus'), (korpus) => {
            const kontur = document.getElementById(korpus.getAttribute("data-kontur"));

            korpus.addEventListener('mouseenter', e => {
                kontur.classList.add('active');
            });
            korpus.addEventListener('mouseleave', e => {
                kontur.classList.remove('active');
            });
        })
    }
}



// export function findBgMiddle(event) {
//     const element = document.querySelector('.bg');
//     const viewportHeight = document.documentElement.clientHeight;
//     const viewporCenter = viewportHeight/2;

//     var elementTop = element.getBoundingClientRect().top;
//     var elementHeight = element.getBoundingClientRect().height;
//     var elementCenter = elementTop + elementHeight / 2;

//     var fixed = false;

//     if(elementCenter < viewporCenter) {
//         element.classList.add('fixed');
//         fixed = true;
//     }
// }