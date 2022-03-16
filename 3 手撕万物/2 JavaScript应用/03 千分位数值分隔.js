/**************************************************
 * 03 千分位数值分隔
 * Dasen Sun
 * 2022-03-14
 **************************************************/


function formatNumber(n) {
    const num = Number(n);
    if (isNaN(num)) return NaN;
    const numSplit = num.toString().split(".");
    let integer, decimal;
    if (numSplit.length === 1) {
        integer = numSplit[0];
        decimal = "";
    } else {
        integer = numSplit[0];
        decimal = numSplit[1];
    }
    let intFormat = "";
    let cnt = 0;
    for (let i = integer.length - 1; i >= 0; i--) {
        if (cnt % 3 === 0 && i !== integer.length - 1) {
            intFormat = "," + intFormat;
            cnt = 0;
        }
        intFormat = integer[i] + intFormat;
        cnt++;
    }
    return intFormat + (decimal && "." + decimal);
}


// 测试

console.log(formatNumber(1234567890)); // 1,234,567,890
console.log(formatNumber(1314.05)); // 1,314.05
console.log(formatNumber("1234567890")); // 1,234,567,890
console.log(formatNumber("1314521.1314")); // 1,314,521.1314