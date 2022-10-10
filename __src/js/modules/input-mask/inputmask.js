
class InputMask {

    constructor(selector = '', options = {}) {
        this.el = this.getElement(selector);
        if (!this.el) return console.log('Что-то не так с селектором');
        var data_set = options.layout;
        this.layout = this.el.dataset.data_set || '+_ (___) ___-__-__';
        this.maskreg = this.getRegexp();
        this.setListeners();
    }


    getRegexp = function () {
        var str = this.layout.replace(/_/g, '\\d');
        str = str.replace(/\(/g, '\\(');
        str = str.replace(/\)/g, '\\)');
        str = str.replace(/\+/g, '\\+');
        str = str.replace(/\s/g, '\\s');
        return str;
    };

    mask = function (e) {
        var _this = e.target,
            matrix = this.layout,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = _this.value.replace(/\D/g, "");

        if (def.length >= val.length) val = def;
        _this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

        if (e.type == "blur") {
            var regexp = new RegExp(this.maskreg);
            if (!regexp.test(_this.value)) _this.value = "";
        } else {
            this.setCursorPosition(_this.value.length, _this);
        }
    };

    setCursorPosition = function (pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos); else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    };

    setListeners = function () {
        this.el.addEventListener("input", this.mask.bind(this), false);
        this.el.addEventListener("focus", this.mask.bind(this), false);
        this.el.addEventListener("blur", this.mask.bind(this), false);
    };

    getElement = function (selector) {
        if (selector === undefined) return false;
        if (this.isElement(selector)) return selector;

        if (typeof selector == 'string') {
            var el = document.querySelector(selector);
            if (this.isElement(el)) return el;
        }

        return false;
    };

    isElement = function (element) {
        return element instanceof Element || element instanceof HTMLDocument;
    };

}

export default InputMask;