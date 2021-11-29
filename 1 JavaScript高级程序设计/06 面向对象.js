/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 06 面向对象
 * Dasen Sun
 * 2021-11-29
 **************************************************/


// ==================== 对象与属性 ====================

// 1 创建对象和配置属性

// 创建一个Object的实例，为它添加属性
let person = new Object();
person.name = "Dasen Sun";
person.age = 22;
person.sayName = function() {
    console.log(this.name);
};

// 对象字面量
let person = {
    name: "Dasen Sun",
    age: 22,
    sayName() {
        console.log(this.name);
    }
};

// 定义带配置项的属性
let person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Dasen"
});

// 修改已有属性
let person = {
    name: "Dasen"
};
person.name = "Dasen Sun"; // 修改成功
Object.defineProperty(person, "name", {
    writable: false
});
person.name = "dasen"; // 静默失败
console.log(person); // {name: 'Dasen Sun'}

// 定义访问器属性
let person = {
    name: "大森"
};
Object.defineProperty(person, "nickname", {
    get() {
        return "可爱的" + this.name;
    },
    set(newVal) {
        if(newVal.slice(0,3) === "可爱的") {
            this.name = newVal.slice(3);
        } else {
            this.name = newVal;
        }
    }
});
console.log(person.name); // 大森
console.log(person.nickname); // 可爱的大森
person.nickname = "可爱的Dasen";
console.log(person.name); // Dasen
console.log(person.nickname); // 可爱的Dasen
person.nickname = "Dasen Sun";
console.log(person.name); // Dasen Sun
console.log(person.nickname); // 可爱的Dasen Sun


// 2 合并对象

dest = {
    set a(val) {
        console.log(`Invoked dest setter with param ${val}`);
    }
};
src = {
    get a() {
        console.log('Invoked src getter');
        return 'foo';
    }
};
Object.assign(dest, src);
console.log(dest); // { set a(val) {...} }
dest2 = { a:'aaa' };
Object.assign(dest2, src);
console.log(dest2); // {a: 'foo'}


// 3 相等比较

// ES6之前
console.log(+0 === -0); // true
console.log(+0 === 0); // true
console.log(-0 === 0); // true
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true,要确定NaN的相等性，必须使用isNaN()

// ES6新方法
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is({}, {})); // false


// 4 对象与属性语法糖

// 属性值简写
let name = "Dasen";
let age = 22;
let person = {
    name,
    age
};

// 可计算属性名
let nameKey = "name";
let ageKey = "age";
let person = {
    [nameKey]: "Dasen",
    [ageKey]: 22
};

// 简写方法名
let person = {
    name: "Dasen",
    sayName() {
        console.log(this.name);
    }
};


// 5 对象解构

// 不使用对象解构
let person = {
    name: "Dasen",
    age: 22
};
let personName = person.name, personAge = person.age;

// 使用对象解构
let person = {
    name: "Dasen",
    age: 22
};
let { name: personName, age: personAge } = person;

// 使用属性简写
let person = {
    name: "Dasen",
    age: 22
};
let { name, age } = person;

// 尝试提取不存在的属性
let person = {
    name: "Dasen",
    age: 22
};
let { name, job } = person;
let { name, job="Software engineer" } = person;
let { name: personName, job: personJob="Software engineer" } = person;

// 对原始值的结构
let { length } = "Dasen";
console.log(length); // 5
let { constructor: c } = 2;
console.log(c === Number); // true

// 使用事先声明的变量解构
let personName, personAge;
let person = {
    name: "Dasen",
    age: 22
};
({ name: personName, age: personAge } = person);

// 嵌套解构
let person = {
    name: "Dasen",
    age: 22,
    job: {
        title: "Software engineer"
    }
};
let { job: { title } } = person;

// 嵌套解构复制对象
let person = {
    name: "Dasen",
    age: 22,
    job: {
        title: "Software engineer"
    }
};
let personCopy = {};
({ name: personCopy.name, age: personCopy.age, job: personCopy.job } = person);

// 参数匹配
function printPerson(info, {name, age}) {
    console.log(info, name, age);
}
let person = {
    name: "Dasen",
    age: 22
};
printPerson("1st", {name:"Dasen", age:22}); // 1st Dasen 22
printPerson("2nd", person); // 2nd Dasen 22


// ==================== 创建对象 ====================

// 1 工厂模式

function createPerson(name, age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
person = createPerson("Dasen", 22);
console.log(person); // {name: 'Dasen', age: 22, sayName: ƒ}


// 2 构造函数模式

// 普通构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
        console.log(this.name);
    };
}
// 使用new操作符调用——构造函数
let person = new Person("Dasen", 22);
console.log(person); // {name: 'Dasen', age: 22, sayName: ƒ}
// 不使用new操作符调用——普通函数
let person = Person("Dasen", 22);
console.log(person); // undefined
console.log(window.name, window.age); // Dasen 22
// 判断类型
console.log(person.constructor === Person); // true
console.log(person instanceof Person); // true

// 改造的共享方法的构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}
function sayName() {
    console.log(this.name);
};
let person = new Person("Dasen", 22);
person.sayName();


// 3 原型模式

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name);
};
let person1 = new Person("Dasen", 22);
let person2 = new Person("Three Zhang", 18);
person1.sayName();
person2.sayName();


// ==================== 原型 ====================

// 1 字面值重写原型

// 没有添加constructor属性
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype = {
    sayName() {
        console.log("我的名字叫", this.name);
    },
    sayAge() {
        console.log("我今年", this.age, "岁了");
    }
};
let person = new Person("Dasen", 22);
console.log(person instanceof Person); // true
console.log(person.constructor === Person); // false

// 添加了constructor属性
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype = {
    constructor: Person,
    sayName() {
        console.log("我的名字叫", this.name);
    },
    sayAge() {
        console.log("我今年", this.age, "岁了");
    }
};
let person = new Person("Dasen", 22);
console.log(person instanceof Person); // true
console.log(person.constructor === Person); // true


// ==================== 继承 ====================

// 1 原型链继承

function SuperType() {
    this.property = "SuperType";
}
SuperType.prototype.getSuperValue = function () {
    return this.property
};
function SubType() {
    this.subproperty = "SubType";
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subproperty;
};
let sub = new SubType();
console.log(sub.getSuperValue(), sub.getSubValue()); // SuperType SubType
console.log(sub.property, sub.subproperty); // SuperType SubType
console.log(sub instanceof SuperType); // true
console.log(sub instanceof SubType); // true
console.log(sub instanceof Object); // true
console.log(SuperType.prototype.isPrototypeOf(sub)); // true
console.log(SubType.prototype.isPrototypeOf(sub)); // true
console.log(Object.prototype.isPrototypeOf(sub)); // true


// 2 盗用构造函数

function SuperType() {
    this.names = ["Dasen", "Dasen Sun"];
}
function SubType() {
    SuperType.call(this);
}
let names1 = new SubType();
let names2 = new SubType();
console.log(names1.names, names2.names); // ['Dasen', 'Dasen Sun'] ['Dasen', 'Dasen Sun']
names1.names.push("Sadose");
console.log(names1.names, names2.names); // ['Dasen', 'Dasen Sun', 'Sadose'] ['Dasen', 'Dasen Sun']


// 3 组合继承

function SuperType(name) {
    this.name = name;
    if(arguments.length > 0) {
        this.friends = [...arguments];
        this.friends.shift();
    } else {
        this.friends = [];
    }
}
SuperType.prototype.getFriends = function () {
    console.log(this.friends.join(", "));
};
function SubType(name, age) {
    let friends = Array.prototype.slice.call(arguments, 2);
    SuperType.call(this, name, ...friends);
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.getAge = function () {
    console.log(this.age);
};
let dasen = new SubType("Dasen", 22, "Xiaoyu", "Three");
let three = new SubType("Three", 18, "Dasen");
console.log(dasen); // SubType {name: 'Dasen', friends: Array(2), age: 22}
console.log(three); // SubType {name: 'Three', friends: Array(1), age: 18}
dasen.getAge(); // 22
dasen.getFriends(); // Xiaoyu, Three
console.log(dasen instanceof SuperType); // true
console.log(dasen instanceof SubType); // true


// 4 原型式继承

let person = {
    name: "Dasen",
    friends: ["Xiaoyu", "Three"]
};
let anotherPerson = Object.create(person);
anotherPerson.name = "Xiaoyu";
anotherPerson.friends.push("Tom");
let yetAnotherPerson = Object.create(person, {
    name: {
        value: "Three"
    }
});
yetAnotherPerson.friends.push("Jack");
console.log(person.name, anotherPerson.name, yetAnotherPerson.name); // Dasen Xiaoyu Three
console.log(person.friends); // ['Xiaoyu', 'Three', 'Tom', 'Jack']
console.log(anotherPerson.__proto__ === person); // true
console.log(yetAnotherPerson.__proto__ === person); // true


// 5 寄生式继承

let person = {
    name: "Dasen",
    age: 22
};
function factoryFun(person) {
    let clone = Object.create(person);
    clone.sayHi = function () {
        console.log("Hi. My name is " + this.name + ".");
        console.log("I'm " + this.age + " years old.");
    };
    return clone;
}
let confidentPerson = factoryFun(person);
confidentPerson.sayHi();


// 6 寄生式组合继承

function inheritPrototype(subType, supperType) {
    let prototype = Object.create(supperType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
function SuperType(name) {
    this.name = name;
    if(arguments.length > 0) {
        this.friends = [...arguments];
        this.friends.shift();
    } else {
        this.friends = [];
    }
}
SuperType.prototype.getFriends = function () {
    console.log(this.friends.join(", "));
};
function SubType(name, age) {
    let friends = Array.prototype.slice.call(arguments, 2);
    SuperType.call(this, name, ...friends);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.getAge = function () {
    console.log(this.age);
};
let dasen = new SubType("Dasen", 22, "Xiaoyu", "Three");
let three = new SubType("Three", 18, "Dasen");
console.log(dasen); // SubType {name: 'Dasen', friends: Array(2), age: 22}
console.log(three); // SubType {name: 'Three', friends: Array(1), age: 18}
dasen.getAge(); // 22
dasen.getFriends(); // Xiaoyu, Three
console.log(dasen instanceof SuperType); // true
console.log(dasen instanceof SubType); // true


// ==================== 类 ====================

// 1 生成器方法

// 生成器方法和静态生成器方法
class Person {
    *createNameIterator() {
        yield "Dasen";
        yield "Dasen Sun";
        yield "Sadose";
    }
    static *createHobbyIterator() {
        yield "Code";
        yield "Girl";
        yield "Cube";
    }
}
let person = new Person();
let names = person.createNameIterator();
let hobbies = Person.createHobbyIterator();
console.log(names.next().value); // Dasen
console.log(names.next().value); // Dasen Sun
console.log(names.next().value); // Sadose
console.log(hobbies.next().value); // Code
console.log(hobbies.next().value); // Girl
console.log(hobbies.next().value); // Cube

// 可迭代对象
class Person {
    *[Symbol.iterator]() {
        yield "Dasen";
        yield "Dasen Sun";
        yield "Sadose";
    }
}
let p = new Person();
for(let name of p) {
    console.log(name);
}


// 2 继承

// 抽象基类
class Vehicle {
    constructor() {
        console.log(new.target);
        if(new.target === Vehicle) {
            throw new Error("Vehicle 是一个抽象基类，不可以实例化！");
        }
    }
}
class Bus extends Vehicle {}
let v;
try {
    v = new Vehicle(); // class Vehicle
} catch (error) {
    console.log(error); // Error: Vehicle 是一个抽象基类，不可以实例化！
}
let b = new Bus(); // class Bus extends Vehicle
console.log(v, b); // undefined Bus

// 抽象基类要求派生类必须拥有某个方法
class Vehicle {
    constructor() {
        console.log(this);
        if(new.target === Vehicle) {
            throw new Error("Vehicle 是一个抽象基类，不可以实例化！");
        }
        if(!this.drive) {
            throw new Error("车必须能开！");
        }
        console.log("成功！");
    }
}
class Bus extends Vehicle {
    drive() {}
}
class BadVehicle extends Vehicle {}
try {
    new Vehicle();
} catch (error) {
    console.log(error); // Error: Vehicle 是一个抽象基类，不可以实例化！
}
try {
    new BadVehicle();
} catch (error) {
    console.log(error); // Error: 车必须能开！
}
new Bus(); // 成功！

// 继承内置类型
class SuperArray extends Array {
    shuffle() {
        for(let i=this.length-1; i>0; --i) {
            const j = Math.floor(Math.random()*(i+1));
            [this[i], this[j]] = [this[j], this[i]];
        }
    }
}
let a = new SuperArray(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log(a); // SuperArray(9) [1, 2, 3, 4, 5, 6, 7, 8, 9]
a.shuffle();
console.log(a); // SuperArray(9) [8, 4, 7, 9, 5, 6, 3, 1, 2]
console.log(a instanceof SuperArray); // true
console.log(a instanceof Array); // true

// 类混入
class Baseclass {}
let AMixin = (Superclass) => class extends Superclass {
    funA() {
        console.log("A");
    }
}
let BMixin = (Superclass) => class extends Superclass {
    funB() {
        console.log("B");
    }
}
let CMixin = (Superclass) => class extends Superclass {
    funC() {
        console.log("C");
    }
}
function mix(baseclass, ...mixins) {
    return mixins.reduce((pre, cur) => cur(pre), baseclass);
}
class Subclass extends mix(Baseclass, AMixin, BMixin, CMixin) {}
let o = new Subclass();
o.funA(); // A
o.funB(); // B
o.funC(); // C
