export class ListNode {
    value: number
    next: ListNode | null = null

    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {

    private head: ListNode | null = null;

    private size: number = 0;

    private tail!: ListNode;

    constructor() { }

    prepend(value: number) {
        const node = new ListNode(value);
        node.next = this.head;
        this.head = node
        if (this.isEmpty()) {
            this.tail = node;
        }
        this.size++;
        return node.value;
    }

    append(value: number) {
        const node = new ListNode(value);
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
        return value;
    }

    reverse() {
        let curr = this.head as any;
        let prev: ListNode | null = null;
        this.tail = this.head as ListNode;
        while (curr) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }


    // insert(index: number, value: number) {
    //     if (index < 0 || this.size < index) {
    //         return 'unable to insert'
    //     }
    //     const node = new ListNode(value)
    //     if (index === 0) {
    //         this.head = node;
    //     } else {
    //         let curr = this.head as ListNode | null;
    //         for (let i = 0; i < index - 1; i++) {
    //             curr = curr?.next as ListNode | null;
    //         }
    //         if (curr) {
    //             const temp = curr.next;
    //             curr.next = node;
    //             node.next = temp;
    //         }
    //     }
    //     this.size++
    //     return value;
    // }

    print() {
        let curr = this.head as ListNode | null;
        let str = ''
        while (curr) {
            str += curr.value + ','
            curr = curr.next
        }
        console.log(str)
    }

    isEmpty() {
        return this.size === 0
    }

}

const list = new LinkedList();
list.append(10)
list.append(20)
list.append(30)
list.prepend(20)
list.print()