/**************************************************
 * 35 使用ES5语法实现const变量声明
 * Dasen Sun
 * 2022-04-10
 **************************************************/


var __const = function __const(data, value) {
    window[data] = value; // 把要定义的data挂载到window下，并赋值 value
    Object.defineProperty(window, data, {
        // 数据劫持，修改其属性描述符
        enumerable: false, // 因为const定义的属性在global下也是不存在的，所以用到了 enumerable: false 来模拟这一功能
        configurable: false,
        get: function () {
            return value;
        },
        set: function (data) {
            if (data !== value) {
                // 当要对当前属性进行赋值时，则抛出错误
                throw new TypeError('Assignment to constant variable.');
            } else {
                return value;
            }
        }
    });
}

__const('a', 10);
console.log(a);
delete a;
console.log(a);
a = 20 // 报错