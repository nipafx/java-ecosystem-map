import * as React from "react"

import ReactEChartsCore from "echarts-for-react/lib/core"
import * as echarts from "echarts/core"
import { GraphChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"

import { Graph } from "../types"

interface MapProperties {
	graph: Graph
}

const Map = ({ graph }: MapProperties) => {
	const graphOptions = {
		series: [
			{
				type: `graph`,
				layout: `circular`,
				...graph,
			},
		],
	}
	echarts.use([GraphChart, CanvasRenderer])

	return (
		<div>
			<ReactEChartsCore echarts={echarts} option={graphOptions} />
		</div>
	)
}

export default Map
