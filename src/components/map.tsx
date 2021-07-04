import * as React from "react"

import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import { GraphChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"

import { Edge, Graph, Node } from "../types"
import { topSort } from "../infra/topSort"
import { useMemo } from "react"

const style = require("./map.module.css")

interface MapProperties {
	graph: Graph
}

const Map = ({ graph }: MapProperties) => {
	const options = useMemo(() => {
		const graphFx = styleGraph(graph)
		return createEChartsOptions(graphFx)
	}, [graph])

	echarts.use([GraphChart, CanvasRenderer])

	return (
		<div className={style.container}>
			<ReactEChartsCore
				echarts={echarts}
				option={options}
				style={{
					height: "100%",
					width: "100%",
				}}
			/>
		</div>
	)
}

const createEChartsOptions = (graphFx: GraphFx): any => {
	const graphOptions = {
		series: [
			{
				/*
				 * TODO: consider other layout:
				 *  - tree: https://echarts.apache.org/en/option.html#series-tree, https://echarts.apache.org/en/option.html#series-tree.emphasis
				 *  - circular: https://echarts.apache.org/examples/en/editor.html?c=graph-circular-layout
				 */
				type: `graph`,
				// TODO: consider configuring force - https://echarts.apache.org/examples/en/editor.html?c=graph-webkit-dep
				layout: `force`,
				draggable: true,
				roam: true,
				scaleLimit: {
					min: 1.5,
					max: 30,
				},

				...graphFx,

				label: {
					color: "white",
					position: "right",
				},
				itemStyle: {
					border: "none",
				},
				lineStyle: {
					color: "source",
					curveness: -0.1,
				},
				emphasis: {
					focus: "adjacency",
					itemStyle: {
						color: "white",
					},
				},
			},
		],
	}

	return graphOptions
}

const styleGraph = (graph: Graph): GraphFx => {
	const forwardSortedNodes: readonly Node[] = topSort(graph.nodes)
	const backwardSortedNodes: readonly Node[] = forwardSortedNodes.slice().reverse()
	const nodeWeights: any = computeNodeWeights(backwardSortedNodes)
	const categories: Categories = computeCategories(forwardSortedNodes)

	const styledNodes: NodeFx[] = graph.nodes.map((node) => ({
		id: node.id,
		name: node.name,
		symbolSize: nodeWeights[node.id as keyof any] + 5,
		category: categories.indexByNodeId[node.id as keyof any],
		label: {
			show: nodeWeights[node.id as keyof any] > 3,
		},
		value: node.html,
	}))

	return { nodes: styledNodes, categories: categories.categories, edges: graph.edges }
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
const computeCategories = (nodes: readonly Node[]): Categories => {
	// if neither the node nor its parent has a color, assign default category
	const defaultCategory: Category = {
		name: "default",
		itemStyle: {
			// TODO: consider decal patterns intead of colors (with a switch?)
			color: "gray",
		},
	}
	const categories: Category[] = [defaultCategory]
	const indexByNodeId: any = {}
	nodes.forEach((node) => {
		if (node.color) {
			const category: Category = {
				name: node.name,
				itemStyle: {
					color: node.color,
				},
			}
			categories.push(category)
			indexByNodeId[node.id as keyof any] = categories.length - 1
		} else if (node.parent) {
			indexByNodeId[node.id as keyof any] = indexByNodeId[node.parent.id as keyof any]
		} else {
			indexByNodeId[node.id as keyof any] = 0
		}
	})
	return { categories, indexByNodeId }
}

interface GraphFx {
	readonly nodes: readonly NodeFx[]
	readonly edges: readonly Edge[]
	readonly categories: readonly Category[]
}

interface NodeFx {
	readonly id: String
	readonly name: String
	readonly category: number
	readonly symbolSize: number
}

interface Category {
	readonly name: String
	readonly itemStyle: any
}

interface Categories {
	readonly categories: readonly Category[]
	readonly indexByNodeId: any
}

export default Map
