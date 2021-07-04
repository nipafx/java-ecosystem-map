import * as React from "react"

import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import { GraphChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"

import { Edge, Graph, Node } from "../types"
import { topSort } from "../infra/topSort"

const style = require("./map.module.css")

interface MapProperties {
	graph: Graph
}

const Map = ({ graph }: MapProperties) => {
	const graphFx = styleGraph(graph)
	const graphOptions = {
		series: [
			{
				type: `graph`,
				layout: `force`,
				...graphFx,
			},
		],
	}
	echarts.use([GraphChart, CanvasRenderer])

	return (
		<div className={style.container}>
			<ReactEChartsCore
				echarts={echarts}
				option={graphOptions}
				style={{
					height: "100%",
					width: "100%",
				}}
			/>
		</div>
	)
}

const styleGraph = (graph: Graph): GraphFx => {
	const forwardSortedNodes: readonly Node[] = topSort(graph.nodes)
	const backwardSortedNodes: readonly Node[] = forwardSortedNodes.slice().reverse()
	const nodeWeights: any = computeNodeWeights(backwardSortedNodes)
	const nodeColors: any = computeNodeColors(forwardSortedNodes)

	const styledNodes: StyledNode[] = graph.nodes.map((node) => ({
		id: node.id,
		name: node.name,
		symbolSize: nodeWeights[node.id as keyof any] + 5,
		itemStyle: {
			color: nodeColors[node.id as keyof any],
		},
	}))

	return { nodes: styledNodes, edges: graph.edges }
}

// `nodes` need to be topologically sorted with parents last
const computeNodeWeights = (nodes: readonly Node[]): any => {
	const nodeWeights: any = {}
	nodes.forEach(
		(node) =>
			(nodeWeights[node.id as keyof any] =
				1 +
				node.children
					.map((child) => nodeWeights[child.id as keyof any] as number)
					.reduce((p, c) => p + c, 0))
	)
	return nodeWeights
}

// `nodes` need to be topologically sorted with parents first
const computeNodeColors = (nodes: readonly Node[]): any => {
	const nodeColors: any = {}
	nodes.forEach((node) => {
		// if neither the node nor its parent defines a color, leave it `undefined`
		const nodeColor = node.color || (node.parent && nodeColors[node.parent.id as keyof any])
		nodeColors[node.id as keyof any] = nodeColor
	})
	return nodeColors
}

interface GraphFx {
	nodes: readonly StyledNode[]
	edges: readonly Edge[]
}

interface StyledNode {
	readonly id: String
	readonly name: String
	readonly symbolSize: number
	readonly itemStyle: any
}

export default Map
