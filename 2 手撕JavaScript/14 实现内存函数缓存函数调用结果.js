/**************************************************
 * 14 实现内存函数缓存函数调用结果
 * Dasen Sun
 * 2022-03-15
 **************************************************/


// 问题描述：
// 写一个内存函数 memoize ，给它一个计算函数，它把函数包装并返回
// 包装函数第一次调用进行计算并缓存，以后每次调用函数都返回已缓存的计算结果


// 1 单一结果函数的包装函数 - 一个变量记录结果

// 缺陷：能够包装的函数只是一个单一的结算过程，即不需要参数且返回的结果始终不变

function memoizeInvariable(fn) {
    let result;
    return function () {
        if (result === undefined) {
            result = fn();
        }
        return result;
    };
}

function test1() {
    console.log("进行计算...");
    return 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10;
}

const memoizeTest1 = memoizeInvariable(test1);

console.log(memoizeTest1());
// 进行计算...
// 3628800
console.log(memoizeTest1());
// 3628800
console.log(memoizeTest1());
// 3628800


// 2 多结果函数的包装函数 - 使用 Map 记录结果

// 缺陷：缓存的 Map 可能不断增长占用大量内存

function memoize(fn) {
    const map = new Map();
    return function (...args) {
        const key = args.map((val) => String(val)).join(",");
        if (!map.has(key)) {
            map.set(key, fn(...args));
        }
        return map.get(key);
    };
}

function test2(a, b) {
    console.log("进行计算...");
    return a * b;
}

const memoizeTest2 = memoize(test2);

console.log(memoizeTest2(2, 3));
// 进行计算...
// 6
console.log(memoizeTest2(2, 3));
// 6
console.log(memoizeTest2(2, 3));
// 6

console.log(memoizeTest2(4, 5));
// 进行计算...
// 20
console.log(memoizeTest2(4, 5));
// 20
console.log(memoizeTest2(4, 5));
// 20

console.log(memoizeTest2(6, 8));
// 进行计算...
// 48
console.log(memoizeTest2(6, 8));
// 48
console.log(memoizeTest2(6, 8));
// 48


// 3 进一步优化

// 基于 2 中的 memoize 函数进行优化，将 map 更换为使用了 LRU 算法的数据结构
// LRU 算法参见 「 手撕万物 - 2 JavaScript应用 - 01 LRU缓存置换算法.js 」