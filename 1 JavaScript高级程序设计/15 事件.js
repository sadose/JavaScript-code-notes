/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 15 事件
 * Dasen Sun
 * 2022-03-10
 **************************************************/


// ==================== 事件处理程序 ====================

// 1 DOM0 事件处理程序

let btn = document.getElementById("myBtn");
btn.onclick = function () {
    console.log("Clicked");
};


// 2 DOM2 事件处理程序

let btn = document.getElementById("myBtn");
btn.addEventListener("click", () => {
    console.log(this.id);
}, false);


// 3 使用 DOM2 方法更换绑定的事件处理程序

let fun = null;

function setEventListener(dom, event, fn) {
    if (fun) dom.removeEventListener(event, fn);
    dom.addEventListener(event, fn);
    fun = fn;
}


// 4 跨浏览器事件处理程序

const EventUtil = {
    addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};


// ==================== 事件对象 ====================

// 1 阻止 DOM 事件继续冒泡或捕获

let btn = document.getElementById("myBtn");
btn.onclick = function (event) {
    console.log("Clicked");
    event.stopPropagation();
};
document.body.onclick = function (event) {
    console.log("Body clicked");
};


// 2 IE 事件对象

// DOM0 方式的事件对象
const btn = document.getElementById("myBtn");
btn.onclick = function () {
    let event = window.event;
    console.log(event.type); // "click"
};

// IE 事件处理程序的事件对象
const btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function (event) {
    console.log(event.type); // "click"
});


// 3 跨浏览器事件对象

const EventUtil = {
    addHandler(element, type, handler) {
        // 代码略
    },
    getEvent(event) {
        returnevent ? event : window.event;
    },
    getTarget(event) {
        returnevent.target || event.srcElement;
    },
    preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler(element, type, handler) {
        // 代码略
    },
    stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};