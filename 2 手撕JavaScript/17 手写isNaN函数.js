/**************************************************
 * 17 手写isNaN函数
 * Dasen Sun
 * 2022-03-16
 **************************************************/


// 1 前提

// 之所以需要 isNaN 函数是因为 NaN 不与自己相等，同样我们可以利用 NaN 不与自身相等的特性来判断 NaN

console.log(NaN === NaN); // false
console.log(typeof NaN === "number"); // true

// 来看 JavaScript 的两个 isNaN 函数：

// isNaN() 纯粹地是判断一个值是否可以转换为数值，对于可以通过转型函数转为数值的值一律返回 false ，反之返回 true
console.log(isNaN(NaN)); // true
console.log(isNaN(1)); // false
console.log(isNaN("1")); // false
console.log(isNaN("a")); // true
// Number.isNaN() 则仅仅是判断一个值是否与 NaN 严格相等
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(1)); // false
console.log(Number.isNaN("1")); // false
console.log(Number.isNaN("a")); // false


// 2 实现 isNotANumber() 来代替 isNaN()

function isNotANumber(val) {
    val = Number(val);
    return val !== val;
}


// 3 实现 Number.myIsNaN() 来代替 Number.isNaN()

Number.myIsNaN = function (val) {
    return val !== val;
}


// 4 测试

console.log(isNotANumber(NaN)); // true
console.log(isNotANumber(1)); // false
console.log(isNotANumber("1")); // false
console.log(isNotANumber("a")); // true
console.log(Number.myIsNaN(NaN)); // true
console.log(Number.myIsNaN(1)); // false
console.log(Number.myIsNaN("1")); // false
console.log(Number.myIsNaN("a")); // false