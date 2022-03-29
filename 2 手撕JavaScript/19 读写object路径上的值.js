/**************************************************
 * 19 读写object路径上的值
 * Dasen Sun
 * 2022-03-20
 **************************************************/


// 1 实现 getValue 函数来读取对象路径上的值

const getValue = function (obj, query) {
    if (query === "" || query === undefined) return obj;
    if (typeof query === "string") {
        query = query.split(".");
    }
    if (query.length === 1) {
        return obj[query.shift()];
    }
    const key = query.shift();
    if (obj[key] !== undefined) {
        return getValue(obj[key], query);
    } else {
        return undefined;
    }
};


// 2 实现 setValue 函数来修改对象路径上的值

const setValue = function (obj, query, val) {
    let t = obj;
    const rawp = query.split(".");
    const properties = rawp.slice(0, -1);
    for (const p of properties) {
        if (t === null || t === undefined) return false;
        t = obj[p];
    }
    if (typeof t !== "object") return false;
    t[rawp[rawp.length - 1]] = val;
    return true;
};


// 3 测试

const obj = {
    name: "Dasen",
    age: 23,
    bestFriend: {
        name: "Tiantian",
        age: 22,
        homeTown: ["Hubei", "Huanggang"],
    },
};

console.log(getValue(obj)); // {name: 'Dasen', age: 23, bestFriend: {…}}
console.log(getValue(obj, "")); // {name: 'Dasen', age: 23, bestFriend: {…}}
console.log(getValue(obj, "name")); // Dasen
console.log(getValue(obj, "age")); // 23
console.log(getValue(obj, "gender")); // undefined
console.log(getValue(obj, "gender.type")); // undefined
console.log(getValue(obj, "bestFriend.name")); // Tiantian
console.log(getValue(obj, "bestFriend.gender")); // undefined
console.log(getValue(obj, "bestFriend.homeTown")); // ['Hubei', 'Huanggang']
console.log(getValue(obj, "bestFriend.homeTown.1")); // Huanggang

setValue(obj, "name", "Dasen Sun");
setValue(obj, "bestFriend.age", 23);
console.log(obj); // {name: 'Dasen Sun', age: 23, bestFriend: {name: 'Tiantian', age: 23, homeTown: Array(2)}}