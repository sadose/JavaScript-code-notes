/**************************************************
 * 16 实现sleep函数
 * Dasen Sun
 * 2022-03-16
 **************************************************/


// 如果说 sleep 函数是为了推迟执行某个函数，那这就和 delay 函数没什么区别了
// 而 JavaScript 又无法实现真正的阻塞主线程的 sleep 函数，因此只能实现阻塞异步函数的 sleep函数


async function sleep(time) {
    await new Promise(resolve => setTimeout(resolve, time * 1000));
}

async function test() {
    console.log("111");
    await sleep(1); // sleep 1秒
    console.log("222");
    await sleep(2); // sleep 2秒
    console.log("333");
}

test();