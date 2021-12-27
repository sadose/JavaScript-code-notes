/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 08 函数
 * Dasen Sun
 * 2021-12-22
 **************************************************/


// ==================== 函数基础 ====================

// 1 定义函数

// 函数声明
function sum(a, b) {
    return a + b;
}
console.log(sum(2,3)); // 5

// 函数表达式
let sum = function (a, b) {
    return a+b;
};
console.log(sum(2,3)); // 5

// 箭头函数
let sum = (a, b) => a + b;
console.log(sum(2,3)); // 5

// 函数对象
let sum = new Function("a","b","return a+b;");
console.log(sum(2,3)); // 5


// 2 函数表达式

// 条件定义函数
let char = "a";
let process;
if(char >= "a" && char <= "z") {
    process = function (c) {
        return c.toUpperCase();
    }
} else if(char >= "A" && char <= "Z") {
    process = function (c) {
        return c.toLowerCase();
    }
}
console.log(process(char)); // A

// 立即调用的函数表达式
for (var i = 0; i < 5; ++i) {
    setTimeout((function (j) {
        return () => console.log(j);
    })(i));
} // 0 1 2 3 4


// ==================== 函数结构 ====================

// 1 函数名

// 函数具有多个名称
function sum(a, b) {
    return a + b;
}
let add = sum;
console.log(sum(2,3)); // 5
console.log(add(2,3)); // 5
console.log(sum === add); // true

// 函数名
function sum1(a, b) {
    return a + b;
}
let sum2 = function (a, b) {
    return a + b;
};
let sum3 = (a, b) => a + b;
let sum4 = new Function("a", "b", "return a + b;");
let sum5 = sum1;
let sum6 = sum2;
let sum7 = sum3;
let sum8 = sum4;
console.log(sum1.name, sum5.name); // sum1 sum1
console.log(sum2.name, sum6.name); // sum2 sum2
console.log(sum3.name, sum7.name); // sum3 sum3
console.log(sum4.name, sum8.name); // anonymous anonymous
let funArr = [
    function (a, b) {
        return a + b;
    },
    (a, b) => a + b
];
console.log(funArr[0].name === ""); // true
console.log(funArr[1].name === ""); // true
let sum9 = funArr[0];
let sum10 = funArr[1];
console.log(funArr[0].name === ""); // true
console.log(funArr[1].name === ""); // true

// 带前缀的函数名
let obj = {
    name: "Three",
    age_: 18,
    get age() {
        return this.age_;
    }
};
let ageFun = Object.getOwnPropertyDescriptor(obj, "age");
console.log(ageFun.get.name); // get age
function fun() {}
console.log(fun.bind(null).name); // bound fun


// 2 参数

// arguments
function fun(a, b) {
    console.log(a, b);
    arguments[1] = 99;
    console.log(a, b);
    b = 66;
    console.log(arguments[1]);
}
fun(1, 2);
// 1 2
// 1 99
// 66
fun(1);
// 1 undefined
// 1 undefined
// 99

// 严格模式
function fun(a, b) {
    "use strict"
    console.log(a, b);
    arguments[1] = 99;
    console.log(a, b);
    b = 66;
    console.log(arguments[1]);
}
fun(1, 2);
// 1 2
// 1 2
// 99

// 默认参数
function sum(a, b=2) {
    return a + b;
}
console.log(sum(5,5)); // 10
console.log(sum(5)); // 7

// 默认参数的求值顺序
function f() {
    console.log("f this :", this);
    return 1;
}
function s() {
    console.log("second");
    return 2;
}
function fun(first=f(), second=s(), third=second*2, t=this) {
    console.log("fun this :", t);
    return `${first} ${second} ${third}`;
}
let obj = { fun };
console.log(obj.fun());
// f this : window
// second
// fun this : obj
// 1 2 4

// 参数的收集和扩展
function print(name="unknow", age, ...others) {
    console.log(`name: ${name}, age: ${age}, others: ${others}`);
}
print(); // name: unknow, age: undefined, others: 
let p = ["Dasen", 22];
print(...p, "other1", "other2"); // name: Dasen, age: 22, others: other1,other2


// 3 函数内部对象

// 未使用arguments.callee的例子
let factorial = function (num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
};
console.log(factorial(5)); // 120
let anotherFun = factorial; // 改变函数名
factorial = null; // 废弃掉原来的函数名
console.log(anotherFun(5)); // TypeError: factorial is not a function

// 使用arguments.callee改进
let factorial = function (num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
};
console.log(factorial(5)); // 120
let anotherFun = factorial; // 改变函数名
factorial = null; // 废弃掉原来的函数名
console.log(anotherFun(5)); // 120

// 带有默认名称的函数表达式
"use strict"
let factorial = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});
console.log(factorial(5)); // 120

// caller
function inner() {
    console.log(inner.caller);
}
function outer() {
    inner();
}
inner(); // 结果不一定
outer(); // ƒ outer()


// 4 函数的属性与方法

// length属性
function sum(a, b) {
    return a + b;
}
let add2 = (a) => a + 2;
console.log(sum.length); // 2
console.log(add2.length); // 1

// apply方法、call方法和bind方法
function addAll(a, b, c, d) {
    console.log(this);
    return a + b + c + d;
}
let obj = {};
console.log(addAll.apply(obj, [1,2,3,4]));
// obj: {}
// 10
console.log(addAll.call(obj, 1, 2, 3, 4));
// obj: {}
// 10
let fun = addAll.bind(obj);
console.log(fun(1, 2, 3, 4));
// obj: {}
// 10


// ==================== 闭包 ====================

// 1 this

function outer() {
    console.log(this);
}
let obj = {
    inner() {
        console.log(this);
        outer(); // 在全局定义，内部调用
        let fun = function () {
            console.log(this);
        }
        fun(); // 在内部定义，内部调用
        return [
            function () {
                console.log(this);
            },
            () => console.log(this),
            fun
        ];
    }
};
outer(); // window - 在全局定义，全局调用
let [fun, afun, innerfun] = obj.inner();
// obj - obj.inner()的this
// window - 在全局定义，内部调用
// window - 在内部定义，内部调用
fun(); // window - （返回的匿名函数）
afun(); // obj - （返回的箭头函数）
innerfun(); // window - 在内部定义，全局调用


// 2 闭包模式的私有属性

// 简单闭包模式
function Person(name) {
    this.getName = function () {
        return name;
    };
    this.setName = function (personName) {
        name = personName;
    };
}
let person = new Person("Dasen");
console.log(person.getName()); // Dasen
person.setName("name");
console.log(person.getName()); // name

// 类私有成员
let User = (function () {
    // 类（静态）私有成员
    let userCounter = 0;
    // 构造函数
    let User = function (username) {
        this.name = username;
        userCounter++;
    };
    // 类（静态）公共方法
    User.prototype.countUser = function () {
        return userCounter;
    }
    return User;
})();
let user1 = new User("Dasen");
console.log(user1.countUser()); // 1
console.log(user1.name); // Dasen
let user2 = new User("Three");
console.log(user2.countUser()); // 2
console.log(user2.name); // Three

// 模块模式
let rooms = function () {
    // 私有成员
    let roomList = [];
    // 初始化私有成员
    roomList.push("Dasen's room");
    // 公共接口
    return {
        getRooms() {
            return roomList.join(", ");
        },
        getRoomNumber() {
            return roomList.length;
        },
        createRoom(roomName) {
            roomList.push(roomName);
        }
    }
}();
console.log(rooms.getRoomNumber()); // 1
console.log(rooms.getRooms()); // Dasen's room
rooms.createRoom("New room");
console.log(rooms.getRoomNumber()); // 2
console.log(rooms.getRooms()); // Dasen's room, New room
