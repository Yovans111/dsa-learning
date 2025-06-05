export class CircularQueue<T> {
    private capacity: number;
    private items: (T | null)[];
    private rear: number;
    private front: number;
    private currentLength: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.items = new Array<T | null>(capacity).fill(null);
        this.rear = -1;
        this.front = 0;
        this.currentLength = 0;
    }

    enqueue(value: T): void {
        if (this.isFull()) {
            throw new Error('Queue is Full');
        }
        this.rear = (this.rear + 1) % this.capacity;
        this.items[this.rear] = value;
        this.currentLength++;
    }

    dequeue(): T | null {
        if (this.isEmpty()) {
            throw new Error('Queue is Empty');
        }
        const item = this.items[this.front];
        this.items[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        this.currentLength--;
        return item;
    }

    print(): string {
        if (this.isEmpty()) return 'Queue is Empty';
        let i = this.front, str = '';
        while (true) {
            str += this.items[i] + ',';
            i = (i + 1) % this.capacity;
            if (i === (this.rear + 1) % this.capacity) break;
        }
        return str;
    }

    isFull(): boolean {
        return this.currentLength === this.capacity;
    }

    isEmpty(): boolean {
        return this.currentLength === 0;
    }

    peak(): T | null {
        return this.items[this.front];
    }
}

const circularQueue = new CircularQueue<number>(5);
circularQueue.enqueue(10);
circularQueue.enqueue(20);
circularQueue.enqueue(30);
circularQueue.enqueue(40);
circularQueue.enqueue(50);
circularQueue.dequeue();
circularQueue.enqueue(60);
console.log(circularQueue.isFull());
console.log(circularQueue.peak());
console.log(circularQueue.print());