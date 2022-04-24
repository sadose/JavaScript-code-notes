/**************************************************
 * 05 手写Promise方法合集
 * Dasen Sun
 * 2022-03-23
 **************************************************/


// 1 手写 Promise.all()

Promise.myAll = function (iterable) {
    return new Promise((resolve, reject) => {
        let index = 0; // 由于传入的是一个可迭代对象，并不一定是数组，可能没有 length 属性，因此使用变量手动计数
        let elementCount = 0; // 已解决的 promise 数量
        let anErrorOccurred = false; // 是否有一个错误发生了
        for (const promise of iterable) {
            const currentIndex = index; // 对每个 promise 要封闭一下 index 作用域！
            promise.then(
                (value) => {
                    if (anErrorOccurred) return; // 如果已经有错误发生，就什么也不做了
                    result[currentIndex] = value; // 将解决结果存入结果数组
                    elementCount++; // 统计解决个数
                    if (elementCount === result.length) {
                        resolve(result); // 全部解决了，最终的 promise 解决
                    }
                },
                (err) => {
                    if (anErrorOccurred) return; // 如果已经有错误发生，就什么也不做了
                    anErrorOccurred = true; // 发生了第一个错误，置标志
                    reject(err); // 最终的 promise 拒绝
                });
            index++;
        }
        if (index === 0) {
            resolve([]); // 如果是一个空迭代器，不包含 promise ，解决为空数组
            return;
        }
        const result = new Array(index); // 结果数组，要放在最后，因为 index 要在循环后才能统计出来
    });
};


// 2 手写 Promise.race()

Promise.myRace = function (iterable) {
    return new Promise((resolve, reject) => {
        let settlementOccurred = false; // 是否已经有一个解决了的 promise
        for (const promise of iterable) {
            promise.then( // 给每个 promise 添加解决和拒绝回调
                (value) => {
                    if (settlementOccurred) return; // 如果已经有一个落定了的 promise，就什么也不做了
                    settlementOccurred = true; // 发生了一个解决，置标志
                    resolve(value); // 最终的 promise 解决
                },
                (err) => {
                    if (settlementOccurred) return; // 如果已经有一个落定了的 promise，就什么也不做了
                    settlementOccurred = true; // 发生了一个拒绝，置标志
                    reject(err); // 最终的 promise 拒绝
                });
        }
    });
};


// 3 手写 Promise.allSettled()

Promise.allSettled = function (promisesArg) {
    if (!promisesArg.length) return Promise.resolve([]); // 如果是个空数组
    const promises = promisesArg.map((p) => p instanceof Promise ? p : Promise.resolve(p)); // 包装一下不是 promise 的项
    return new Promise((resolve, reject) => {
        const result = [];
        let unSettledPromiseCount = promises.length;
        promises.forEach((p, index) => {
            p.then((reason) => {
                result[index] = {
                    status: "resolve",
                    reason,
                };
            }, (reason) => {
                result[index] = {
                    status: "reject",
                    reason,
                };
            }).finally(() => {
                --unSettledPromiseCount;
                if (!unSettledPromiseCount) resolve(result);
            });
        });
    });
};


// 4 手写 Promise.retry() 超时重新请求，并在重试一定次数依然失败时输出缓存内容。

// 简易版 - 不使用缓存，仅重试
Promise.retrySimple = function (fn, maxRetry, timeout) {
    // 参数检查
    if (typeof fn !== 'function') {
        throw new TypeError('Expected a function');
    }
    maxRetry = maxRetry || 3;
    timeout = timeout || 1000;
    // 默认参数
    let retryCount = 0; // 已重试次数
    return new Promise((resolve, reject) => {
        // 内部函数，进行一次尝试
        const run = () => {
            fn().then(
                (value) => {
                    // 封装的 promise 解决
                    resolve(value);
                },
                (err) => {
                    // 超过了最大重试次数，拒绝
                    if (retryCount >= options.maxRetry) {
                        reject(err);
                        return;
                    }
                    // 没有超过最大重试次数，则重试
                    setTimeout(run, options.retryDelay);
                    retryCount++;
                });
        };
        run();
    });
};

// 完整版 - 有缓存
Promise.retry = function (fn, options) {
    // 参数检查
    if (typeof fn !== 'function') {
        throw new TypeError('Expected a function');
    }
    options = options || {};
    // 默认参数
    options = Object.assign({
        maxRetry: 3, // 默认重试次数
        retryDelay: 1000, // 默认重试时间间隔
        cache: false, // 是否缓存结果
        cacheKey: "", // 缓存 key
        cacheExpire: 0, // 缓存过期时间，单位：毫秒
        cacheMax: 0 // 缓存最大值，超过后清空缓存
    }, options);
    let retryCount = 0; // 已重试次数
    return new Promise((resolve, reject) => {
        // 内部函数，进行一次尝试
        const run = () => {
            fn().then(
                (value) => {
                    // 成功收到响应，如果需要缓存，则缓存结果，同时设置缓存过期时间
                    if (options.cache) {
                        localStorage.setItem(options.cacheKey, JSON.stringify({
                            value,
                            expire: Date.now() + options.cacheExpire
                        }));
                    }
                    // 封装的 promise 解决
                    resolve(value);
                },
                (err) => {
                    // 超过了最大重试次数，拒绝
                    if (retryCount >= options.maxRetry) {
                        reject(err);
                        return;
                    }
                    // 没有超过重试次数，如果有缓存，则读取缓存
                    if (options.cache) {
                        const cache = localStorage.getItem(options.cacheKey);
                        if (cache) {
                            const cacheObj = JSON.parse(cache);
                            if (cacheObj.expire > Date.now()) {
                                resolve(cacheObj.value);
                                return;
                            }
                        }
                    }
                    // 重试
                    setTimeout(run, options.retryDelay);
                    retryCount++;
                });
        };
        run();
    });
};


// 5 手写 Promise.any()

Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises : Array.from(promises);
        let count = promises.length;
        let errs = []; // 用于收集所有 reject 
        promises.forEach((promise) => {
            // 对每个 promise 绑定：如果解决了，则合成的 promise 解决，如果失败了，计数减一，全部失败返回失败结果
            promise.then(value => {
                resolve(value);
            }, err => {
                count--;
                errs.push(err);
                if (count === 0) {
                    reject(new AggregateError(errs));
                }
            });
        });
    });
};