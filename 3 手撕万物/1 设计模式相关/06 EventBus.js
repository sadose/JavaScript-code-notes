/**************************************************
 * 06 EventBus
 * Dasen Sun
 * 2022-03-19
 **************************************************/


// 全局事件总线 EventBus - 单例模式
// 观察者模式：定义对象间一种一对多的依赖关系，使得每当一个对象改变状态，则所有依赖它的对象都会得到通知并自动更新
// 某对象注册一个事件，在发生某些变化时发出(emit)该事件，其他监听(on)了该事件的对象提供回调函数，在事件发生时被调用

const EventBus = {
    subs: {},
    on(event, fn) {
        if (!this.subs[event]) this.subs[event] = [];
        this.subs[event].push(fn);
    },
    emit(event, ...args) {
        if (this.subs[event]) {
            this.subs[event].forEach(fn => fn(...args));
        }
    },
};


// 测试

EventBus.on("hello", (name) => console.log("hello", name));
EventBus.on("你好", (name) => console.log("你好", name));
EventBus.emit("hello", "dasen"); // hello dasen
EventBus.emit("你好", "大森"); // 你好 大森