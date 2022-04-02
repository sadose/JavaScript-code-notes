/**************************************************
 * 34 对象展开
 * Dasen Sun
 * 2022-04-02
 **************************************************/


// 对象扁平化的逆过程

const unfoldObject = function (obj) {
    const result = {};
    for (const properties in obj) {
        const value = obj[properties];
        const pList = properties.split(".");
        let cur = result;
        const len = pList.length;
        for (let i = 0; i < len; ++i) {
            const p = pList[i];
            if (p in cur) {
                if (i === len - 1) cur[p] = value;
            } else {
                if (i < len - 1) cur[p] = {};
                else cur[p] = value
            }
            cur = cur[p];
        }
    }
    return result;
};

const obj = {
    "name": "Dasen",
    "age": 23,
    "bestFriend.name": "Tiantian",
    "bestFriend.age": 22,
    "bestFriend.homeTown.0": "Hubei",
    "bestFriend.homeTown.1": "Huanggang",
    "bestFriend.homeTown..length": 2,
};
console.log(unfoldObject(obj)); // {name: 'Dasen', age: 23, bestFriend: {…}}