/**************************************************
 * 02 对象的key驼峰式转下划线
 * Dasen Sun
 * 2022-03-13
 **************************************************/


// 实现函数：将对象小驼峰式的属性名转下划线
// 如：userName -> user_name

// 首先：遍历对象属性的方法
// for-in只能遍历到自身的属性和自身继承的可枚举的属性的值和方法，不能得到symbol属性
// Object.keys()该方法返回的是一个数组，它只能访问到自身的可枚举的属性值，不含symbol
// Object.getOwnPropertyNames()返回一个除symbol以外的所有自身属性的数组
// Object.getOwnPropertySymbols()返回一个包含了自身symbol属性的数组
// Reflect.ownKeys()返回一个包含所有属性的数组，不论是不是自身的，不论是不是可枚举的，不管是不是symbol属性

// 根据希望处理哪些属性类型，来选用以上各种方法


// 工具函数：驼峰转下划线

const humpToUnderline = function (name) {
    let newName = "";
    for (const c of name) {
        if (c.charCodeAt() <= "Z".charCodeAt() && c.charCodeAt() >= "A".charCodeAt()) {
            newName += "_" + c.toLowerCase();
        } else {
            newName += c;
        }
    }
    return newName;
};


// 1 简易版本：不考虑属性配置

const formatPropertyNamesA = function (obj) {
    const names = [];
    for (const key in obj) {
        names.push(key);
    }
    for (const key of names) {
        const newKey = humpToUnderline(key);
        obj[newKey] = obj[key];
        delete obj[key];
    }
};


// 2 完善版本：考虑属性配置

const formatPropertyNamesB = function (obj) {
    const names = [];
    const unenumerable = {};
    for (const key in obj) {
        // 属性可配置才进行操作，不可配置的属性忽略
        if (Object.getOwnPropertyDescriptor(obj, key).configurable) {
            names.push(key);
        }
    }
    // 获取自身的不可枚举但可配置的属性
    for (const key of Object.getOwnPropertyNames(obj)) {
        if (names.indexOf(key) === -1 && Object.getOwnPropertyDescriptor(obj, key).configurable) {
            unenumerable[key] = Object.getOwnPropertyDescriptor(obj, key);
        }
    }
    // 处理可迭代属性
    for (const key of names) {
        const newKey = humpToUnderline(key);
        obj[newKey] = obj[key];
        delete obj[key];
    }
    // 处理不可迭代属性
    for (const key in unenumerable) {
        const newKey = humpToUnderline(key);
        Object.defineProperty(obj, newKey, unenumerable[key]);
        delete obj[key];
    }
};


// 测试1：简单的对象

const obj = {
    userName: "Dasen",
    userCurrentAge: 23,
};
formatPropertyNamesA(obj);
console.log(obj); // {user_name: 'Dasen', user_current_age: 23}


// 测试2：有原型的对象

const proto = {
    userName: "Dasen",
    userCurrentAge: 23,
};

function Person() {
    this.nickName = "Dear " + this.userName;
}
Person.prototype = proto;
const person = new Person();
formatPropertyNamesA(person);
console.log(person); // Person {nick_name: 'Dear Dasen', user_name: 'Dasen', user_current_age: 23}


// 测试3：有带有属性配置的对象

const person2 = {
    userName: "Dasen",
    userCurrentAge: 23,
};
Object.defineProperty(person2, "nickName", {
    configurable: false,
    enumerable: true,
    value: "Dear Dasen",
});
// nickName 属性不可配置，删除操作会静默失败，结果会多一个重复的属性 nick_name
// formatPropertyNamesA(person2); // {nickName: 'Dear Dasen', user_name: 'Dasen', user_current_age: 23, nick_name: 'Dear Dasen'}
formatPropertyNamesB(person2);
console.log(person2); // {nickName: 'Dear Dasen', user_name: 'Dasen', user_current_age: 23}
console.log(Object.getOwnPropertyDescriptor(person2, "nickName")); // {value: 'Dear Dasen', writable: false, enumerable: true, configurable: false}