/**************************************************
 * 28 移除空属性
 * Dasen Sun
 * 2022-03-18
 **************************************************/


Object.prototype.deleteEmptyProperty = function () {
    const delList = [];
    for (const key in this) {
        if (this[key] === null || this[key] === undefined) {
            delList.push(key);
        } else if (typeof this[key] === "object") {
            this[key].deleteEmptyProperty();
        }
    }
    for (const key of delList) {
        delete this[key];
    }
};


// 测试

const obj = {
    name: "Dasen",
    age: 23,
    girlFriend: null,
    dog: null,
    bestFriend: {
        name: "Tiantian",
        age: undefined,
        boyFriend: null,
    },
};
obj.deleteEmptyProperty();
console.log(obj); // {name: 'Dasen', age: 23, bestFriend: {name: 'Tiantian'}}