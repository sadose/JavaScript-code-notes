/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 10 BOM
 * Dasen Sun
 * 2022-01-16
 **************************************************/


// ==================== window对象 ====================

// 1 显示当前窗口大小

document.getElementById("view1").innerText = window.screenLeft.toString();
document.getElementById("view2").innerText = window.screenTop.toString();


// 2 显示当前浏览器像素比

document.getElementById("view").innerText = window.devicePixelRatio.toString();


// 3 获取视口尺寸

// 常规做法
let pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}

// 更简单的做法
var pageWidth = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var pageHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;


// 4 滚动视口

// 正常滚动
window.scrollTo({
    left: 100,
    top: 100,
    behavior: 'auto'
});

// 平滑滚动
window.scrollTo({
    left: 100,
    top: 100,
    behavior: 'smooth'
});


// 5 跳转与打开

// 打开链接
window.open("https://sadose.github.io/", "myFrame");

// 新窗口打开
window.open("https://sadose.github.io/",
    "blogWindow",
    "height=800, width=800, top=10, left=10, resizable=yes");


// 6 定时器

// 使用 setInterval
let num = 0;
const id = setInterval(() => {
    num++;
    if (num >= 10) clearInterval(id);
}, 500);

// 使用 setTimeout 代替 setInterval
let num = 0;
(function increace() {
    setTimeout(() => {
        num++;
        if (num < 10) increace();
    }, 500);
})();


// ==================== navigator对象 ====================

// 1 检测插件

let hasPlugin = function (name) {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}


// ==================== history对象 ====================

// 1 go()方法

// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);
// 后退一页
history.back();
// 前进一页
history.forward();


// 2 状态管理

// push状态
let stateObject = { description: "这是一个描述" };
history.pushState(stateObject, "Title", "baz.html");

// 状态后退
window.addEventListener("popstate", (event) => {
    let state = event.state;
    if (state) {
        processState(state);
    }
});
