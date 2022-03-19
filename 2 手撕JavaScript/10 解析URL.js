/**************************************************
 * 10 解析URL
 * Dasen Sun
 * 2022-03-14
 **************************************************/


const UrlUtil = {
    stringify(baseUrl, parasObj) {
        parasObj = parasObj || {};
        let url = baseUrl;
        let first = false;
        if (url.indexOf("?") === -1) {
            url += "?";
            first = true;
        } else if (url.indexOf("?") === url.length - 1) {
            first = true;
        }
        for (const key in parasObj) {
            if (!first && url.indexOf("&") !== url.length - 1) url += "&";
            else first = false;
            url += `${encodeURIComponent(key)}=${encodeURIComponent(parasObj[key])}`;
        }
        if (url.indexOf("?") === url.length - 1) return url.substring(0, url.length - 1);
        return url;
    },
    parse(url) {
        if (url.indexOf("?") === -1 || url.indexOf("?") === url.length - 1) return {};
        const url_s = url.split("?");
        if (url_s.length > 2) return {};
        const paras = url_s[1].split("&").map((v) => v.split("="));
        const obj = {};
        for (const [key, val] of paras) {
            obj[decodeURIComponent(key)] = decodeURIComponent(val);
        }
        return obj;
    },
    getParaItem(url, key) {
        const obj = this.parse(url);
        return obj[key];
    },
};


// 测试

let url;

url = UrlUtil.stringify("https://www.baidu.com/s", {
    wd: "hello world",
    tn: "baiduhome_pg",
});
console.log(url); // https://www.baidu.com/s?wd=hello%20world&tn=baiduhome_pg

url = UrlUtil.stringify("https://www.baidu.com/s?wd=hello%20world", {
    tn: "baiduhome_pg",
});
console.log(url); // https://www.baidu.com/s?wd=hello%20world&tn=baiduhome_pg

url = UrlUtil.stringify("https://www.baidu.com/s?", {
    wd: "hello world",
});
console.log(url); // https://www.baidu.com/s?wd=hello%20world

url = UrlUtil.stringify("https://www.baidu.com/s?");
console.log(url); // https://www.baidu.com/s

let parasObj;

parasObj = UrlUtil.parse("https://www.baidu.com/s?wd=hello%20world&tn=baiduhome_pg");
console.log(parasObj); // {wd: 'hello world', tn: 'baiduhome_pg'}

parasObj = UrlUtil.parse("https://www.baidu.com/s?error?error?");
console.log(parasObj); // {}

parasObj = UrlUtil.parse("https://www.baidu.com/s?");
console.log(parasObj); // {}

parasObj = UrlUtil.parse("https://www.baidu.com/s");
console.log(parasObj); // {}

console.log(UrlUtil.getParaItem("https://www.baidu.com/s?wd=hello%20world&tn=baiduhome_pg", "wd")); // hello world