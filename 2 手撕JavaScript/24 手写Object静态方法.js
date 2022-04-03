/**************************************************
 * 24 手写Object静态方法
 * Dasen Sun
 * 2022-03-16
 **************************************************/


// 1 手写 Object.is()

// Object.is() 主要为了解决两个问题：
// +0 === -0 和 0 === -0 和 0 === +0 都为 true ，但希望 0 和 -0 不相等
// NaN === NaN 为 false ，但希望它们相等

Object.myIs = function (a, b) {
    if (a === b) {
        // 利用 1/(+0) !== 1/(-0) 解决 +0 === -0 的问题
        return a !== 0 || b !== 0 || 1 / a === 1 / b;
    } else {
        // 解决 NaN === NaN
        return a !== a && b !== b;
    }
};

console.log(Object.is(0, +0)); // true
console.log(Object.myIs(0, +0)); // true
console.log(Object.is(0, -0)); // false
console.log(Object.myIs(0, -0)); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.myIs(NaN, NaN)); // true


// 2 手写 Object.assign()

// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象（浅拷贝）

Object.myAssign = function (obj, ...args) {
    // 检查合法性
    if (obj == null) {
        return new TypeError('Cannot convert undefined or null to object');
    }
    // 将原始值转换为对象
    const target = Object(obj);
    // 遍历每一个源对象
    for (const source of args) {
        if (source !== null) {
            // 使用 for-in 和 hasOwnProperty 双重判断，确保只拿到本身的属性和方法，不包含原型链上的
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}

console.log(Object.myAssign({}, {
    name: "Dasen",
    age: 23
}, {
    secondName: "Sun"
})); // {name: 'Dasen', age: 23, secondName: 'Sun'}