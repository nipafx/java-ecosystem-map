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
	let nodes: Node[] = data.graph.nodes.map(
		(node: any): Node => ({
			id: node.parent.name as String,
			name: node.frontmatter.title as String,
			parentId: node.frontmatter.parent as String,
			html: node.html as String,
		})
	)
	nodes = nodes.map(
		(node: Node): Node => ({
			...node,
			parent: node.parentId && nodes.find((n) => n.id == node.parentId),
		})
	)
	const edges: Edge[] = nodes
		.filter(node => node && node.parent)
		.map((node) => ({
			source: node.parent.id,
			target: node.id,
		}))

	return { nodes, edges }
}

export const query = graphql`
	query {
		graph: allMarkdownRemark {
			nodes {
				html
				frontmatter {
					title
					parent
				}
				parent {
					... on File {
						name
					}
				}
			}
		}
	}
`

export default IndexPage
