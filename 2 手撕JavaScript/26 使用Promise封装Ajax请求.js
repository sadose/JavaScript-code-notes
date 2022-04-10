/**************************************************
 * 26 使用Promise封装Ajax请求
 * Dasen Sun
 * 2022-04-10
 **************************************************/


// 问题描述：
// 用 XMLHttpRequest 实现一个 Ajax 请求函数，类似 fetch
// 要求能够传入 headers 对象实现定制请求头
// 返回一个 Promise ，收到响应则 resolve


function ajaxRequest(url, method, body, headers) {
    return new Promise((resolve, reject) => {
        headers = headers || {};
        body = body || null;
        method = method || "get";
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        for (const key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                reject(xhr.status);
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = function (e) {
            reject(e);
        };
        xhr.send(body);
    })
}