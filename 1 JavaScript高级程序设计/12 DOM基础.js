/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 12 DOM基础
 * Dasen Sun
 * 2022-01-26
 **************************************************/


// ==================== DOM 编程 ====================

// 1 动态脚本

// 动态添加外部JS文件
let script = document.createElement("script");
script.src = "foo.js";
document.body.appendChild(script);

// 动态添加外部JS文件 - 函数
function loadScript(url) {
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}

// 添加内联JS代码 - 方法一
let script = document.createElement("script");
script.appendChild(document.createTextNode("function sayHi(){alert('hi'); }"));
document.body.appendChild(script);

// 添加内联JS代码 - 方法二
var script = document.createElement("script");
script.text = "functionsayHi(){alert('hi');}";
document.body.appendChild(script);

// 添加内联JS代码 - 综合
function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        script.text = code;
    }
    document.body.appendChild(script);
}


// ==================== MutationObserver 接口 ====================

// 1 基本用法

// 创建 MutationObserver 实例
let observer = new MutationObserver(() => console.log('DOM was mutated! '));

// 绑定观察
let observer = new MutationObserver(() => console.log('<body> attributes changed'));
observer.observe(document.body, {
    attributes: true
});

// 终止观察
let observer = new MutationObserver(() => console.log('<body> attributes changed'));
observer.observe(document.body, {
    attributes: true
});
observer.disconnect();
