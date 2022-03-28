/**************************************************
 * 15 手写new操作
 * Dasen Sun
 * 2022-03-16
 **************************************************/


// 问题描述：
// 将 new 操作封装为一个函数 newOperator 传入构造函数和参数即可通过该构造函数构造出一个实例

// new 操作的本质：
// 构造函数具有 prototype 那么 new 出来的对象的原型就是构造函数的 prototype
// 可以通过构造函数的 prototype 来创建一个对象，然后以该对象为 this 来调用构造函数，并将其返回即可

// 注意：
// 当构造函数显式返回了一个可用的对象的话，该对象会成为最终 new 出来的对象
// 如果没有返回一个可用的对象，就视为该构造函数将传进去的 this 进行了一番改造，最终这个改造后的对象就是 new 出来的对象


function newOperator(constructorFn, ...args) {
    // 检查合法性
    if (typeof constructorFn !== 'function') {
        throw new TypeError('Type Error');
    }
    // 以 constructor 的 prototype 为原型创造一个对象
    const obj = Object.create(constructorFn.prototype);
    // 以该对象为 this 调用 constructor
    const res = constructorFn.apply(obj, args);
    // 返回创建的对象
    return typeof res === "object" && res !== null || typeof res === "function" ? res : obj;
}