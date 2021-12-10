/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 04 集合引用类型
 * Dasen Sun
 * 2021-12-10
 **************************************************/


// ==================== 数组 ====================

// 1 创建数组

let arr = []; // 数组字面量
let arr = new Array(); // 创建空数组
let arr = new Array(5); // 创建有五个元素的数组，元素默认值undefined
let arr = new Array(1,2,3); // 创建数组[1,2,3]


// 2 数组静态方法

let arr1 = Array.from("string");
console.log(arr1); // ['s', 't', 'r', 'i', 'n', 'g']
let arr2 = Array.from({0:"Dasen", 1:22, length:2});
console.log(arr2); // ['Dasen', 22]
let arr3 = Array.of(1,2,3,4,5);
console.log(arr3); // [1, 2, 3, 4, 5]
console.log(Array.isArray(arr2)); // true
console.log(Array.isArray({0:"Dasen", 1:22, length:2})); // false


// 3 迭代器方法

let arr = ["red", "blue", "yellow"];
let iter = arr.values();
console.log(iter.next()); // {value: 'red', done: false}
console.log(iter.next()); // {value: 'blue', done: false}
console.log(iter.next()); // {value: 'yellow', done: false}
console.log(iter.next()); // {value: undefined, done: true}
console.log(arr.keys()); // Array Iterator
for (const [index, value] of arr.entries()) {
    console.log(index, value);
}
// 0 red
// 1 blue
// 2 yellow


// 4 赋值和填充方法

// copyWithin
let arr = [1,2,3,4,5,6,7,8,9];
arr.copyWithin(3);
console.log(arr); // [1, 2, 3, 1, 2, 3, 4, 5, 6]
arr = [1,2,3,4,5,6,7,8,9];
arr.copyWithin(2,6);
console.log(arr); // [1, 2, 7, 8, 9, 6, 7, 8, 9]
arr = [1,2,3,4,5,6,7,8,9];
arr.copyWithin(2,6,8);
console.log(arr); // [1, 2, 7, 8, 5, 6, 7, 8, 9]
arr = [1,2,3,4,5,6,7,8,9];
arr.copyWithin(-7,-3,-1);
console.log(arr); // [1, 2, 7, 8, 5, 6, 7, 8, 9]
// fill
arr.fill(0,5,8);
console.log(arr); // [1, 2, 7, 8, 5, 0, 0, 0, 9]
arr.fill(0,5);
console.log(arr); // [1, 2, 7, 8, 5, 0, 0, 0, 0]
arr.fill(0);
console.log(arr); // [0, 0, 0, 0, 0, 0, 0, 0, 0]


// 5 转换方法

let arr = [1,2,3,4,5,6,7,8,9];
console.log(arr.toString()); // 1,2,3,4,5,6,7,8,9
console.log(arr.join(",")); // 1,2,3,4,5,6,7,8,9
console.log(arr.join(" ")); // 1 2 3 4 5 6 7 8 9


// 6 排序方法

let arr = ["1", "2", "11", "12"];
arr.reverse();
console.log(arr); // ['12', '11', '2', '1']
arr.sort();
console.log(arr); // ['1', '11', '12', '2']
arr.sort((a,b) => parseInt(a)-parseInt(b));
console.log(arr); // ['1', '2', '11', '12']


// 7 搜索和位置方法

let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(arr.indexOf(3)); // 2
console.log(arr.lastIndexOf(3)); // 6
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function find1(val) {
    // 寻找第一个能被 3 整除的数
    return !(val % 3);
}
function find2(val, index, array) {
    // 寻找能被 3 整除并位于数组后半部分的数
    if (val % 3) {
        return false;
    } else {
        if (index >= (array.length - 1) / 2) {
            return true;
        } else {
            return false;
        }
    }
}
console.log(arr.find(find1)); // 3
console.log(arr.find(find2)); // 6
console.log(arr.findIndex(find1)); // 2
console.log(arr.findIndex(find2)); // 5


// 8 迭代方法

let arr1 = [1, "a", 2, "b", 3, "c"];
let arr2 = [1, 2, 3, 4, 5, 6];
console.log(arr1.every((val) => typeof val === "number")); // false
console.log(arr2.every((val) => typeof val === "number")); // true
console.log(arr1.some((val) => typeof val === "string")); // true
console.log(arr2.some((val) => typeof val === "string")); // false
console.log(arr1.filter((val) => typeof val === "number")); // [1, 2, 3]
console.log(arr1.filter((val) => typeof val === "string")); // ['a', 'b', 'c']
let sum = 0;
arr2.forEach((val) => sum+=val)
console.log(sum); // 21
console.log(arr2.map((val) => val.toString())); // ['1', '2', '3', '4', '5', '6']


// 9 归并方法

// 数组求和
let arr = [1, 2, 3, 4, 5, 6];
let sum = arr.reduce((presum, cur) => presum+cur);
console.log(sum); // 21

// 统计 2 在数组中出现了几次
let arr = [1, 2, 3, 2, 5, 6, 2, 8, 9];
let count = arr.reduce((precount, cur, index) => {
    if(index === 1) {
        let c = 0;
        if(precount === 2) c++;
        if(cur === 2) c++;
        return c;
    } else {
        return precount + (cur === 2);
    }
});
console.log(count); // 3

// 不可能实现的求斐波那契数列
let arr = [0, 1];
let n = 10;
let res = arr.reduce((pre, cur, index, array) => {
    if(index <= n) {
        array.push(pre+cur);
    }
    return cur;
});
console.log(res); // 1
console.log(arr); // [0, 1, 1]


// 10 其他方法

// concat
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green", "blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]

// 阻止concat打平数组
let colors = ["red", "green", "blue"];
let colors2 = ["black", "brown"];
let colors3 = ["black", "brown"];
colors3[Symbol.isConcatSpreadable] = false;
console.log(colors.concat(colors2)); // ['red', 'green', 'blue', 'black', 'brown']
console.log(colors.concat(colors3)); // ['red', 'green', 'blue', Array(2)]

// slice
let arr = [1,2,3,4,5,6,7,8,9];
console.log(arr.slice(5)); // [6, 7, 8, 9]
console.log(arr.slice(5,7)); // [6, 7]

// splice
let arr = [1,2,3,4,5,6,7,8,9];
let returnVal;
returnVal = arr.splice(5,4,4,3,2,1); // 把 5 6 7 8 替换为 4 3 2 1
console.log(arr); // [1, 2, 3, 4, 5, 4, 3, 2, 1]
console.log(returnVal); // [6, 7, 8, 9]
returnVal = arr.splice(4,arr.length-4); // 只保留前四个元素，删除后面所有元素
console.log(arr); // [1, 2, 3, 4]
console.log(returnVal); // [5, 4, 3, 2, 1]
returnVal = arr.splice(0,0,4,3,2); // 在索引0位置上插入 4 3 2
console.log(arr); // [4, 3, 2, 1, 2, 3, 4]
console.log(returnVal); // []


// ==================== 映射 ====================

// 1 创建映射

// 创建一个空映射
let m = new Map();

// 创建一个映射，由键值对的数组给出初始值
let m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);

// 创建一个映射，由可迭代对象创建
let m = new Map({
    * [Symbol.iterator]() {
        yield ["key1", "val1"];
        yield ["key2", "val2"];
        yield ["key3", "val3"];
    }
});


// 2 键值方法

let m = new Map();
console.log(m); // Map(0)
m.set("name","Dasen").set("age",22); // 连缀使用set
console.log(m); // Map(2) {name => Dasen, age => 22}
console.log(m.get("name")); // Dasen
console.log(m.has("age")); // true
m.delete("age");
console.log(m.has("age")); // false
console.log(m.size); // 1
m.clear();
console.log(m); // Map(0)


// 3 迭代器方法

let m = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"]
]);
let valIter = m.values();
console.log(valIter.next()); // {value: 'val1', done: false}
console.log(valIter.next()); // {value: 'val2', done: false}
console.log(valIter.next()); // {value: 'val3', done: false}
console.log(valIter.next()); // {value: undefined, done: true}
for (const key of m.keys()) {
    console.log(key);
}
// key1
// key2
// key3
for (const [key, val] of m) {
    console.log(key,":",val);
}
// key1 : val1
// key2 : val2
// key3 : val3
m.forEach((val,key) => console.log(key,":",val));
// key1 : val1
// key2 : val2
// key3 : val3


// ==================== 弱映射 ====================

// 1 弱映射管理私有变量

let User = (() => {
    const wm = new WeakMap();
    class User {
        constructor(id) {
            this.setId(id);
        }
        setPrivate(property, value) {
            const privateProperty = wm.get(this) || {};
            privateProperty[property] = value;
            wm.set(this, privateProperty);
        }
        getPrivate(property) {
            const privateProperty = wm.get(this) || {};
            return privateProperty[property];
        }
        setId(id) {
            this.setPrivate("id",id);
        }
        getId() {
            return this.getPrivate("id");
        }
    }
    return User;
})();
let user = new User(2021);
console.log(user.getId()); // 2021


// ==================== 集合 ====================

// 1 创建集合

// 创建空集合
let s = Set();
// 从可迭代对象创建集合
let s = Set([1,2,3]);
