import { Queue } from "./queue";

export class TreeNode {
    value!: number
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(value: number) {
        this.value = value;
    }

}

type TraverselType = 'inorder' | 'preorder' | 'postorder'

export class BinarySearchTree {

    private root: TreeNode | null = null;

    constructor() { };

    insert(value: number) {
        const node = new TreeNode(value);
        this.insertNode(this.root, node)
    }

    /* Condition : left Node < parent Node < right Node */
    private insertNode(root: TreeNode | null, node: TreeNode) {
        if (!root) {
            this.root = node
            return
        }
        if (root.value > node.value) {
            if (root.left !== null) {
                this.insertNode(root.left, node)
            } else {
                root.left = node
            }
        } else {
            if (root.right !== null) {
                this.insertNode(root.right, node)
            } else {
                root.right = node
            }
        }
    }

    traversel(type: TraverselType) {
        this._traversal(this.root, type)
    }

    /*  Condition :
    Preorder => Traverse like  first root and all left and go to right 
    Inorder => first from end left node move to parent and right 
    postorder => first from end left node move to right and then parent
     */
    private _traversal(root: TreeNode | null, type: TraverselType) {
        if (root) {
            if (type === 'preorder') {
                console.log(root.value)
            }
            this._traversal(root.left, type)
            if (type === 'inorder') {
                console.log(root.value)
            }
            this._traversal(root.right, type)
            if (type === 'postorder') {
                console.log(root.value)
            }
        }
    }


    // Level order traversal
    bfsTraversal() {
        const queue = new Queue<TreeNode>();
        queue.enqueue(this.root as TreeNode);
        while (!queue.isEmpty()) {
            const curr = queue.dequeue();
            console.log(curr?.value)
            if (curr?.left) {
                queue.enqueue(curr?.left);
            }
            if (curr?.right) {
                queue.enqueue(curr?.right);
            }
        }
    }

    delete(value: number) {
        this.root = this.deleteNode(this.root, value)
    }

    deleteNode(root: TreeNode | null, value: number): any {
        if (root === null) {
            return null;
        }
        if (root.value > value) {
            root.left = this.deleteNode(root.left, value);
        } else if (root.value < value) {
            root.right = this.deleteNode(root.right, value);
        } else {

            if (!root.left && !root.right) {
                return null;
            }

            if (!root?.left) return root?.right;
            if (!root?.right) return root?.left;

            const minNode = this.minNode(root.right);
            root.value = minNode as number;
            root.right = this.deleteNode(root.right, minNode as number)
        }
        return root
    }

    minNode(root: TreeNode | null = this.root): number | undefined {
        if (root?.left == null) {
            return root?.value;
        } else {
            return this.minNode(root.left)
        }
    }
    maxNode(root: TreeNode | null = this.root): number | undefined {
        if (root?.right == null) {
            return root?.value;
        } else {
            return this.minNode(root.right)
        }
    }
    isEmpty() {
        return this.root === null;
    }

    getRoot() {
        return this.root;
    }
}


const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(15);
bst.traversel('postorder')
// console.log(bst.getRoot())

