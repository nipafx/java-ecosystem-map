export interface Graph {
	nodes: Node[]
	edges: Edge[]
}

export interface Node {
	id: String
	name: String
	parentId?: String
	parent?: Node
	html: String
}

export interface Edge {
	source: String
	target: String
}
