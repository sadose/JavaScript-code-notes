class ListNode {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.pre = null;
        this.next = null;
    }
}

const LRUCache = function (capacity) {
    this.size = capacity;
    this.map = new Map();
    this.head = new ListNode(null, null);
    this.tail = new ListNode(null, null);
    this.head.next = this.tail;
    this.tail.pre = this.head;
};

LRUCache.prototype.get = function (key) {
    if (!this.map.has(key)) return -1;
    let val = this.map.get(key).val;
    this.put(key, val);
    return val;
};

LRUCache.prototype.put = function (key, value) {
    if (!this.map.has(key)) {
        if (this.map.size === this.size) {
            let node = this.tail.pre;
            let k = node.key;
            this.tail.pre = node.pre;
            node.pre.next = this.tail;
            node.pre = null;
            node.next = null;
            node = null;
            this.map.delete(k);
        }
        let node = new ListNode(key, value);
        node.next = this.head.next;
        node.pre = this.head;
        node.next.pre = node;
        node.pre.next = node;
        this.map.set(key, node);
    } else {
        let node = this.map.get(key);
        node.val = value;
        if (node.pre !== this.head) {
            node.pre.next = node.next;
            node.next.pre = node.pre;
            node.pre = this.head;
            node.next = this.head.next;
            node.pre.next = node;
            node.next.pre = node;
        }
    }
};