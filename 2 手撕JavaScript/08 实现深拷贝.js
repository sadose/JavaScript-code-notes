// 1 递归实现简单深拷贝

// 如果是原始类型，无需继续拷贝，直接返回
// 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上

// 缺陷：
// - 没有考虑数组、函数、null等特殊对象
// - 没有考虑循环引用

function clone1(target) {
    if (typeof target !== "object") return target;
    const obj = {};
    for (const key in target) {
        obj[key] = clone1(target[key]);
    }
    return obj;
}

console.log("---------- test1 ----------");
const test1 = {
    name: "Dasen",
    age: 23,
    girlfriend: {
        name: "???",
    },
};
const test1Clone = clone1(test1);
console.log(test1Clone); // {name: 'Dasen', age: 23, girlfriend: {…}}
console.log(test1 === test1Clone); // false
console.log(test1.girlfriend === test1Clone.girlfriend); // false


// 2 考虑数组、函数、null，函数不拷贝

function clone2(target) {
    if (typeof target === "function") return target; // 函数不进行拷贝
    else if (typeof target === "object") {
        // 拷贝对象
        if (target === null) return null; // null
        else if (Array.isArray(target)) {
            // 数组
            const arr = [];
            for (const key in target) {
                arr[key] = clone2(target[key]);
            }
            return arr;
        } else {
            // 普通对象
            const obj = {};
            for (const key in target) {
                obj[key] = clone2(target[key]);
            }
            return obj;
        }
    } else return target; // 原始值类型直接返回
}

console.log("---------- test2 ----------");
const test2 = {
    name: "Dasen",
    age: 23,
    girlfriend: {
        name: "???",
    },
    hobbies: ["coding", "cube", "sleep"],
    sayHello() {
        console.log("Hello, I am", this.name + ".");
    },
};
const test2Clone = clone2(test2);
console.log(test2Clone); // {name: 'Dasen', age: 23, girlfriend: {…}}
console.log(test2 === test2Clone); // false
console.log(test2.girlfriend === test2Clone.girlfriend); // false
console.log(test2.hobbies === test2Clone.hobbies); // false
console.log(test2.sayHello === test2Clone.sayHello); // true
test2.sayHello();
test2Clone.sayHello();


// 3 考虑循环引用

function clone3(target, map = new Map()) {
    if (typeof target === "function") return target; // 函数不进行拷贝
    else if (typeof target === "object") {
        // 拷贝对象
        if (target === null) return null; // null
        else if (map.has(target)) {
            // 拷贝过这个对象，直接返回
            return map.get(target);
        } else if (Array.isArray(target)) {
            // 数组
            const arr = [];
            map.set(target, arr); // 存储一下拷贝的对象
            for (const key in target) {
                arr[key] = clone3(target[key], map);
            }
            return arr;
        } else {
            // 拷贝对象
            const obj = {};
            map.set(target, obj); // 存储一下拷贝的对象
            for (const key in target) {
                obj[key] = clone3(target[key], map);
            }
            return obj;
        }
    } else return target; // 原始值类型直接返回
}

console.log("---------- test3 ----------");
const test3 = {
    name: "Dasen",
    age: 23,
    girlfriend: {
        name: "???",
    },
};
test3.myself = test3;
const test3Clone = clone3(test3);
console.log(test3Clone); // {name: 'Dasen', age: 23, girlfriend: {…}, myself: {…}}
console.log(test3.girlfriend===test3Clone.girlfriend); // false
console.log(test3.myself===test3Clone.myself); // false
console.log(test3Clone===test3Clone.myself); // true


// 4 考虑拷贝函数

function clone4(target) {
    if (typeof target === "function") {
        // 拷贝函数
        const funcString = target.toString();
        if (target.prototype) {
            // 普通函数
            const bodyReg = /(?<={)(.|\n)+(?=})/m; // ===================== Todo: 正则表达式有问题，要改
            const paramReg = /(?<=\().+(?=\)\s+{)/;
            const param = paramReg.exec(funcString);
            const body = bodyReg.exec(funcString);
            console.log(body, param, funcString);
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            // 箭头函数
            return eval(funcString);
        }
    } else if (typeof target === "object") {
        // 拷贝对象
        if (target === null) return null; // null
        else if (Array.isArray(target)) {
            // 数组
            const arr = [];
            for (const key in target) {
                arr[key] = clone2(target[key]);
            }
            return arr;
        } else {
            // 普通对象
            const obj = {};
            for (const key in target) {
                obj[key] = clone2(target[key]);
            }
            return obj;
        }
    }
}

console.log("---------- test2 ----------");


// 5 考虑更多常用类型


console.log("---------- test5 ----------");