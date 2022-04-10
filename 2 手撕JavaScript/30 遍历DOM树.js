/**************************************************
 * 30 遍历DOM树
 * Dasen Sun
 * 2022-03-21
 **************************************************/


// 1 DFS 遍历 DOM 树

function dfs(node) {
    if (!node) return;
    console.log(node.nodeName.toLowerCase());
    for (const dom of node.children) {
        dfs(dom);
    }
}


// 2 BFS 遍历 DOM 树

function bfs(root) {
    if (!root) return;
    const queue = [];
    queue.push(root);
    while (queue.length) {
        const node = queue.shift();
        console.log(node.nodeName.toLowerCase());
        for (const dom of node.children) {
            queue.push(dom);
        }
    }
}


// 3 给定 Root 节点和目标 DOM 节点，实现 find 函数找出一条路径，以数组形式返回路径，无合法路径返回空数组

function find(root, target) {
    const result = [];
    const dfs = function (node) {
        result.push(node);
        if (node === target) return true;
        for (const child of node.children) {
            if (dfs(child, target)) return true;
        }
        result.pop();
        return false;
    };
    if (dfs(root)) return result;
    else return [];
}


// 4 DOM Node查找最近公共祖先

function nearestAncestor(node1,node2) {
    const set = new Set();
    let p = node1;
    set.add(p);
    while(p!==document) {
        p=p.parentNode;
        set.add(p);
    }
    p=node2;
    if(set.has(p)) return p;
    while(p) {
        p=p.parentNode;
        if(set.has(p)) return p;
    }
    return null;
}