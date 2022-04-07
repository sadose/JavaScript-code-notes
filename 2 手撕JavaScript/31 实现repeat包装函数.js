/**************************************************
 * 31 实现repeat包装函数
 * Dasen Sun
 * 2022-03-19
 **************************************************/


// 实现一个 repeat 函数，它的第一个参数是一个函数，第二个参数为重复执行的次数，第三个参数为重复执行的间隔
// repeat 返回一个包装后的函数，如：
// const repeatFn = repeat(console.log, 4, 3000);
// repeatFn("Dasen");
// 将会输出四次 Dasen ，每两次之间间隔 3 秒


function repeat(fn, cnt, time) {
    let count = 0;
    return function inner(...args) {
        fn(...args)
        count++;
        new Promise((resolve) => {
            setTimeout(resolve, time);
        }).then(() => {
            if (count <= cnt) inner(...args);
        });
    };
}


// 测试

const repeatFn = repeat(console.log, 4, 3000);
repeatFn("Dasen");