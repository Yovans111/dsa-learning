export class Queue<T> {
    private items: Map<number, T>;
    private rear: number;
    private front: number;

    constructor() {
        this.items = new Map<number, T>();
        this.rear = 0;
        this.front = 0;
    }

    enqueue(value: T): void {
        this.items.set(this.rear, value);
        this.rear++;
    }

    dequeue(): T | undefined {
        const item = this.items.get(this.front);
        this.items.delete(this.front);
        this.front++;
        return item
    }

    print(): void {
        console.log([...this.items.values()]);
    }

    peak(): T | undefined {
        return this.items.get(this.front);
    }

    size(): number {
        return this.items.size;
    }

    isEmpty(): boolean {
        return this.items.size <= 0;
    }
}

const queue = new Queue<number>();
console.log(queue.isEmpty());
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
console.log(queue.peak());
console.log(queue.size());
queue.print();