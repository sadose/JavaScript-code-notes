/**************************************************
 * 09 实现delay函数
 * Dasen Sun
 * 2022-03-17
 **************************************************/


// 1 普通函数

function delay(time, fn, ...args) {
    if (typeof time !== "number" || time < 0) return;
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    }).then(() => fn(...args));
}


// 2 异步函数

async function delayAsync(time, fn, ...args) {
    if (typeof time !== "number" || time < 0) return;
    await new Promise((resolve) => {
        setTimeout(resolve, time * 1000);
    });
    return fn(...args);
}


// 3 测试

function test(arg) {
    console.log("test", arg);
}

delay(1, test, 1); // 1秒后输出：test 1
delayAsync(2, test, 2); // 2秒后输出：test 2