/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 07 代理与反射
 * Dasen Sun
 * 2021-12-17
 **************************************************/


// ==================== 代理 ====================

// 1 定义并使用代理

// 创建一个对象 obj 和它的代理 proxy
let obj = {
    name: "Dasen",
    age: 22,
    girlfriend: null
};
let proxy = new Proxy(obj, {});
// 访问属性没有差别
console.log(obj.name); // Dasen
console.log(obj.name); // Dasen
// 操作属性没有差别
proxy.age = 21;
console.log(obj.age); // 21
proxy.age--;
console.log(obj.age); // 20
obj.age += 2;
console.log(proxy.age); // 22
// 甚至方法的调用都没有差别
console.log(obj.hasOwnProperty("girlfriend")); // true
console.log(proxy.hasOwnProperty("girlfriend")); // true
console.log(proxy.girlfriend); // null
// 相等判断可以区分代理和原对象
console.log(proxy == obj); // false
console.log(proxy === obj); // false
// 代理构造函数没有原型因此不能使用 instanceof 操作符判断对象是不是代理
console.log(typeof obj); // object
console.log(typeof proxy); // object
console.log(obj instanceof Object); // true
console.log(proxy instanceof Object); // true
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check


// 2 捕获器

// 使用捕获器
let obj = {
    name: "Dasen",
    age: 22,
    girlfriend: null
};
let handler = {
    get(tar, property, rec) {
        if(property==="girlfriend" && tar[property]===null) {
            return "无可奉告！";
        } else {
            return Reflect.get(...arguments);
        }
    }
}
let proxy = new Proxy(obj, handler);
console.log(proxy.name); // Dasen
console.log(proxy.age); // 22
console.log(obj.girlfriend); // null
console.log(proxy.girlfriend); // 无可奉告！
obj.girlfriend = "someone";
console.log(proxy.girlfriend); // someone

// 捕获器不变式
let obj = {};
Object.defineProperty(obj,"a",{
    value: "aaa",
    configurable: false,
    writable: false
});
let handler = {
    get() {
        return "bbb";
    }
};
let proxy = new Proxy(obj, handler);
console.log(proxy.a); // TypeError: 'get' on proxy: ...


// 3 可撤销代理

let obj = { a: "aaa" };
let handler = {
    get() {
        return "hhh";
    }
};
let { proxy, revoke } = Proxy.revocable(obj,handler);
console.log(proxy.a); // hhh
revoke(); // 撤销代理
console.log(proxy.a); // TypeError: Cannot perform 'get' on a proxy that has been revoked


// 4 反射

// 与操作对象有关的反射
let obj = {};
if(Reflect.defineProperty(obj,"a",{value:"aaa"})) {
    console.log("成功了！");
} else {
    console.log("失败了……");
}


// 5 多层代理

let obj = { name: "" };
let p1 = new Proxy(obj, {
    // 拦截 set 操作，将写入的值转换为小写
    set(target, property, value, rec) {
        if(property !== "name") {
            return Reflect.set(...arguments);
        }
        return Reflect.set(target,property,value.toLowerCase(),rec);
    }
});
let p2 = new Proxy(p1, {
    // 拦截 set 操作，去掉写入的值的前后空白符
    set(target, property, value, rec) {
        if(property !== "name") {
            return Reflect.set(...arguments);
        }
        return Reflect.set(target,property,value.trim(),rec);
    }
});
p2.name = "   Dasen   ";
console.log(p2.name); // dasen


// 6 代理类

// 代理对象
const wm = new WeakMap();
class User {
    constructor(userid) {
        wm.set(this, userid);
    }
    set id(userid) {
        wm.set(this, userid);
    }
    get id() {
        return wm.get(this);
    }
}
const user = new User(555);
console.log(user.id); // 555
const proxy = new Proxy(user,{});
console.log(proxy.id); // undefined
// 代理类
const ProxyUser = new Proxy(User,{});
const proxyUser = new ProxyUser(666);
console.log(proxyUser.id); // 666


// ==================== 代理模式 ====================

// 1 监听属性

// get捕获器监听属性何时被访问
const obj = { name: "Dasen" };
const proxy = new Proxy(obj, {
    get(target, p) {
        console.log("obj 的属性",p,"被访问了！");
        return Reflect.get(...arguments);
    }
});
console.log(proxy.name);
// obj 的属性 name 被访问了！
// Dasen

// set捕获器实现简单的数据双向绑定
const obj1 = { val: "" };
const obj2 = { val: "" };
const proxy1 = new Proxy(obj1, {
    set(target, p, v) {
        if(p !== "val") {
            return Reflect.set(...arguments);
        }
        obj2[p] = v;
        return Reflect.set(...arguments);
    }
});
const proxy2 = new Proxy(obj2, {
    set(target, p, v) {
        if(p !== "val") {
            return Reflect.set(...arguments);
        }
        obj1[p] = v;
        return Reflect.set(...arguments);
    }
});
proxy1.val = "val1";
console.log(proxy1.val); // val1
console.log(proxy2.val); // val1
proxy2.val = "val2";
console.log(proxy1.val); // val2
console.log(proxy2.val); // val2


// 2 隐藏属性

const hiddenProperties = ["age", "weight"];
const obj = {
    name: "Dasen",
    age: 22,
    height: 180,
    weight: 135
};
const proxy = new Proxy(obj, {
    get(t,p) {
        if(hiddenProperties.includes(p)) {
            return undefined;
        }
        return Reflect.get(...arguments);
    },
    has(t,p) {
        if(hiddenProperties.includes(p)) {
            return false;
        }
        return Reflect.has(...arguments);
    }
});
console.log(proxy.name); // Dasen
console.log(proxy.age); // undefined
console.log(proxy.height); // 180
console.log(proxy.weight); // undefined


// 3 对象属性验证

const obj = {
    name: "Dasen",
    age: 22,
    height: 180,
    weight: 135
};
const proxy = new Proxy(obj, {
    set(o,p,v) {
        if(p==="weight") {
            if(typeof v !== "number" || v <= 0) {
                console.log("体重只能是大于0的数字！");
                return false;
            } else if(v > 180) {
                console.log("大森是不可能那么胖的！");
                return false;
            }
        }
        return Reflect.set(...arguments);
    }
});
proxy.weight = 130;
console.log(proxy.weight); // 130
proxy.weight = 185; // 大森是不可能那么胖的！
console.log(proxy.weight); // 130
proxy.weight = "135"; // 体重只能是大于0的数字！
console.log(proxy.weight); // 130
proxy.weight = -1; // 体重只能是大于0的数字！
console.log(proxy.weight); // 130


// 4 参数验证

// 函数参数验证
function sum(arr) {
    // 求数组中所有数的和
    return arr.reduce((r,c) => r+c);
}
const proxy = new Proxy(sum, {
    apply(t,thisArg,arg) {
        let arrArg = arg[0];
        if(!Array.isArray(arrArg)) {
            console.log("要传入一个数组作为参数！");
            return undefined;
        }
        for (const i of arrArg) {
            if(typeof i !== "number") {
                console.log("数组中的每一个值都应该是数值！");
                return undefined;
            }
        }
        return Reflect.apply(...arguments);
    }
});
console.log(proxy([1,2,3,4,5])); // 15
console.log(proxy(1));
// 要传入一个数组作为参数！
// undefined
console.log(proxy(["1",2,"3"]));
// 数组中的每一个值都应该是数值！
// undefined

// 构造函数参数验证
class User {
    constructor(userid) {
        this.id = userid;
    }
}
const proxy = new Proxy(User, {
    construct(o,argArr) {
        if(argArr[0] === undefined) {
            throw "必须要传入UserID！";
        }
        return Reflect.construct(...arguments);
    }
});
new proxy(1);
new proxy(); // Error: 必须要传入UserID！


// 5 观察者模式

const userList = [];
const watcher = new Proxy(userList, {
    set(target, p, value) {
        const res = Reflect.set(...arguments);
        if(p !== "length" && res) {
            console.log("欢迎",value.name,"的加入！");
        }
        return res;
    }
})
class User {
    constructor(username) {
        this.name = username;
    }
}
const userProxy = new Proxy(User, {
    construct() {
        const newUser = Reflect.construct(...arguments);
        watcher.push(newUser);
        return newUser;
    }
});
new userProxy("Dasen"); // 欢迎 Dasen 的加入！
new userProxy("Three"); // 欢迎 Three 的加入！
new userProxy("Jack"); // 欢迎 Jack 的加入！
