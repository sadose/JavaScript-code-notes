/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 14 DOM2和DOM3
 * Dasen Sun
 * 2022-03-06
 **************************************************/


// ==================== 核心、视图和HTML ====================

// 1 给节点追加数据

// 追加数据
document.body.setUserData("name", "Nicholas", function () {});
// 获取数据
let value = document.body.getUserData("name");


// ==================== 样式 ====================

// 1 操作元素内联样式

// 获取元素 DOM
let div = document.getElementById("myDiv");
// 设置背景颜色
div.style.backgroundColor = "red";
// 修改大小
div.style.width = "100px";
div.style.height = "200px";
// 设置边框
div.style.border = "1px solid black";


// 2 操作的外联样式表

// 读取文档中的样式表
let sheet = null;
for (let i = 0, len = document.styleSheets.length; i < len; i++) {
    sheet = document.styleSheets[i];
    console.log(sheet.href);
}

// 操作样式表
let sheet = document.styleSheets[0];
let rules = sheet.cssRules || sheet.rules; // 取得规则集合
let rule = rules[0]; // 取得第一条规则
rule.style.backgroundColor = "red"; // 修改它


// 3 元素尺寸

// 计算元素在页面上的左偏移
function getElementLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

// 计算元素在页面上的上偏移
function getElementTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
