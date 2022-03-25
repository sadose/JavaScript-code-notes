/**************************************************
 * 13 手写数组方法
 * Dasen Sun
 * 2022-03-21
 **************************************************/


// 1 手写 Array.prototype.filter()

Array.prototype.myFilter = function (callback, thisArg) {
    // 判断合法性
    if (this == undefined) {
        throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function');
    }
    // 结果数组
    const res = [];
    // 强制转换对象，为了支持类数组对象
    const obj = Object(this);
    // >>> 0 保证 len 为 number，且为正整数，防止类数组对象的 length 属性被重写为其他意义
    const len = obj.length >>> 0;
    // 遍历数组
    for (let i = 0; i < len; i++) {
        // 检查是否存在索引 i ，存在才去过滤，包括原型链
        if (i in obj) {
            if (callback.call(thisArg, obj[i], i, obj)) {
                res.push(obj[i]);
            }
        }
    }
    return res;
};


// 2 手写 Array.prototype.map()

// forEach 方法和 map 实际上是一样的，区别仅仅是不返回值，只是调用一遍回调函数

Array.prototype.myMap = function (callback, thisArg) {
    // 判断合法性
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    // 结果数组
    const res = [];
    // 支持类数组对象
    const obj = Object(this);
    const len = obj.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            res[i] = callback.call(thisArg, obj[i], i, this);
        }
    }
    return res;
};


// 3 手写 Array.prototype.reduce()

// 下述“累加”并非实指，操作不一定为加操作，具体由用户的回调函数决定

Array.prototype.myReduce = function (callback, initialValue) {
    // 判断合法性
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    // 支持类数组对象
    const obj = Object(this);
    const len = this.length >>> 0;
    let accumulator = initialValue;
    let k = 0;
    if (accumulator === undefined) {
        // 第二个参数为 undefined ，寻找数组的第一个有效值作为累加器的初始值
        while (k < len && !(k in obj)) {
            k++;
        }
        // 超出数组界限还没有找到累加器的初始值
        if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = O[k++];
    }
    // 累加
    while (k < len) {
        if (k in obj) {
            accumulator = callback.call(undefined, accumulator, O[k], k, O);
        }
        k++;
    }
    return accumulator;
};


// 4 手写 Array.prototype.sort()

Array.prototype.mySort = function (compareFn, start, end) {
    if (start === undefined) {
        start = 0;
        end = this.length - 1
    }
    let i = start,
        j = end,
        a = this[i];
    if (i >= j) return this;
    while (i < j) {
        while (compareFn(this[j], a) >= 0 && i < j) --j;
        this[i] = this[j];
        while (compareFn(this[i], a) <= 0 && i < j) ++i;
        this[j] = this[i];
    }
    this[i] = a;
    this.mySort(compareFn, start, i - 1);
    this.mySort(compareFn, i + 1, end);
    return this;
};


// 5 使用数组原生的 reduce 方法实现 map 方法

Array.prototype.myMap = function (fn,thisArg) {
    return this.reduce((pre,cur,index,arr) => {
        pre.push(fn.call(thisArg,cur,index,arr));
        return pre;
    },[]);
};


// 6 实现 Array.prototype.nestingDepth() 求数组最大嵌套深度

Array.prototype.nestingDepth = function () {
    let max = 1;
    for(const a of this) {
        if(a instanceof Array) {
            const depth = a.nestingDepth()+1;
            if(max<depth) max=depth;
        }
    }
    return max;
};


// 7 实现 Array.prototype.findDuplicate(n) 返回一个数组，其中包括了所有原数组中出现频率大于等于 n 的元素

Array.prototype.findDuplicate = function (n) {
    const map = new Map();
    for(const a of this) {
        if(map.has(a)) map.set(a,map.get(a)+1);
        else map.set(a,1);
    }
    const result = [];
    for(const pair of map) {
        if(pair[1]>=n) result.push(pair[0]);
    }
    return result;
};


// 8 实现洗牌算法 Array.prototype.shuffle() 随机打乱数组

Array.prototype.shuffle = function () {
    const len = this.length;
    for (let i = 0; i < len; i++) {
        let idx = Math.floor(Math.random() * (len - i));
        [this[len - 1 - i], this[idx]] = [this[idx], this[len - 1 - i]];
    }
    return this;
};