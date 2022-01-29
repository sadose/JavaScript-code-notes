/**************************************************
 * JavaScript高级程序设计 - 代码笔记
 * 11 客户端检测
 * Dasen Sun
 * 2022-01-22
 **************************************************/


// ==================== 能力检测 ====================

// 1 简单的能力检测

function getElement(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        return document.all[id];
    } else {
        throw new Error("No way to retrieve element! ");
    }
}


// 2 基于能力检测的浏览器分析

class BrowserDetector {
    constructor() {
        // 测试条件编译
        // IE6~10 支持
        this.isIE_Gte6Lte10 = /＊@cc_on! @＊/false;
        // 测试documentMode
        // IE7~11 支持
        this.isIE_Gte7Lte11 = !!document.documentMode;
        // 测试StyleMedia构造函数
        // Edge 20 及以上版本支持
        this.isEdge_Gte20 = !!window.StyleMedia;
        // 测试Firefox专有扩展安装API
        // 所有版本的Firefox都支持
        this.isFirefox_Gte1 = typeof InstallTrigger !== 'undefined';
        // 测试chrome对象及其webstore属性
        // Opera的某些版本有window.chrome，但没有window.chrome.webstore
        // 所有版本的Chrome都支持
        this.isChrome_Gte1 = !!window.chrome && !!window.chrome.webstore;
        // Safari早期版本会给构造函数的标签符追加"Constructor"字样，如：
        // window.Element.toString(); // [object ElementConstructor]
        // Safari 3~9.1 支持
        this.isSafari_Gte3Lte9_1 = /constructor/i.test(window.Element);
        // 推送通知API暴露在window对象上
        // 使用默认参数值以避免对undefined调用toString()
        // Safari 7.1 及以上版本支持
        this.isSafari_Gte7_1 =
            (({
                    pushNotification = {}
                } = {}) =>
                pushNotification.toString() == '[object SafariRemoteNotification]'
            )(window.safari);
        // 测试addons属性
        // Opera 20 及以上版本支持
        this.isOpera_Gte20 = !!window.opr && !!window.opr.addons;
    }
    isIE() {
        return this.isIE_Gte6Lte10 || this.isIE_Gte7Lte11;
    }
    isEdge() {
        return this.isEdge_Gte20 && !this.isIE();
    }
    isFirefox() {
        return this.isFirefox_Gte1;
    }
    isChrome() {
        return this.isChrome_Gte1;
    }
    isSafari() {
        return this.isSafari_Gte3Lte9_1 || this.isSafari_Gte7_1;
    }
    isOpera() {
        return this.isOpera_Gte20;
    }
}


// ==================== 软硬件检测 ====================

// 1 获取地理位置

let p;
navigator.geolocation.getCurrentPosition((position) => p = position);
p.timestamp // 时间戳
p.coords.latitude // 纬度
p.coords.longitude // 经度
p.coords.accuracy // 精度（单位：米）
p.coords.altitude // 高度（海拔）
p.coords.altitudeAccuracy // 海拔精度（单位：米）
p.coords.speed // 设备移动速度
p.coords.heading // 朝向（以正北方为0°的角度）

// 2 获取电池状态

let b;
navigator.getBattery().then((bs) => b = bs);
