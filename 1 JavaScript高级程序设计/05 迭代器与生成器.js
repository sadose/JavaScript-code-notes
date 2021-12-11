/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 05 迭代器与生成器
 * Dasen Sun
 * 2021-12-11
 **************************************************/


// // ==================== 迭代器 ====================

// // 1 可迭代对象

// // 可迭代接口
// let arr = [];
// let obj = {};
// console.log(arr[Symbol.iterator]); // ƒ values()
// console.log(obj[Symbol.iterator]); // undefined

// // 使用迭代结构
// let nums = [1,2,3];
// for (const num of nums) {
//     console.log(num);
// }
// // 1
// // 2
// // 3


// // 2 直接使用迭代器

// let arr = [1,2,3];
// let iter = arr[Symbol.iterator](); // 取得arr的迭代器对象
// console.log(iter); // Array Iterator
// console.log(iter.next()); // {value: 1, done: false}
// console.log(iter.next()); // {value: 2, done: false}
// console.log(iter.next()); // {value: 3, done: false}
// console.log(iter.next()); // {value: undefined, done: true}
// console.log(iter.next()); // {value: undefined, done: true}


// // 3 自定义迭代器

// // 实现next方法的对象
// class Counter {
//     constructor(end) {
//         this.count = 0;
//         this.end = end;
//     }
//     next() {
//         if(this.count < this.end) {
//             return {value: this.count++, done: false};
//         } else {
//             return {value: undefined, done: true};
//         }
//     }
//     [Symbol.iterator]() {
//         return this;
//     }
// }
// let counter = new Counter(3);
// for (const c of counter) {
//     console.log(c);
// }
// // 0
// // 1
// // 2
// for (const c of counter) {
//     console.log(c);
// }
// // 无输出

// // 闭包改进迭代器
// class Counter {
//     constructor(end) {
//         this.count = 0;
//         this.end = end;
//     }
//     [Symbol.iterator]() {
//         let count = 0;
//         let end = this.end;
//         return {
//             next() {
//                 if(count < end) {
//                     return {value: count++, done: false};
//                 } else {
//                     return {value: undefined, done: true};
//                 }
//             }
//         };
//     }
// }
// let counter = new Counter(3);
// for (const c of counter) {
//     console.log(c);
// }
// // 0
// // 1
// // 2
// for (const c of counter) {
//     console.log(c);
// }
// // 0
// // 1
// // 2


// // 4 提前关闭迭代器

// // 迭代器的return方法
// class Counter {
//     constructor(end) {
//         this.count = 0;
//         this.end = end;
//     }
//     [Symbol.iterator]() {
//         let count = 0;
//         let end = this.end;
//         return {
//             next() {
//                 if(count < end) {
//                     return {value: count++, done: false};
//                 } else {
//                     return {value: undefined, done: true};
//                 }
//             },
//             return() {
//                 console.log("迭代器提前关闭啦！");
//                 return { done: true };
//             }
//         };
//     }
// }
// let counter = new Counter(3);
// for (const c of counter) {
//     console.log(c);
//     if(c>0) break;
// }
// // 0
// // 1
// // 迭代器提前关闭啦！
// for (const c of counter) {
//     console.log(c);
//     if(c>1) break;
// }
// // 0
// // 1
// // 2
// // 迭代器提前关闭啦！

// // 不可关闭的迭代器
// let arr = [1,2,3,4,5,6];
// let iter = arr[Symbol.iterator]();
// for (const i of iter) {
//     console.log(i);
//     if(i>2) break;
// }
// console.log("继续迭代");
// for (const i of iter) {
//     console.log(i);
// }
// // 1
// // 2
// // 3
// // 继续迭代
// // 4
// // 5
// // 6


// // 5 扩展操作符

// let arr1 = [1, 2, 3];
// let arr2 = [...arr1];
// let arr3 = [0, ...arr2, 4, 5, 6];
// console.log(arr1); // [1, 2, 3]
// console.log(arr2); // [1, 2, 3]
// console.log(arr3); // [0, 1, 2, 3, 4, 5, 6]


// ==================== 生成器 ====================

// 1 