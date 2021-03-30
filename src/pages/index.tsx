import * as React from "react"
import { graphql } from "gatsby"

import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import { GraphChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
	const graph = createGraph(data)
	const graphOptions = {
		series: [
			{
				type: `graph`,
				layout: `circular`,
				...graph
			},
		],
	}
	echarts.use([GraphChart, CanvasRenderer])

	return (
		<Layout>
			<SEO title="Home" />
			<ReactEChartsCore echarts={echarts} option={graphOptions} />
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

interface Graph {
	nodes: Node[]
	edges: Edge[]
}

interface Node {
	id: String
	name: String
	parentId?: String
	parent?: Node
	html: String
}

interface Edge {
	source: String
	target: String
}

export default IndexPage

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
