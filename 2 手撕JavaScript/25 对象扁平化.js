/**************************************************
 * 25 对象扁平化
 * Dasen Sun
 * 2022-03-17
 **************************************************/


const flatObject = function (target, keysPrefix, newObj) {
    if (!newObj && typeof target !== "object") return target;
    const obj = newObj || {};
    if (typeof target === "object") {
        for (const key in target) {
            let prefix;
            if (keysPrefix) prefix = keysPrefix + "." + key;
            else prefix = key;
            flatObject(target[key], prefix, obj);
        }
    } else {
        obj[keysPrefix] = target;
    }
    return obj;
};


// 测试

const obj = {
    name: "Dasen",
    age: 23,
    bestFriend: {
        name: "Tiantian",
        age: 22,
        homeTown: ["Hubei", "Huanggang"],
    },
};
console.log(flatObject(obj)); // {name: 'Dasen', age: 23, bestFriend.name: 'Tiantian', bestFriend.age: 22, bestFriend.homeTown.0: 'Hubei', …}