/**************************************************
 * 11 柯里化的add函数
 * Dasen Sun
 * 2022-03-14
 **************************************************/


// 1 一种实现

function add(...args) {
    const outerResult = args.reduce((pre, cur) => pre + cur);
    const fn = function (...args) {
        if (!args.length) return outerResult;
        const innerResult = args.reduce((pre, cur) => pre + cur);
        return add(outerResult, innerResult);
    };
    return fn;
}


// 2 另一种实现

function add2(...args) {
    const nums = [...args];
    const fn = function (...args) {
        nums.push(...args);
        return arguments.length ? fn : nums.reduce((pre, cur) => pre + cur);
    };
    return fn;
}


// 3 测试

console.log(add(1, 2, 3)(4, 5)(6)()); // 21
console.log(add(1, 1, 1)(1, 1)(1, 1, 1, 1)()); // 9
console.log(add2(1, 2, 3)(4, 5)(6)()); // 21
console.log(add2(1, 1, 1)(1, 1)(1, 1, 1, 1)()); // 9