class MyDomElement {
    tagName: string; // DOM标签名
    children: MyDomElement[]; // 子DOM节点列表

    constructor(tagName: string) {
        this.tagName = tagName;
        this.children = [];
    }

    addChildTag(tagNode: MyDomElement) {
        // 添加子DOM节点
        this.children.push(tagNode);
    }

    [Symbol.iterator]() {
        // 实现默认迭代器

        const list = [...this.children]; // 用于先序遍历的队列
        let node: MyDomElement; // 当前正在遍历的节点

        return {
            next() {
                // 从队列中弹出一个节点，如果它非空，进行树的前序遍历
                while ((node = list.shift())) {
                    node.children.length > 0 && list.push(...node.children);
                    return { value: node, done: false };
                }
                return { value: null, done: true };
            }
        }
    }
}
