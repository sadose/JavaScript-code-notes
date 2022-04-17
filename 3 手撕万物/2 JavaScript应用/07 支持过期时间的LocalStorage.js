/**************************************************
 * 07 支持过期时间的LocalStorage
 * Dasen Sun
 * 2022-04-17
 **************************************************/

const store = {
    timeSign: '|-expires-|',
    storage: localStorage || window.localStorage,
    set(key, value, time) {
        let _time;
        try {
            _time = time ?
                new Date(time).getTime() :
                new Date().getTime() + 1000 * 60 * 60 * 24 * 30; // 默认时间：30天
        } catch (e) {
            // 传入的 time 不合法
            _time = new Date().getTime() + 1000 * 60 * 60 * 24 * 30; // 默认时间：30天
        }
        this.storage.setItem(key, _time + this.timeSign + value);
    },
    get(key) {
        let value = this.storage.getItem(key);
        if (value) {
            const index = value.indexOf(this.timeSign);
            if (index === -1) return value; // 没有找到标志，说明该项目没有设置过期时间
            const time = Number(value.slice(0, index));
            if (time > new Date().getTime()) {
                // 没有过期，取出值
                value = value.slice(index + this.timeSign.length);
            } else {
                // 过期了，删除值
                this.storage.removeItem(key);
                value = null;
            }
        }
        return value;
    },
};