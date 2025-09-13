import flatMap from "../../../../libraries/toolkit/src/vanilla/array/flatMap/index.ts"
import map from "../../../../libraries/toolkit/src/vanilla/array/map/index.ts"
import sort from "../../../../libraries/toolkit/src/vanilla/array/sort/index.ts"
import type {
	BoundariesConfig,
	ContractEdge,
	ContractGraph,
} from "../types/index.ts"

//++ Extracts contract dependency graph from boundaries configuration

export default function extractGraph(
	boundaries: BoundariesConfig,
): ContractGraph {
	const deps = boundaries.dependencies
	const libraries = Object.keys(deps).sort()

	const edges = flatMap((from: string): ContractEdge[] => {
		const config = deps[from]
		const canImport = config.canImport || []

		return map((to: string): ContractEdge => ({ from, to }))(canImport)
	})(libraries)

	const sortedEdges = sort((a: ContractEdge, b: ContractEdge) => {
		if (a.from !== b.from) return a.from.localeCompare(b.from)

		return a.to.localeCompare(b.to)
	})(edges)

	return {
		version: 1,
		libraries,
		edges: sortedEdges,
	}
}

//?? [EXAMPLE]
// const boundaries = { dependencies: { parser: { canImport: ["toolkit"] } } }
// const graph = extractGraph(boundaries)
// // Returns: { version: 1, libraries: ["parser"], edges: [{ from: "parser", to: "toolkit" }] }
