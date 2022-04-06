/**************************************************
 * 33 实现Jsonp跨域请求
 * Dasen Sun
 * 2022-03-24
 **************************************************/


const jsonp = ({
    url,
    params,
    callbackName
}) => {
    const generateURL = () => {
        let dataStr = '';
        for (let key in params) {
            dataStr += `${key}=${params[key]}&`;
        }
        dataStr += `callback=${callbackName}`;
        return `${url}?${dataStr}`;
    };
    return new Promise((resolve, reject) => {
        // 初始化回调函数名称
        callbackName = callbackName || Math.random().toString.replace(',', '');
        // 创建 script 元素并加入到当前文档中
        let scriptEle = document.createElement('script');
        scriptEle.src = generateURL();
        document.body.appendChild(scriptEle);
        // 绑定到 window 上，为了后面调用
        window[callbackName] = (data) => {
            resolve(data);
            // script 执行完了，成为无用元素，需要清除
            document.body.removeChild(scriptEle);
        }
    });
};