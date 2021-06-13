export interface Graph {
	readonly nodes: readonly Node[]
	readonly edges: readonly Edge[]
}

export interface Node {
	readonly id: String
	readonly name: String
	readonly parentId?: String
	readonly parent?: Node
	readonly children: Node[]
	readonly color?: String
	readonly html: String
}

export interface Edge {
	readonly source: String
	readonly target: String
}
