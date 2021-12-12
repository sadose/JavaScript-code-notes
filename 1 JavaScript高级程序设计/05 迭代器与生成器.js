/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 05 迭代器与生成器
 * Dasen Sun
 * 2021-12-12
 **************************************************/


// ==================== 迭代器 ====================

// 1 可迭代对象

// 可迭代接口
let arr = [];
let obj = {};
console.log(arr[Symbol.iterator]); // ƒ values()
console.log(obj[Symbol.iterator]); // undefined

// 使用迭代结构
let nums = [1,2,3];
for (const num of nums) {
    console.log(num);
}
// 1
// 2
// 3


// 2 直接使用迭代器

let arr = [1,2,3];
let iter = arr[Symbol.iterator](); // 取得arr的迭代器对象
console.log(iter); // Array Iterator
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: undefined, done: true}
console.log(iter.next()); // {value: undefined, done: true}


// 3 自定义迭代器

// 实现next方法的对象
class Counter {
    constructor(end) {
        this.count = 0;
        this.end = end;
    }
    next() {
        if(this.count < this.end) {
            return {value: this.count++, done: false};
        } else {
            return {value: undefined, done: true};
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
let counter = new Counter(3);
for (const c of counter) {
    console.log(c);
}
// 0
// 1
// 2
for (const c of counter) {
    console.log(c);
}
// 无输出

// 闭包改进迭代器
class Counter {
    constructor(end) {
        this.count = 0;
        this.end = end;
    }
    [Symbol.iterator]() {
        let count = 0;
        let end = this.end;
        return {
            next() {
                if(count < end) {
                    return {value: count++, done: false};
                } else {
                    return {value: undefined, done: true};
                }
            }
        };
    }
}
let counter = new Counter(3);
for (const c of counter) {
    console.log(c);
}
// 0
// 1
// 2
for (const c of counter) {
    console.log(c);
}
// 0
// 1
// 2


// 4 提前关闭迭代器

// 迭代器的return方法
class Counter {
    constructor(end) {
        this.count = 0;
        this.end = end;
    }
    [Symbol.iterator]() {
        let count = 0;
        let end = this.end;
        return {
            next() {
                if(count < end) {
                    return {value: count++, done: false};
                } else {
                    return {value: undefined, done: true};
                }
            },
            return() {
                console.log("迭代器提前关闭啦！");
                return { done: true };
            }
        };
    }
}
let counter = new Counter(3);
for (const c of counter) {
    console.log(c);
    if(c>0) break;
}
// 0
// 1
// 迭代器提前关闭啦！
for (const c of counter) {
    console.log(c);
    if(c>1) break;
}
// 0
// 1
// 2
// 迭代器提前关闭啦！

// 不可关闭的迭代器
let arr = [1,2,3,4,5,6];
let iter = arr[Symbol.iterator]();
for (const i of iter) {
    console.log(i);
    if(i>2) break;
}
console.log("继续迭代");
for (const i of iter) {
    console.log(i);
}
// 1
// 2
// 3
// 继续迭代
// 4
// 5
// 6


// 5 扩展操作符

let arr1 = [1, 2, 3];
let arr2 = [...arr1];
let arr3 = [0, ...arr2, 4, 5, 6];
console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3]
console.log(arr3); // [0, 1, 2, 3, 4, 5, 6]


// ==================== 生成器 ====================

// 1 生成器状态

function * generator() {
    console.log("生成器开始执行了！");
    yield "第1次返回值";
    console.log("又开始执行了！");
    yield "第2次返回值";
    console.log("又又开始执行了！");
    yield "第3次返回值";
    console.log("要结束了！");
    return "Bye!"
}
let g = generator(); // 未开始执行
let r = g.next(); // 生成器开始执行了！
console.log(r); // {value: '第1次返回值', done: false}
r = g.next(); // 又开始执行了！
console.log(r); // {value: '第2次返回值', done: false}
r = g.next(); // 又又开始执行了！
console.log(r); // {value: '第3次返回值', done: false}
r = g.next(); // 要结束了！
console.log(r); // {value: 'Bye!', done: true}
r = g.next();
console.log(r); // {value: undefined, done: true}


// 2 迭代生成器

// 每次迭代新的生成器
function * generator() {
    yield "val1";
    yield "val2";
    yield "val3";
    return "Bye"
}
for (const i of generator()) {
    console.log(i);
}
// val1
// val2
// val3
console.log("再来一次"); // 再来一次
for (const i of generator()) {
    console.log(i);
}
// val1
// val2
// val3

// 迭代同一个生成器
function * generator() {
    yield "val1";
    yield "val2";
    yield "val3";
    return "Bye"
}
let g = generator();
for (const i of g) {
    console.log(i);
}
// val1
// val2
// val3
for (const i of g) {
    console.log(i);
}
// 没有输出


// 3 yield关键字输入输出

function * generator() {
    let a = 1;
    a *= yield a; // (1)
    a *= yield a; // (2)
    a *= yield a; // (3)
    return a;
}
let g = generator(); // 创建生成器
console.log(g.next()); // 第一次next仅仅是为了启动生成器，获得了(1)中yield的值，但不会向yield传值
console.log(g.next(2)); // 向(1)中yield传入2，生成器使a乘以2，同时获得了(2)中yield的值
console.log(g.next(3)); // 向(2)中yield传入3，生成器使a乘以3，同时获得了(3)中yield的值
console.log(g.next(4)); // 向(3)中yield传入4，生成器使a乘以4，同时获得了返回值


// 4 yield *

function * generator() {
    yield * [1,2,3];
}
let g = generator();
console.log(g.next()); // {value: 1, done: false}
console.log(g.next()); // {value: 2, done: false}
console.log(g.next()); // {value: 3, done: false}
console.log(g.next()); // {value: undefined, done: true}


// 5 使用生成器函数作为默认迭代器

let obj = new class {
    constructor() {
        this.values = [1,2,3];
    }
    * [Symbol.iterator]() {
        yield * this.values;
    }
}();
for (const i of obj) {
    console.log(i);
}
// 1
// 2
// 3


// 6 提前关闭生成器

// return方法
function * generator() {
    yield * [1,2,3,4,5,6];
}
let g = generator();
for (const i of g) {
    console.log(i);
    if(i>2) break;
}
// 1
// 2
// 3
console.log(g.next()); // {value: undefined, done: true}
for (const i of g) {
    console.log(i);
}

// throw方法
function * generator() {
    for (const i of [1,2,3,4]) {
        try {
            yield i;
        } catch (e) {
            console.log(e);
        }
    }
}
let g = generator();
console.log(g.next()); // {value: 1, done: false}
g.throw("啊呀呀！出错了呢！");
let r = g.next(); // 啊呀呀！出错了呢！
console.log(r); // {value: 3, done: false}
console.log(g.next()); // {value: 4, done: false}
console.log(g.next()); // {value: undefined, done: true}
