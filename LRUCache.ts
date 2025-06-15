class ListNode {
    key: string;
    value: number;
    prev: ListNode | null = null;
    next: ListNode | null = null;

    constructor(key: string, value: number) {
        this.key = key;
        this.value = value;
    }
}

class DoublyLinkedList {
    private head: ListNode | null = null;
    private tail: ListNode | null = null;
    private size: number = 0;

    addToTail(node: ListNode): void {
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }

    remove(node: ListNode): void {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;

        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;

        node.prev = null;
        node.next = null;

        this.size--;
    }

    moveToTail(node: ListNode): void {
        this.remove(node);
        this.addToTail(node);
    }

    removeFromFront(): ListNode | null {
        if (!this.head) return null;

        const oldHead = this.head;
        this.remove(oldHead);
        return oldHead;
    }

    getSize(): number {
        return this.size;
    }
}

class LRUCache {
    private capacity: number;
    private map: Map<string, ListNode> = new Map();
    private list: DoublyLinkedList = new DoublyLinkedList();

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: string): number {
        if (!this.map.has(key)) return -1;

        const node = this.map.get(key)!;
        this.list.moveToTail(node);
        return node.value;
    }

    put(key: string, value: number): void {
        if (this.map.has(key)) {
            const existingNode = this.map.get(key)!;
            this.list.remove(existingNode);
            this.map.delete(key);
        }

        const newNode = new ListNode(key, value);
        this.list.addToTail(newNode);
        this.map.set(key, newNode);

        if (this.list.getSize() > this.capacity) {
            const lruNode = this.list.removeFromFront();
            if (lruNode) this.map.delete(lruNode.key);
        }
    }
}
