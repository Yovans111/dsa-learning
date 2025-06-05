export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    add(value: T): number {
        return this.items.push(value);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    print(): void {
        console.log(this.items.toString());
    }
}

const stack = new Stack<number>();

stack.add(1);
stack.add(2);
stack.add(3);
stack.pop();
stack.add(4);
stack.print();