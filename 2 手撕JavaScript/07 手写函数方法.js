/**************************************************
 * 07 手写函数方法
 * Dasen Sun
 * 2022-03-14
 **************************************************/


// 1 apply 方法

Function.prototype.myApply = function (thisArg, argArray) {
    // 容错处理
    if (typeof thisArg === "undefined" || thisArg === null) {
        thisArg = window;
    } else if (typeof thisArg !== "function" && typeof thisArg !== "object") {
        thisArg = Object(thisArg);
    }
    argArray = argArray ? argArray : [];
    // 创建一个独一无二的键，防止原有的键被覆盖
    const key = Symbol();
    thisArg[key] = this;
    // 调用函数
    const result = thisArg[key](...argArray);
    // 删除临时添加的键
    delete thisArg[key];
    // 返回结果
    return result;
};


// 2 call 方法

Function.prototype.myCall = function (thisArg, ...args) {
    // 容错处理
    if (typeof thisArg === "undefined" || thisArg === null) {
        thisArg = window;
    } else if (typeof thisArg !== "function" && typeof thisArg !== "object") {
        thisArg = Object(thisArg);
    }
    // 创建一个独一无二的键，防止原有的键被覆盖
    const key = Symbol();
    thisArg[key] = this;
    // 调用函数
    const result = thisArg[key](...args);
    // 删除临时添加的键
    delete thisArg[key];
    // 返回结果
    return result;
};


// 3 bind 方法

Function.prototype.myBind = function (thisArg, ...args) {
    const fn = this;
    return function newFn(...newFnArray) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArray)
        }
        return fn.myApply(thisArg, [...args, ...newFnArray])
    }
};


// 4 测试

function test(a, b, c) {
    console.log(this, c, b, a);
}

const obj = {
    name: "obj",
};

test.apply(obj, [1, 2, 3]); // obj 3 2 1
test.myApply(obj, [1, 2, 3]); // obj 3 2 1
test.apply("Dasen", [4, 5, 6]); // String ('Dasen') 6 5 4
test.myApply("Dasen", [4, 5, 6]); // String ('Dasen') 6 5 4

test.call(obj, 1, 2, 3); // obj 3 2 1
test.myCall(obj, 1, 2, 3); // obj 3 2 1
test.call("Dasen", 4, 5, 6); // String ('Dasen') 6 5 4
test.myCall("Dasen", 4, 5, 6); // String ('Dasen') 6 5 4

const newTest1 = test.bind(obj, 1, 2);
const newTest2 = test.myBind(obj, 1, 2);
const newTest3 = test.bind("Dasen", 4, 5);
const newTest4 = test.myBind("Dasen", 4, 5);
newTest1(3); // obj 3 2 1
newTest2(3); // obj 3 2 1
newTest3(6); // String ('Dasen') 6 5 4
newTest4(6); // String ('Dasen') 6 5 4