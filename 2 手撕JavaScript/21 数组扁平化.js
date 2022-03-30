/**************************************************
 * 21 数组扁平化
 * Dasen Sun
 * 2022-03-16
 **************************************************/


// 问题描述：
// 实现数组打平（尽可能多的实现方式）


// 1 测试数据

// 预期结果：[1, 2, 3, 4, 5, 6, 7, 8, 9]

const arr = [1, [2, [3, [4, 5]], 6], 7, [8, 9]];


// 2 使用数组 flat 方法，打平层数设置为 Infinity

console.log(arr.flat(Infinity));


// 3 使用正则表达式

console.log(JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']'));


// 4 使用数组的 reduce 方法实现

Array.prototype.flattenA = function () {
    return this.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? cur.flattenA() : cur);
    }, []);
};
console.log(arr.flattenA());


// 5 递归

Array.prototype.flattenB = function () {
    const result = [];
    for (const a of this) {
        if (Array.isArray(a)) result.push(...a.flattenB());
        else result.push(a);
    }
    return result;
};
console.log(arr.flattenB());