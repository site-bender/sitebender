import type { FunctionSignature } from "../../types/index.ts"
import type { BenchmarkInputSet } from "../createBenchmarkInputs/index.ts"
import type { BenchmarkTest } from "../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generatePerformanceTests(
	_signature: FunctionSignature,
	inputSets: Array<BenchmarkInputSet>,
): Array<BenchmarkTest> {
	return inputSets.flatMap((inputSet) =>
		inputSet.inputs.map((input) => ({
			name: `perf-${inputSet.name}`,
			description: `Performance test: ${inputSet.description}`,
			input,
			iterations: calculateIterations(inputSet.name),
			warmupRuns: 10,
		}))
	)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function calculateIterations(inputName: string): number {
	// Scale iterations inversely with input size
	if (inputName.includes("10000")) return 10
	if (inputName.includes("1000")) return 100
	if (inputName.includes("100")) return 1000
	if (inputName.includes("recursion-depth-20")) return 100
	if (inputName.includes("recursion-depth-15")) return 500
	return 10000 // Default for small inputs
}
