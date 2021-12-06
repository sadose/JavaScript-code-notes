/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 02 值、作用域与内存
 * Dasen Sun
 * 2021-12-06
 **************************************************/


// ==================== 值 ====================

// 1 判断值的类型

// 原始值
let name = "Dasen";
console.log(typeof name === "number"); // false
console.log(typeof name === "string"); // true

// 引用值
let arr = [];
console.log(typeof arr === "object"); // true
console.log(arr instanceof Array); // true


// ==================== 垃圾回收 ====================

// 1 内存泄漏

// 意外声明全局变量
function setName() {
    name = "Dasen";
}

// 定时器内存泄漏
let name = "Dasen";
setInterval(() => {
    console.log(name);
}, 1000);

// 闭包造成的内存泄漏
let outer = function () {
    let name = "Dasen";
    return function () {
        return name;
    };
};
