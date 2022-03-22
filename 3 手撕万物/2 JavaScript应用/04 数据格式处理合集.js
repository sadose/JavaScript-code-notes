/**************************************************
 * 04 数据格式处理合集
 * Dasen Sun
 * 2022-03-22
 **************************************************/


// 1 实现函数 fn([['a', 'b'], ['n', 'm'], ['0', '1']]) => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']

const fn1 = (data) => {
    let last = data[0];
    const cnt = data.length;
    for (let i = 1; i < cnt; ++i) {
        const cur = [];
        for (const a of last) {
            for (const b of data[i]) {
                cur.push(a + b);
            }
        }
        last = cur;
    }
    return last;
};
console.log(fn1([
    ['a', 'b'],
    ['n', 'm'],
    ['0', '1']
])); // ['an0', 'an1', 'am0', 'am1', 'bn0', 'bn1', 'bm0', 'bm1']


// 2 实现函数 f(['ab', 'c', 'd', 'ab', 'c']) => ['ab1', 'c1', 'd', 'ab2', 'c2']

const fn2 = (data) => {
    const map = new Map();
    const len = data.length;
    for (let i = 0; i < len; ++i) {
        const key = data[i];
        if (map.has(key)) {
            const obj = map.get(key);
            if (obj.cnt === 1) data[obj.first] += 1;
            ++obj.cnt;
            data[i] += obj.cnt;
        } else map.set(key, {
            first: i,
            cnt: 1
        });
    }
    return data;
};
console.log(fn2(['ab', 'c', 'd', 'ab', 'c'])); // ['ab1', 'c1', 'd', 'ab2', 'c2']


// 3
// 输入一串字符串，根据字符串求出每个字母的数量并返回结果对象。（数字为1时可省略）
// 示例一：输入：A3B2，输出：{"A": 3, "B": 2}
// 示例二：输入：A(A(A2B)2)3C2，输出：{"A": 16, "B": 6, "C": 2}

const fn3 = (s) => {
    const len = s.length;
    const stack = [];
    const code0 = "0".charCodeAt();
    const code9 = "9".charCodeAt();
    let cnt = ""; // 统计连续的数字
    // 计算倍数的函数
    const multiply = (m) => {
        const o = stack[stack.length - 1];
        for (const key in o) o[key] *= m;
    };
    // 合并连续的统计对象
    const add = (objs) => {
        const rst = {};
        for (const o of objs) {
            for (const key in o) {
                if (key in rst) rst[key] += o[key];
                else rst[key] = o[key];
            }
        }
        return rst;
    };
    // 遍历每个字符
    for (let i = 0; i < len; ++i) {
        const c = s[i];
        const codec = c.charCodeAt();
        if (c === "(") stack.push("("); // 左括号，直接入栈
        else if (c === ")") {
            // 右括号，弹出每项合并再入栈，直到遇到左括号
            const objs = [];
            while (stack.length) {
                const item = stack.pop();
                if (item !== "(") objs.push(item)
                else break;
            }
            stack.push(add(objs));
        } else if (codec >= code0 && codec <= code9) {
            // 数字，追加到cnt末尾，如果下一个字符非数字的话，将统计到的数字乘到栈顶元素
            cnt += c;
            if (i === len - 1 || s[i + 1].charCodeAt() < code0 || s[i + 1].charCodeAt() > code9) {
                multiply(Number(cnt));
                cnt = "";
            }
        } else {
            // 其他字符，作为统计对象（出现次数为1）入栈
            stack.push({ [c]: 1 });
        }
    }
    return add(stack);
};
console.log(fn3("A(A(A2B)2)3C2")); // {A: 16, B: 6, C: 2}
console.log(fn3("A3B2")); // {A: 3, B: 2}
console.log(fn3("A3(BBC2)12D(E(F2G5)3A3EB2)10")); // {A: 33, C: 24, B: 44, D: 1, E: 20, F: 60, G: 150}