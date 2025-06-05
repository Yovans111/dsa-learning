export class HashTable {

    private table: [string, any][][] = [];

    private size: number = 0

    constructor(size: number) {
        this.table = new Array(size)
        this.size = size;
    }


    hash(key: string) {
        let hashKey: number = 0;
        for (let i = 0; i < key.length; i++) {
            hashKey += key.charCodeAt(i);
        }
        return hashKey % this.size;
    }

    set(key: string, value: any): void {
        const hashKey = this.hash(key);
        if (!this.table[hashKey]) {
            this.table[hashKey] = []
        }
        const bucket = this.table[hashKey];


        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
    }

    get(key: string) {
        const hashKey = this.hash(key);
        const bucket = this.table[hashKey];
        if (bucket) {
            for (const pair of bucket) {
                if (pair[0] === key) {
                    return pair[1];
                }
            }
        }
        return undefined

    }

    remove(key: string) {
        const hashKey = this.hash(key);
        const bucket = this.table[hashKey];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                return true
            }
        }
        return false
    }

}

const hashTable = new HashTable(10);
hashTable.set("name", "John");
hashTable.set("age", 30);
hashTable.set("city", "New York");
console.log(hashTable.get("name")); // Output: "John"
console.log(hashTable.get("age")); // Output: 30
console.log(hashTable.get("city")); // Output: "New York"
hashTable.remove("age");
console.log(hashTable.get("age")); // Output: undefined