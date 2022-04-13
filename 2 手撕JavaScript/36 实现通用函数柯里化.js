/**************************************************
 * 36 实现通用函数柯里化
 * Dasen Sun
 * 2022-04-12
 **************************************************/


const currify = function (fn) {
    let need = fn.length;
    const args = [];
    return function inner(...innerArgs) {
        need -= innerArgs.length;
        args.push(...innerArgs);
        if (need <= 0) return fn(...args);
        return inner;
    };
};


// 测试

const add = function (a, b, c, d, e) {
    return a + b + c + d + e;
};

console.log(currify(add)(1, 2, 3, 4, 5)); // 15
console.log(currify(add)(1)(2)(3)(4)(5)); // 15
console.log(currify(add)(1, 2, 3)(4, 5)); // 15
console.log(currify(add)(1)(2, 3)(4)(5)); // 15