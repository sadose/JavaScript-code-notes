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

function promiseMap(urls, resolveFn, rejectFn, concurrency = Infinity) {
    const count = 0; // 计数当前正在运行中的请求
    const limit = Math.min(concurrency, urls.length); // 实际的并发限制数
    const getNext = getDate(urls); // 请求数据的函数
    const startARequest = () => {
        // 开始一个新的请求的函数
        const p = getNext();
        if (p !== null) {
            p.then((res) => resolveFn(res), (e) => rejectFn(e)); // 绑定解决和拒绝的处理函数
            p.finally(() => startARequest()); // 每完成一个请求，就开始下一个新的请求，保证并发数尽可能跑满
        }
    };
    // 首次运行，开启 limit 个请求
    while (limit--) {
        startARequest();
    }
};