export const topSort = <T extends SortNode>(nodes: readonly T[]): readonly T[] => {
	const orphans: T[] = nodes.filter((node) => !node.parent)
	const sortedNodes: T[] = []

	while (orphans.length > 0) {
		const current: T = orphans.pop()
		sortedNodes.push(current)
		// this assumes that all nodes have at most one incoming edge
		// (i.e. the graph is a tree/wood)
		orphans.push(...current.children)
	}

	return sortedNodes
}

export interface SortNode {
	readonly parent?: this
	readonly children: readonly this[]
}
