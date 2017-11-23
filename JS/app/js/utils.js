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

App.utils.getStyle = function (elem) {
  return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}

/**
* https://learn.javascript.ru/metrics-window#ширина-высота-страницы-с-учётом-прокрутки
**/
App.utils.scrollWidth = function () {
	return Math.max(
	  // document.body.scrollWidth, document.documentElement.scrollWidth,
	  document.body.offsetWidth, document.documentElement.offsetWidth,
	  document.body.clientWidth, document.documentElement.clientWidth
	);
}

App.utils.debounce = function (func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

App.utils.changeStyle = function (elem, styleName, styleValue) {
     try {
        elem.style[styleName] = styleValue;
      }
      catch(e) {
        elem.runtimeStyle[styleName] = styleValue;
        console.log(styleName + ':' + styleValue);
        // elem.setAttribute("style", styleName + ':' + styleValue);
    }
};