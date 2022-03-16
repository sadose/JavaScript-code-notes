/**************************************************
 * 03 节流防抖
 * Dasen Sun
 * 2022-03-13
 **************************************************/


// 1 函数防抖 debounce

// 在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。
// debounce 将是一个高阶函数，它接收一个函数和防抖的时间，返回一个包装后的函数，这个函数用于响应事件。

// 应用场景举例：
// search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次.

function debounce(fun, delay) {
    // 闭包封装一个变量保存定时器id
    let timer = 0;
    // 返回一个包装后的函数
    return function (...args) {
        // 保存上下文
        const that = this; // 保存 this 是为了可以使包装函数成为对象的方法（如使用DOM0方式来绑定事件处理程序）
        const _args = args;
        // 清除上一个计时器
        clearTimeout(timer);
        // 设置新的计时器
        setTimeout(() => {
            // 以保存的上下文来调用
            fun.call(that, ..._args);
        }, delay);
    };
}


// 2 函数节流 throttle

// 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
// 换句话说，就是经过节流包装的函数，触发一次后有一定的冷却时间，冷却时间结束后才能再次触发，防止频繁触发。
// throttle 同样是一个高阶函数，将传入的函数进行包装。

// 应用场景举例：
// 鼠标不断点击，但让点击事件单位时间内最多触发一次。
// 监听滚动事件，比如是否滑到底部加载更多，单位时间内只判断一次。

function throttle(fun, delay) {
    // 闭包封装上次触发时的时间戳和计时器id
    let last, timer;
    // 返回一个包装后的函数
    return function (...args) {
        // 保存上下文
        let that = this;
        let _args = args;
        // 记录当前时间戳
        let now = +new Date();
        if (last && now < last + delay) {
            // 如果有上次触发的记录并且还没有超过延时，那就推迟到delay之后执行函数（延迟执行）
            clearTimeout(timer);
            timer = setTimeout(function () {
                // 注意：凡执行函数的地方，务必要记住保存执行时间戳
                last = now;
                fun.apply(that, _args);
            }, delay);
        } else {
            // 如果已经超过延时了，就可以直接执行函数了
            last = now;
            fun.apply(that, ..._args);
        }
    }
}


// 3 节流防抖的区别

// 防抖：频繁触发间隔较近的重复操作，只希望触发一次，即前面的全都取消，只保留最后一次触发。
// 节流：频繁触发的重复操作，允许多次触发，但是要限制一下触发的频率不能太快。