/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 03 基本引用类型
 * Dasen Sun
 * 2021-12-07
 **************************************************/


// ==================== Date ====================

// 1 时间日期

// 创建时间日期
let dt1 = new Date();
let dt2 = new Date(Date.now());
let dt3 = new Date(Date.parse("5/1/2020"));
let dt4 = new Date(Date.parse("May 1, 2020"));
let dt5 = new Date(Date.parse("我不是日期"));
let dt6 = new Date(Date.UTC(2020,4,1,13,14,5,21));
let dt7 = new Date("5/1/2020");
let dt8 = new Date(2020,4,1,13,14,5,21);
console.log(Number(dt1)); // 1638845562036
console.log(Number(dt2)); // 1638845562036
console.log(Number(dt3)); // 1588262400000
console.log(Number(dt4)); // 1588262400000
console.log(Number(dt5)); // NaN
console.log(Number(dt6)); // 1588338845021
console.log(Number(dt7)); // 1588262400000
console.log(Number(dt8)); // 1588338845021
// 日期基本方法
console.log(dt1); // Tue Dec 07 2021 10:56:26 GMT+0800 (中国标准时间)
console.log(dt1.toLocaleString()); // 2021/12/7 上午10:56:26
console.log(dt1.valueOf()); // 1638845786774

// 日期格式化方法
let dt = new Date();
console.log(dt.toDateString()); // Tue Dec 07 2021
console.log(dt.toTimeString()); // 11:02:35 GMT+0800 (中国标准时间)
console.log(dt.toLocaleDateString()); // 2021/12/7
console.log(dt.toLocaleTimeString()); // 上午11:02:35
console.log(dt.toUTCString()); // Tue, 07 Dec 2021 03:02:35 GMT
console.log(dt.toJSON()); // 2021-12-07T03:02:35.844Z


// ==================== RegExp ====================

// 1 使用正则表达式

// 创建正则表达式
let p1 = /at/g; // 匹配字符串中所有的"at"
let p2 = /[bc]at/i; // 匹配第一个"bat"或"cat"，忽略大小写
let p3 = /.at/gi; // 将全局模式和忽略大小写结合
let p4 = new RegExp(".at", "gi"); // 使用构造函数创建，等价于p3


// 2 正则表达式方法

// exec
let text = "mom and dad and baby";
let pattern = /mom( and dad( and baby)?)?/gi;
let matches = pattern.exec(text);
console.log(matches.index); // 0
console.log(matches.input); // "mom and dad and baby"
console.log(matches[0]); // "mom and dad and baby"
console.log(matches[1]); // " and dad and baby"
console.log(matches[2]); // " and baby"


// ==================== 原始值包装类型 ====================

// 1 Object包装

let s = new Object("Dasen");
let n = new Object(2);
let b = new Object(true);
console.log(typeof s); // object
console.log(typeof n); // object
console.log(typeof b); // object
console.log(s instanceof String); // true
console.log(n instanceof Number); // true
console.log(b instanceof Boolean); // true


// 2 Boolean

let b1 = new Boolean(true);
let b2 = new Boolean(false);
if (b1) {
    console.log("b1解释为真");
}
if (b2) {
    console.log("b2解释为真");
}
// b1解释为真
// b2解释为真


// 3 Number

let n = new Number(3);
let f = new Number(3.1415926535);
console.log(n.toString(2)); // 11
console.log(f.toFixed(2)); // 3.14
console.log(f.toExponential()); // 3.1415926535e+0
console.log(f.toPrecision(5)); // 3.1416


// 4 String

// UTF16编码
let s = "我是大森";
console.log(s.charAt(1)); // 是
console.log(s.charCodeAt(2)); // 22823
console.log(s.charCodeAt(3).toString(16)); // 68ee
console.log(String.fromCharCode(22823,0x68EE)); // 大森

// UTF32编码
let s = "我是大森😊";
console.log(s.charAt(4)); // �
console.log(s.charAt(5)); // �
console.log(s.charCodeAt(4)); // 55357
console.log(s.charCodeAt(5)); // 56842
console.log(s.codePointAt(4)); // 128522
console.log(s.codePointAt(5)); // 56842
console.log(String.fromCharCode(55357,56842)); // 😊
console.log(String.fromCodePoint(128522)); // 😊

// 字符串迭代器
let s = "我是大森😊";
for(const c of s) {
    console.log(c);
}
// 我
// 是
// 大
// 森
// 😊

// 字符串操作方法
let s = "Hello";
console.log(s.concat(" world", "!")); // Hello world!
console.log(s.slice(1,4)); // ell
console.log(s.slice(1)); // ello
console.log(s.slice(-4,-1)); // ell
console.log(s.substring(1,4)); // ell
console.log(s.substring(1)); // ello
console.log(s.substring(-4,4)); // Hell
console.log("输出空串：", s.substring(-4,-1)); // 输出空串：
console.log(s.substr(1,3)); // ell
console.log(s.substr(-4,3)); // ell
console.log("输出空串：", s.substr(-4,-1)); // 输出空串：

// 字符串位置方法
let s = "Hello world!";
console.log(s.indexOf("o")); // 4
console.log(s.lastIndexOf("o")); // 7
console.log(s.indexOf("o",5)); // 7
console.log(s.lastIndexOf("o",6)); // 4

// 字符串包含方法
let s = "hello";
console.log(s.startsWith("he")); // true
console.log(s.startsWith("lo")); // false
console.log(s.endsWith("he")); // false
console.log(s.endsWith("lo")); // true
console.log(s.includes("ell")); // true

// 其他字符串方法
console.log("   hello \n ".trim()); // hello
console.log("呐呐".repeat(5)); // 呐呐呐呐呐呐呐呐呐呐
console.log("Dasen".padEnd(10,"-").padStart(15,"-")); // -----Dasen-----
