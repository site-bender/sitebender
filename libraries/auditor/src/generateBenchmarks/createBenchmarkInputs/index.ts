import type { FunctionSignature } from "../../types/index.ts"
import type { BenchmarkPattern } from "../detectBenchmarkPatterns/index.ts"

import generateRealisticInputs from "./generateRealisticInputs/index.ts"
import generateScaledInputs from "./generateScaledInputs/index.ts"

export type BenchmarkInputSet = {
	name: string
	description: string
	inputs: Array<Array<unknown>>
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createBenchmarkInputs(
	signature: FunctionSignature,
	patterns: Array<BenchmarkPattern>,
): Array<BenchmarkInputSet> {
	const realistic = generateRealisticInputs(signature, patterns)
	const scaled = generateScaledInputs(signature, patterns)

	return [...realistic, ...scaled]
}
