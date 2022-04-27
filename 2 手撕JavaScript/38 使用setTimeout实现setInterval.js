/**************************************************
 * 38 使用setTimeout实现setInterval
 * Dasen Sun
 * 2022-04-27
 **************************************************/


// 1 实现可清除的 setInterval

// 一种实现：返回清除函数

function mySetInterval(handler, timeout, ...args) {
    let timer;
    const next = () => {
        timer = setTimeout(() => {
            handler(...args);
            next();
        }, timeout);
    };
    next();
    return () => clearTimeout(timer);
}

// 另一种实现：使用全局对象，类似于原生 setInterval 接口的实现

const timerIdMap = {
    current: 0
};

function setIntervalWithId(handler, timeout, ...args) {
    const id = timerIdMap.current++;
    const next = () => {
        return setTimeout(() => {
            handler(...args);
            timerIdMap[id] = next();
        }, timeout);
    }
    timerIdMap[id] = next();
    return id;
}

function clearIntervalWithId(id) {
    clearTimeout(timerIdMap[id]);
    delete timerIdMap[id];
}


// 2 实现限制次数的 setInterval

function setIntervalWithCount(handler, timeout, count, ...args) {
    if (count !== 0 && !count || typeof count !== "number") count = 0;
    let timer;
    let cnt = 0;
    const next = () => {
        timer = setTimeout(() => {
            handler(...args);
            ++cnt;
            if (cnt < count) next();
        }, timeout);
    };
    if (count) next();
    return () => clearTimeout(timer);
}


// 3 实现可暂停的 setInterval

function setIntervalSuspendable(handler, timeout, ...args) {
    let timer;
    const next = () => {
        timer = setTimeout(() => {
            handler(...args);
            next();
        }, timeout);
    };
    next();
    const suspend = () => {
        clearTimeout(timer);
    };
    return [suspend, next];
}


// 4 实现可自动修正延迟的 setInterval

function setIntervalAutoCorrect(handler, timeout, ...args) {
    let timer;
    let cnt = 0;
    const begin = new Date().getTime();
    const next = () => {
        const now = new Date().getTime();
        let dis = now - begin - timeout * cnt;
        while (dis > timeout) {
            dis -= timeout;
        }
        timer = setTimeout(() => {
            handler(...args);
            ++cnt;
            next();
        }, timeout - dis);
    };
    next();
    return () => clearTimeout(timer);
}