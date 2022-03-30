/**************************************************
 * 20 手写字符串方法
 * Dasen Sun
 * 2022-03-21
 **************************************************/


// 1 实现字符串翻转方法 String.prototype.reverse()

String.prototype.reverse = function () {
    let result = "";
    const len = this.length;
    for(let i=len-1;i>=0;--i) {
        result+=this[i];
    }
    return result;
};


// 2 手写 String.prototype.indexOf()

String.prototype.myIndexOf = function (c) {
    let len = this.length;
    for(let i=0;i<len;++i) {
        if(this[i]===c) return i;
    }
    return -1;
};


// 3 测试

const str = "My name is Sun Dasen.";
console.log(str.reverse()); // .nesaD nuS si eman yM
console.log(str.myIndexOf("m")); // 5
console.log(str.myIndexOf("z")); // -1