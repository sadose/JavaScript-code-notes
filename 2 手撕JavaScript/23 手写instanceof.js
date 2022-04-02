/**************************************************
 * 23 手写instanceof
 * Dasen Sun
 * 2022-03-16
 **************************************************/


const myInstanceof = function (obj, type) {
    // 基本数据类型都返回false
    if (typeof obj !== "object" && typeof obj !== "function" || obj === null) return false;
    let proto = Object.getPrototypeOf(obj);
    while (true) {
        if (proto === null) return false;
        if (proto === type.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
};

const arr = [];
console.log(myInstanceof(arr, Array)); // true
const obj = {};
console.log(myInstanceof(obj, Object)); // true
console.log(myInstanceof(arr, Object)); // true
console.log(myInstanceof(obj, Array)); // false