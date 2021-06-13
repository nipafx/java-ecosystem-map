import * as React from "react"
import { graphql } from "gatsby"

import { Edge, Graph, Node } from "../types"

import Layout from "../components/layout"
import Map from "../components/map"

const IndexPage = ({ data }) => {
	const graph = createGraph(data)

	return (
		<Layout>
			<Map graph={graph} />
		</Layout>
	)
}

const createGraph = (data: any): Graph => {
	const nodes: MutableNode[] = data.graph.nodes.map(
		(node: any): MutableNode => ({
			id: node.parent.name as String,
			name: node.frontmatter.title as String,
			parentId: node.frontmatter.parent as String,
			children: [],
			color: node.frontmatter.color,
			html: node.html as String,
		})
	)
	nodes.forEach((node: MutableNode) => {
		const parent: Node = node.parentId ? nodes.find((n) => n.id == node.parentId) : undefined
		node.parent = parent
		parent?.children.push(node)
	})

	const edges: Edge[] = nodes
		.filter((node) => node && node.parent)
		.map((node) => ({
			source: node.parent.id,
			target: node.id,
		}))

	return { nodes, edges }
}

interface MutableNode extends Node {
	parent?: Node
}

export const query = graphql`
	query {
		graph: allMarkdownRemark {
			nodes {
				parent {
					... on File {
						name
					}
				}
				frontmatter {
					title
					parent
					color
				}
				html
			}
		}
	}
`

export default IndexPage
