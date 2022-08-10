// 一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到Map的末尾，整个栈倒序查看
// Map对象类似于队列，使用map.entries()、keys()或values()得到MapIterator，使用.next()获取元素。

class LRUCache {
    constructor(capacity) {
        this.secretKey = new Map();
        this.capacity = capacity;
    }

    get(key) {
        if (this.secretKey.has(key)) {
            let tempValue = this.secretKey.get(key);
            // 将索引的元素置于最后面，即最近使用的元素
            this.secretKey.delete(key);
            this.secretKey.set(key, tempValue);

            return tempValue;
        } else return -1;
    }
    put(key, value) {
        // key存在，仅修改值
        if (this.secretKey.has(key)) {
            this.secretKey.delete(key);
            this.secretKey.set(key, value);
        }
        // key不存在，cache未满
        else if (this.secretKey.size < this.capacity) {
            this.secretKey.set(key, value);
        } 
        // key不存在，cache已满
        else {
            this.secretKey.set(key, value);
            // 删除map第一个元素，即最长时间未使用的元素
            this.secretKey.delete(this.secretKey.keys().next().value);
        }
    }
}

let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("cache.get(1)", cache.get(1))// 返回  1
cache.put(3, 3);// 该操作会使得密钥 2 作废
console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
cache.put(4, 4);// 该操作会使得密钥 1 作废
console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
console.log("cache.get(3)", cache.get(3))// 返回  3
console.log("cache.get(4)", cache.get(4))// 返回  4

