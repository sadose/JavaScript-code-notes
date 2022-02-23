class Folder {
    size: number;
    children: (Folder | Filee)[];
    parent: Folder;
    constructor() {
        this.size = 0;
        this.children = [];
        this.parent = null;
    }
    addChild(child: Folder | Filee) {
        console.log(this);
        this.children.push(child);
        this.size += child.size;
        child.parent = this;
    }
}

class Filee {
    size: number;
    parent: Folder;
    constructor(size: number) {
        this.size = size;
        this.parent = null;
    }
}

const createProxyFolder = () => {
    const folder = new Folder();
    const proxy = new Proxy(folder, {
        set(target, p: keyof Folder, value, r) {
            if (p === "size") {
                if (target.parent) target.parent.size += value - target[p];
            }
            return Reflect.set(target, p, value, r);
        }
    });
    return proxy;
}

const createProxyFile = (size: number) => {
    const file = new Filee(size);
    const proxy = new Proxy(file, {
        set(target, p: keyof Folder, value, r) {
            if (p === "size") {
                if (target.parent) target.parent.size += value - target[p];
            }
            return Reflect.set(target, p, value, r);
        }
    });
    return proxy;
}

// test
const folder1 = createProxyFolder();
const folder2 = createProxyFolder();
folder1.addChild(folder2);
console.log(folder1.size);
console.log(folder2.size);
const file1 = createProxyFile(2);
const file2 = createProxyFile(3);
folder2.addChild(file2);
console.log(folder1.size);
console.log(folder2.size);
folder1.addChild(file1);
console.log(folder1.size);
console.log(folder2.size);
