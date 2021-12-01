/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 09 异步编程
 * Dasen Sun
 * 2021-12-01
 **************************************************/


// ==================== 异步 ====================

// 异步
function double(value) {
    setTimeout(() => {
        setTimeout(console.log, 0, value*2);
    }, 1000);
}
double(2); // 大约1000毫秒后输出 4

// 回调函数处理异步返回值
function double(value, callback) {
    setTimeout(() => {
        callback(value*2); // 调用回调函数处理异步返回值
    }, 1000);
}
function callback(value) {
    console.log(value);
}
double(2, callback);

// 添加失败回调和嵌套异步回调
function double(value, successCallback, failureCallback) {
    setTimeout(() => {
        try {
            if(typeof value !== "number") {
                throw new Error("I need a number.");
            }
            successCallback(value*2); // 调用回调函数处理异步返回值
        } catch (error) {
            failureCallback(error);
        }
    }, 1000);
}
function successCallback(value) { // 简单的成功处理程序
    console.log(value);
}
function successCallback(value) { // 再次请求异步结果的处理程序
    double(value, (x) => console.log("Success:", x));
}
function failureCallback(error) {
    console.log(error);
}
double(2, successCallback, failureCallback);
double("2", successCallback, failureCallback); // Error: I need a number.


// ==================== 期约 ====================

// 1 期约状态

// 执行器函数
let p = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
    setTimeout(reject, 5000);
});


// 2 期约方法

// finally方法返回一个待定期约的例子
let p1 = Promise.resolve('foo');
let p2 = p1.finally(
    () => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("解决了！");
                resolve('bar');
            }, 100);
        })
    });
console.log(p2); // 立即输出： Promise <pending>
setTimeout(console.log, 0, p2); // 立即输出： Promise {<fulfilled>: 'foo'}
// 100 毫秒后输出： 解决了！
setTimeout(() => setTimeout(console.log, 0, p2), 200); // 200 毫秒后输出： Promise <resolved>: foo


// 3 期约连锁与合成

// 期约连锁
let p = new Promise((resolve, reject) => {
    console.log("期约 1 开始执行");
    setTimeout(() => {
        console.log("期约 1 解决为 1");
        resolve(1);
    }, 1000);
});
p.then((val) => {
    return new Promise((resolve, reject) => {
        console.log("期约 2 开始执行");
        setTimeout((val) => {
            console.log("期约 2 解决为", val*2);
            resolve(val*2);
        }, 1000, val);
    });
}).then((val) => {
    return new Promise((resolve, reject) => {
        console.log("期约 3 开始执行");
        setTimeout((val) => {
            console.log("期约 3 解决为", val*3);
            resolve(val*3);
        }, 1000, val);
    });
}).then((val) => {
    console.log("所有异步任务解决完毕，最终的值为", val);
});
// 立即输出：期约 1 开始执行
// 约 1 秒后：期约 1 解决为 1
// 约 1 秒后：期约 2 开始执行
// 约 2 秒后：期约 2 解决为 2
// 约 2 秒后：期约 3 开始执行
// 约 3 秒后：期约 3 解决为 6
// 约 3 秒后：所有异步任务解决完毕，最终的值为 6

// 期约合成 all
let p1 = Promise.all([
    Promise.resolve(3),
    Promise.resolve(1),
    Promise.resolve(2)
]);
p1.then((val) => console.log(val)); // [3, 1, 2]
let p2 = Promise.all([
    new Promise(() => {}),
    Promise.reject(new Error("error!")),
    Promise.reject(new Error("ignore")),
    Promise.resolve(0)
]);
p2.catch((val) => console.log(val)); // Error: error!

// 期约合成 race
let p1 = Promise.race([
    Promise.resolve(3),
    Promise.resolve(1),
    Promise.resolve(2)
]);
p1.then((val) => console.log(val)); // 3
let p2 = Promise.race([
    new Promise(() => {}),
    Promise.resolve(0),
    Promise.reject(new Error("error!")),
    Promise.resolve(1)
]);
p2.then((val) => console.log(val)); // 0
let p3 = Promise.race([
    Promise.reject(new Error("error!")),
    Promise.resolve(0),
    Promise.resolve(1)
]);
p3.catch((val) => console.log(val)); // Error: error!


// 4 期约扩展

// 期约取消
class CancelToken {
    constructor(cancelFn) {
        this.promise = new Promise((resolve, reject) => {
            cancelFn(() => {
                setTimeout(console.log, 0, "delay cancelled");
                resolve();
            });
        });
    }
}
const startButton = document.querySelector('#start');
const cancelButton = document.querySelector('#cancel');
function cancellableDelayedResolve(delay) {
    setTimeout(console.log, 0, "set delay");
    return new Promise((resolve, reject) => {
        const id = setTimeout((() => {
            setTimeout(console.log, 0, "delayed resolve");
            resolve();
        }), delay);
        const cancelToken = new CancelToken((cancelCallback) =>
            cancelButton.addEventListener("click", cancelCallback));
        cancelToken.promise.then(() => clearTimeout(id));
    });
}
startButton.addEventListener("click", () => cancellableDelayedResolve(1000));

// 期约进度通知
class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandlers = [];
        super((resolve, reject) => {
            return executor(resolve, reject, (status) => {
                notifyHandlers.map((handler) => handler(status));
            });
        });
        this.notifyHandlers = notifyHandlers;
    }
    notify(notifyHandler) {
        this.notifyHandlers.push(notifyHandler);
        return this;
    }
}
let p = new TrackablePromise((resolve, reject, notify) => {
    function countdown(x) {
        if (x > 0) {
            notify(`${20*x}% remaining`);
            setTimeout(() => countdown(x - 1), 1000);
        } else {
            resolve();
        }
    }
    countdown(5);
});
p.notify((x) => setTimeout(console.log, 0, 'progress:', x));
p.then(() => setTimeout(console.log, 0, 'completed'));


// ==================== 异步函数 ====================

// 1 异步函数策略

// 模拟sleep函数
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
async function func() {
    const t0 = Date.now();
    await sleep(2000);
    console.log(Date.now() - t0); // 2014
}
func();

// 没有平行执行
async function randomDelay(id) {
    // 随机延迟0~1000 毫秒
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}
async function foo() {
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    await randomDelay(4);
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 1733ms elapsed

// 平行执行
async function randomDelay(id) {
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        setTimeout(console.log, 0, `${id} finished`);
        resolve();
    }, delay));
}
async function foo() {
    const t0 = Date.now();
    const p0 = randomDelay(0);
    const p1 = randomDelay(1);
    const p2 = randomDelay(2);
    const p3 = randomDelay(3);
    const p4 = randomDelay(4);
    await p0;
    await p1;
    await p2;
    await p3;
    await p4;
    setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
}
foo();
// 3 finished
// 4 finished
// 0 finished
// 1 finished
// 2 finished
// 893ms elapsed

// 平行执行且随机返回
async function randomDelay(id) {
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        resolve(id);
        console.log(`${id} finished`);
    }, delay));
}
function onResolved(id) {
    console.log(`${id} returned`);
}
const t0 = Date.now();
const p0 = randomDelay(0).then(onResolved);
const p1 = randomDelay(1).then(onResolved);
const p2 = randomDelay(2).then(onResolved);
const p3 = randomDelay(3).then(onResolved);
const p4 = randomDelay(4).then(onResolved);
const p = Promise.all([p0,p1,p2,p3,p4]).then(((t0) => {
    return () => {
        setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
    }
})(t0));
// 1 finished
// 1 returned
// 4 finished
// 4 returned
// 0 finished
// 0 returned
// 2 finished
// 2 returned
// 3 finished
// 3 returned
// 754ms elapsed

// 异步任务串联
async function fun1(x) {
    console.log("异步任务 1 开始执行");
    console.log("等待任务 1 的返回值");
    const r = await 1;
    console.log("异步任务 1 返回了", r);
    console.log("返回加工的值为", r*x);
    return r*x;
}
async function fun2(x) {
    console.log("异步任务 2 开始执行");
    console.log("等待任务 2 的返回值");
    const r = await 2;
    console.log("异步任务 2 返回了", r);
    console.log("返回加工的值为", r*x);
    return r*x;
}
async function fun3(x) {
    console.log("异步任务 3 开始执行");
    console.log("等待任务 3 的返回值");
    const r = await 3;
    console.log("异步任务 3 返回了", r);
    console.log("返回加工的值为", r*x);
    return r*x;
}
async function fun(x) {
    for (const fn of [fun1,fun2,fun3]) {
        x = await fn(x);
    }
    return x;
}
fun(1).then(console.log);
// 异步任务 1 开始执行
// 等待任务 1 的返回值
// 异步任务 1 返回了 1
// 返回加工的值为 1
// 异步任务 2 开始执行
// 等待任务 2 的返回值
// 异步任务 2 返回了 2
// 返回加工的值为 2
// 异步任务 3 开始执行
// 等待任务 3 的返回值
// 异步任务 3 返回了 3
// 返回加工的值为 6
// 6
