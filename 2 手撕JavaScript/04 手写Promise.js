// Promise/A+ 规范的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(executor) {
        this._status = PENDING; // Promise状态
        this._resolveQueue = []; // 成功队列
        this._rejectQueue = []; // 失败队列

        // 由于 resolve/reject 是在 executor 内部被调用，因此需要使用箭头函数固定this指向
        let _resolve = (val) => {
            if (this._status !== PENDING) return; // 状态只能由 pending 到 fulfilled 或 rejected
            this._status = FULFILLED; // 变更状态
            while (this._resolveQueue.length) {
                const callback = this._resolveQueue.shift();
                callback(val);
            }
        }

        // reject 的实现同理
        let _reject = (val) => {
            if (this._status !== PENDING) return;
            this._status = REJECTED;
            while (this._rejectQueue.length) {
                const callback = this._rejectQueue.shift();
                callback(val);
            }
        }

        // 立即执行 executor ，并传入 resolve 和 reject
        executor(_resolve, _reject)
    }

    then(resolveFn, rejectFn) {
        // return 一个新的 promise ，支持链式调用
        return new MyPromise((resolve, reject) => {
            // 把 resolveFn 重新包装一下再 push 进 resolve 执行队列，为了变更返回的 promise 的状态
            const fulfilledFn = value => {
                try {
                    // 执行 promise1 的成功回调，并获取返回值
                    let x = resolveFn(value);
                    // 返回值如果是 Promise ，那么它落定则 promise2 落定，直接用 promise2 的 resolve/reject 作为其落定回调
                    // 返回值不是 Promise ，promise2 直接解决为返回的值
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            };
            // 把包装好的 fulfilledFn 收集到成功回调队列中
            this._resolveQueue.push(fulfilledFn);

            // reject 的实现同理
            const rejectedFn = error => {
                try {
                    let x = rejectFn(error);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            }
            this._rejectQueue.push(rejectedFn);
        });
    }
}