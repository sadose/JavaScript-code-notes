/**************************************************
 * 22 数组去重
 * Dasen Sun
 * 2022-03-16
 **************************************************/


// 问题描述：
// 实现数组去重（尽可能多的方法）


// 1 测试数据

// 预期结果（顺序无关）：[1, 2, 3, 4, 5, 6, 7, 8, 9]

const arr = [7, 1, 8, 5, 4, 9, 3, 6, 2, 5, 1, 2, 5, 3, 9];


// 2 使用 Set

// 使用 Map 也可以，思路差不多

console.log(Array.from(new Set(arr)));


// 3 使用数组的 indexOf 方法

// 使用 includes 方法和 filter 方法也可以，思路都是把没出现过的筛选出来

Array.prototype.unique = function () {
    const result = [];
    for (const a of this) {
        if (result.indexOf(a) === -1) result.push(a);
    }
    return result;
};
console.log(arr.unique());