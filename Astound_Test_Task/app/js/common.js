var App = App || {};

App.utils = {
    addListener: null,
    removeListener: null
};

if (typeof window.addEventListener === "function") {
    App.utils.addListener = function (e, type, fn) {
        e.addEventListener(type, fn, false);
    }
    App.utils.removeListener = function (e, type, fn) {
        e.removeEventListener(type, fn, false);
    }
}

else if (typeof document.attachEvent === "function") {
    App.utils.addListener = function (e, type, fn) {
        e.attachEvent("on" + type, fn);
    }
    App.utils.removeListener = function (e, type, fn) {
        e.detachEvent("on" + type, fn);
    }
}

else {
    App.utils.addListener = function (e, type, fn) {
        e["on" + type] = fn;
    }
    App.utils.removeListener = function (e, type, fn) {
        e["on" + type] = null;
    }
}
/**
* https://learn.javascript.ru/metrics-window#ширина-высота-страницы-с-учётом-прокрутки
**/
App.libs = App.libs || {};
App.libs.scrollWidth = function () {
	return Math.max(
	  document.body.scrollWidth, document.documentElement.scrollWidth,
	  document.body.offsetWidth, document.documentElement.offsetWidth,
	  document.body.clientWidth, document.documentElement.clientWidth
	);
}

App.libs.getStyle = function (elem) {
  return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}