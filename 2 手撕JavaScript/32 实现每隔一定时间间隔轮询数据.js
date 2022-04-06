/**************************************************
 * 32 实现每隔一定时间间隔轮询数据
 * Dasen Sun
 * 2022-03-20
 **************************************************/


// 问题描述：
// 实现每隔一定时间间隔轮询数据，封装为函数，并提供暂停轮询和继续轮询的方法


// 1 基于 Ajax 封装

function pollingByAjax(url, time, fn) {
    let next = true;
    const reqNext = () => {
        let xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                fn(xhr.responseText);
            }
        };
        xhr.onerror = function (e) {
            throw e;
        };
    };
    const setNext = () => {
        reqNext();
        if (next) setTimeout(setNext, time);
    };
    setNext();
    const suspend = () => {
        console.log("轮询暂停");
        next = false;
    };
    const continueNext = () => {
        console.log("轮询继续");
        next = true;
        setNext();
    };
    return {
        suspend,
        continueNext
    };
}


// 2 基于 Fetch 封装

function pollingByFetch(url, time, fn) {
    let next = true;
    const reqNext = () => fetch(url).then((res) => {
        return res.text();
    }).then((text) => {
        fn(text);
    }).catch((e => {
        throw e;
    }));
    const setNext = () => {
        reqNext();
        if (next) setTimeout(setNext, time);
    };
    setNext();
    const suspend = () => {
        console.log("轮询暂停");
        next = false;
    }
    const continueNext = () => {
        console.log("轮询继续");
        next = true;
        setNext();
    };
    return {
        suspend,
        continueNext
    };
}


// 3 测试

const outputContent = (json) => console.log(JSON.parse(json)["data"]["content"]);

const polling = pollingByFetch("https://api.xygeng.cn/one", 3000, outputContent);

setTimeout(() => {
    polling.suspend();
}, 20000); // 轮询 20 秒后暂停
setTimeout(() => {
    polling.continueNext();
}, 30000); // 暂停 10 秒后再继续轮询