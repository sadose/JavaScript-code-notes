/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 01 语言基础
 * Dasen Sun
 * 2021-12-04
 **************************************************/


// ==================== 变量 ====================

// 1 变量声明

// var声明
console.log(a); // undefined
var a = "aaa";
console.log(a); // aaa
var a = "bbb"
console.log(a); // bbb
console.log(this.a); // bbb

// let声明作用域为块作用域
if(true) {
    var a = "aaa";
    let b = "bbb";
    console.log(a); // aaa
    console.log(b); // bbb
}
console.log(a); // aaa
console.log(b); // ReferenceError: b is not defined

// let声明不会被提升
console.log(a); // undefined
console.log(b); // ReferenceError: b is not defined
var a;
let b;

// for循环中的临时变量
for (var i = 0; i < 5; ++i) {
    setTimeout(() => console.log(i), 0)
} // 5 5 5 5 5
for (let j = 0; j < 5; ++j) {
    setTimeout(() => console.log(j), 0)
} // 0 1 2 3 4


// ==================== 数据类型 ====================

// 1 undefined

let a;
console.log(typeof a); // undefined
console.log(typeof b); // undefined
console.log(a); // undefined
console.log(b); // ReferenceError: b is not defined


// 2 字符串

// 标签函数
function x2Tag(strings, ...expressions) {
    console.log(strings); // ['', ' + ', ' = ', '']
    console.log(expressions); // [1, 2, 3]
    let e = expressions.map((val) => val*2);
    let r = strings[0];
    for(let i=0; i<e.length; ++i) {
        r += e[i] + strings[i+1];
    }
    return r;
}
let s = x2Tag`${1} + ${2} = ${1+2}`;
console.log(s); // 2 + 4 = 6

// 原始字符串
let s1 = `\n\t\u00A9`;
let s2 = String.raw`\n\t\u00A9`;
console.log(s1); // (换行符)(制表符)©
console.log(s2); // \n\t\u00A9


// 3 符号类型

// 独一无二的符号
let sym1 = Symbol();
let sym2 = Symbol();
let sym3 = Symbol("sym");
let sym4 = Symbol("sym");
console.log(sym1 === sym2); // false
console.log(sym3 === sym4); // false

// 全局符号注册表
let aSym1 = Symbol.for("a");
let aSym2 = Symbol.for("a");
let bSym = Symbol.for("b");
console.log(aSym1 === aSym2); // true
console.log(aSym1 === bSym); // false
console.log(Symbol.keyFor(aSym1)); // a
console.log(Symbol.keyFor(aSym2)); // a
console.log(Symbol.keyFor(bSym)); // b

// 符号作为属性名
let aSym = Symbol("a");
let bSym = Symbol("b");
let obj = {
    [aSym]: "a val",
    [bSym]: "b val",
    a: "aaa",
    b: "bbb"
};
console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b']
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(a), Symbol(b)]
console.log(Object.getOwnPropertyDescriptors(obj)); // {a: {…}, b: {…}, Symbol(a): {…}, Symbol(b): {…}}


// ==================== 操作符 ====================

// 1 乘法操作符

console.log(NaN*2); // NaN
console.log(Infinity*0); // NaN
console.log(Infinity*2); // Infinity
console.log(Infinity*-2); // -Infinity
console.log(-Infinity*2); // -Infinity
console.log(-Infinity*-2); // Infinity
console.log(-Infinity*Infinity); // -Infinity
console.log(-Infinity*-Infinity); // Infinity


// 2 除法操作符

console.log(NaN/2); // NaN
console.log(Infinity/Infinity); // NaN
console.log(0/0); // NaN
console.log(1/0); // Infinity
console.log(2/-0); // -Infinity
console.log(-3/0); // -Infinity
console.log(-4/-0); // Infinity
console.log(Infinity/0); // Infinity
console.log(Infinity/-1); // -Infinity
console.log(-Infinity/2); // -Infinity
console.log(-Infinity/-3); // Infinity


// ==================== 语句 ====================

// 1 流程控制语句

// 一次性跳出多层嵌套的循环
aloop:
for (let i = 0; i < 3; i++) {
    bloop:
    for (let j = 0; j < 3; j++) {
        if(j>1) {
            // j>1时，直接break最外层循环，循环结束
            break aloop;
        }
        for (let k = 0; k < 3; k++) {
            if(k>1) {
                // k>1时，结束第三层循环，continue到第二层继续
                continue bloop;
            }
            console.log(i, j, k);
        }
    }
}


// 2 with语句

let obj = { name: "obj", a: "aaa" };
with(obj) {
    let aaa = a;
    console.log(aaa); // aaa
    console.log(name); // obj
    name = "ooo";
    console.log(name); // ooo
}
