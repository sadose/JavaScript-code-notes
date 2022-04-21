/**************************************************
 * 37 带并发限制的请求数据
 * Dasen Sun
 * 2022-04-16
 **************************************************/


// 1 获取数据的函数，返回一个 Promise

// XHR 实现
function getDateByXHR(urls) {
    let index = 0;
    return function getNext() {
        if (index >= urls.length) return null;
        const p = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
                resolve(xhr.responseText);
            };
            xhr.onerror = function (e) {
                reject(e.type);
            };
            xhr.open("GET", urls[index]);
            xhr.send();
        });
        ++index;
        return p;
    };
}

// fetch 实现
function getDateByFetch(urls) {
    let index = 0;
    return function getNext() {
        if (index >= urls.length) return null;
        return fetch(urls[index++]);
    };
}


// 2 并发限制

const getDate = getDateByFetch;

function concurrentRequest(urls, resolveFn, rejectFn, concurrency = Infinity) {
    let limit = Math.min(concurrency, urls.length); // 实际的并发限制数
    const getNext = getDate(urls); // 请求数据的函数
    const startARequest = () => {
        // 开始一个新的请求的函数
        const p = getNext();
        if (p !== null) {
            p.then(resolveFn, rejectFn); // 绑定解决和拒绝的处理函数
            p.finally(() => startARequest()); // 每完成一个请求，就开始下一个新的请求，保证并发数尽可能跑满
        }
    };
    // 首次运行，开启 limit 个请求
    while (limit--) {
        startARequest();
    }
};


// 3 使用并发池的实现

function concurrentRequestByPool(urls, resolveFn, rejectFn, concurrency = Infinity) {
    let limit = Math.min(concurrency, urls.length); // 实际的并发限制数
    const getNext = getDate(urls); // 请求数据的函数
    const pool = []; // 请求池
    const startARequest = () => {
        // 开始一个新的请求的函数
        const p = getNext(); // 获取一个请求
        if (p !== null) {
            p.then(resolveFn, rejectFn); // 绑定解决和拒绝的处理函数
            p.finally(() => {
                pool.splice(pool.indexOf(p), 1); // 落定后从请求池中移除
                startARequest(); // 开启下一个请求
            });
            pool.push(p); // 加入请求池
        }
    };
    // 首次运行，开启 limit 个请求
    while (limit--) {
        startARequest();
    }
};


// 4 使用 Promise.race() 的实现

function concurrentRequestByRace(urls, resolveFn, rejectFn, concurrency = Infinity) {
    let limit = Math.min(concurrency, urls.length); // 实际的并发限制数
    const getNext = getDate(urls); // 请求数据的函数
    const pool = []; // 请求池
    const addTask = () => {
        // 开始一个新的任务
        const p = getNext(); // 获取一个请求
        if (p !== null) {
            p.then(resolveFn, rejectFn); // 绑定解决和拒绝的处理函数
            p.finally(() => pool.splice(pool.indexOf(p), 1)); // 落定后从请求池中移除
            pool.push(p); // 加入请求池
        }
    };
    const race = () => {
        // 请求池中的任务开始赛跑
        Promise.race(pool).finally(() => {
            addTask(); // 添加一个新的任务
            race(); // 重新开始赛跑
        });
    }
    // 首次运行，开启 limit 个请求并加入请求池
    while (limit--) {
        addTask();
    }
    race();
};