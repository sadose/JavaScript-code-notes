/**************************************************
 * 05 阿拉伯数字转汉字数字
 * Dasen Sun
 * 2022-03-19
 **************************************************/


function numberToChinese(num) {
    let sign = "";
    if (num[0] === "-") {
        num = num.substring(1);
        sign = "负";
    }
    const map = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const part4 = (n, isSuffix) => {
        if (n < 10) {
            if (isSuffix && n === 0) return "";
            else return (isSuffix ? "零" : "") + map[n];
        } else if (n < 100) {
            if (!isSuffix && Math.floor(n / 10) === 1) return "十" + (n % 10 ? map[n % 10] : "");
            else return (isSuffix ? "零" : "") + map[Math.floor(n / 10)] + "十" + (n % 10 ? map[n % 10] : "");
        } else {
            let result = "";
            const k = Math.floor(n / 1000);
            const h = Math.floor(n % 1000 / 100);
            const t = Math.floor(n % 100 / 10);
            const g = Math.floor(n % 10);
            if (k) result += map[k] + "千";
            else if (isSuffix) result += "零";
            if (!(n % 1000)) return result;
            if (h) result += map[h] + "百";
            else if (result.length && result[result.length - 1] !== "零") result += "零";
            if (!(n % 100)) return result;
            if (t) result += map[t] + "十";
            else if (result.length && result[result.length - 1] !== "零") result += "零";
            if (!(n % 10)) return result;
            if (g) result += map[g];
            return result;
        }
    };
    const part8 = (n, isSuffix) => {
        n = Number(n);
        let result;
        if (n < 10000) result = part4(n);
        else result = part4(Math.floor(n / 10000), isSuffix) + "万" + part4(n % 10000, true)
        return result;
    };
    const len = num.length;
    if (len < 8) return sign+part8(num);
    else {
        const front = num.substring(0, len - Math.floor(len / 8) * 8);
        const back = num.substring(len - Math.floor(len / 8) * 8);
        let result = "";
        let unit = "";
        for (let i = back.length - 8, j = 0; i >= 0; i -= 8, ++j) {
            result = part8(back.substring(i, i + 8), front.length) + unit + result;
            unit += "亿";
        }
        return sign+part8(front) + unit + result;
    }
}


console.log(numberToChinese("0")); // 零
console.log(numberToChinese("100")); // 一百
console.log(numberToChinese("10005")); // 一万零五
console.log(numberToChinese("10500")); // 一万零五百
console.log(numberToChinese("123456789")); // 一亿二千三百四十五万六千七百八十九
console.log(numberToChinese("123123456789")); // 一千二百三十一亿二千三百四十五万六千七百八十九
console.log(numberToChinese("123123123123456789")); // 十二亿亿三千一百二十三万一千二百三十一亿二千三百四十五万六千七百八十九
console.log(numberToChinese("-1")); // 负一
console.log(numberToChinese("-10500")); // 负一万零五百