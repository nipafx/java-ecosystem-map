import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
	const nodes = transform(data)
	console.log(nodes)
	return (
		<Layout>
			<SEO title="Home" />
		</Layout>
	)
}

const transform = (data) => {
	const nodes: Node[] = data.graph.nodes.map((node: any): Node => ({
		id: node.parent.name as String,
		title: node.frontmatter.title as String,
		parentId: node.frontmatter.parent as String,
		html: node.html as String,
	}))
	return nodes.map((node: Node): Node => ({
		...node,
		parent: node.parentId && nodes.find(n => n.id == node.parentId),
	}))
}

interface Node {
	id: String
	title: String
	parentId?: String
	parent?: Node
	html: String
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
