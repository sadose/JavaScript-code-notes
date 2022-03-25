/**************************************************
 * 12 调用计数器（支持重置）
 * Dasen Sun
 * 2022-03-14
 **************************************************/


// 问题说明：
// 设计一个计数器，每次调用都能够使计数加一，计数变量封装在内部，并支持重置计数


// 1 类式

function Counter() {
    this.cnt = 0;
    this.add = function () {
        this.cnt++;
        console.log(this.cnt);
    };
    this.reset = function () {
        this.cnt = 0;
        console.log(this.cnt);
    };
}

const counter = new Counter();
counter.add(); // 1
counter.add(); // 2
counter.reset(); // 0
counter.add(); // 1


// 2 函数式

function createCounter() {
    let cnt = 0;
    return [
        function add() {
            cnt++;
            console.log(cnt);
        },
        function reset() {
            cnt = 0;
            console.log(cnt);
        }
    ];
}

const [count,reset] = createCounter();
count(); // 1
count(); // 2
reset(); // 0
count(); // 1