const EventUtil = {
    // 添加事件处理程序
    addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    // 移除事件处理程序
    removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    // 获取事件对象
    getEvent(event) {
        returnevent ? event : window.event;
    },
    // 获取 target
    getTarget(event) {
        returnevent.target || event.srcElement;
    },
    // 阻止事件默认行为
    preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 阻止事件继续传播
    stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};