class Graph {

    private adjacentList = new Map<string, Set<string>>();

    constructor() { }

    addVertex(vertex: string) {
        if (!this.adjacentList.has(vertex)) {
            this.adjacentList.set(vertex, new Set())
        }
    }

    addEdges(vertex1: string, vertex2: string) {

        if (!this.adjacentList.has(vertex1)) {
            this.addVertex(vertex1)
        }

        if (!this.adjacentList.has(vertex2)) {
            this.addVertex(vertex2)
        }

        this.adjacentList.get(vertex1)?.add(vertex2)
        this.adjacentList.get(vertex2)?.add(vertex1)
    }

    display() {
        for (const [key, value] of [...this.adjacentList]) {
            console.log(key + ' -> ' + [...value])
        }
    }

    hasEdge(vertex1: string, vertex2: string) {
        return (
            this.adjacentList.get(vertex1)?.has(vertex2) &&
            this.adjacentList.get(vertex2)?.has(vertex1)
        )

    }

    removeEdges(vertex1: string, vertex2: string) {
        this.adjacentList.get(vertex1)?.delete(vertex2)
        this.adjacentList.get(vertex2)?.delete(vertex1)
    }

    removeVertex(vertex: string) {
        for (const [key] of [...this.adjacentList]) {
            this.adjacentList.get(key)?.delete(vertex)
        }
        this.adjacentList.delete(vertex)
    }
}

const graph = new Graph()

graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')

graph.addEdges('A', 'B')
graph.addEdges('B', 'C')
graph.addEdges('A', 'C')

graph.removeEdges('A', 'B')
graph.removeVertex('C')


graph.display()