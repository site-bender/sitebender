import type { BoundariesConfig } from "../types/index.ts"
import extractGraph from "../extractGraph/index.ts"

//++ Serializes the contract dependency graph to canonical JSON format

export default function serializeContractGraph(
	boundaries: BoundariesConfig,
): string {
	const graph = extractGraph(boundaries)
	const json = JSON.stringify(graph)

	return json
}

//?? [EXAMPLE]
// const boundaries = JSON.parse(await Deno.readTextFile("libraries/contracts/boundaries.json"))
// const serialized = serializeContractGraph(boundaries)
// console.log(serialized) // {"version":1,"libraries":["codewright","architect",...],"edges":[...]}
