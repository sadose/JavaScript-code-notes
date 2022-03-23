/**************************************************
 * 06 Promise周边
 * Dasen Sun
 * 2022-03-21
 **************************************************/


// 1 使用 Promise 改写回调地狱

let t = setTimeout(() => {
    console.log(111);
    let t1 = setTimeout(() => {
        console.log(222);
        let t2 = setTimeout(() => {
            console.log(333);
        }, 3000);
    }, 2000);
}, 1000);

let p = new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    console.log(111);
    return new Promise((resolve) => setTimeout(resolve, 2000));
}).then(() => {
    console.log(222);
    return new Promise((resolve) => setTimeout(resolve, 3000));
}).then(() => {
    console.log(333);
});


// 2 使用 Promise 实现每隔三秒输出时间

function outputTime() {
    console.log(new Date());
    return new Promise(resolve => setTimeout(resolve,3000)).then(outputTime);
}
outputTime();
// Thu Mar 17 2022 22:19:04 GMT+0800 (中国标准时间)
// Thu Mar 17 2022 22:19:07 GMT+0800 (中国标准时间)
// Thu Mar 17 2022 22:19:10 GMT+0800 (中国标准时间)
// ...