/**************************************************
 * 29 实现compose函数
 * Dasen Sun
 * 2022-03-18
 **************************************************/


function compose(...fns) {
    const firstFn = fns.shift();
    return function (...args) {
        return fns.reduce((pre, cur) => cur(pre), firstFn(...args));
    };
}


// 测试

function fn1(a, b, c) {
    return a + b + c;
}

function fn2(para) {
    return para.toString();
}

function fn3(para) {
    let reverse = "";
    for (const c of para) {
        reverse = c + reverse;
    }
    return para + reverse;
}

function fn4(para) {
    return para + "!!!";
}

const finallyFn = compose(fn1, fn2, fn3, fn4);
console.log(finallyFn(100, 20, 3)); // 123321!!!