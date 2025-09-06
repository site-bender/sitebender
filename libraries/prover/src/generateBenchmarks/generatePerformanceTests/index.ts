import type { FunctionSignature } from "../../types/index.ts"
import type { BenchmarkTest } from "../types/index.ts"
import type { BenchmarkInputSet } from "../createBenchmarkInputs/index.ts"

/**
 * Generates performance test cases from input sets
 * Pure function that creates runnable benchmark tests
 * @param signature - The function signature
 * @param inputSets - Array of benchmark input sets
 * @returns Array of benchmark tests
 * @example
 * const tests = generatePerformanceTests(signature, inputSets)
 * // Returns: [{ name: "perf-small-array", iterations: 1000, ... }]
 */
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

/**
 * Calculates appropriate iteration count based on input size
 * @param inputName - Name of the input set
 * @returns Number of iterations to run
 */
function calculateIterations(inputName: string): number {
	// Scale iterations inversely with input size
	if (inputName.includes("10000")) return 10
	if (inputName.includes("1000")) return 100
	if (inputName.includes("100")) return 1000
	if (inputName.includes("recursion-depth-20")) return 100
	if (inputName.includes("recursion-depth-15")) return 500
	return 10000 // Default for small inputs
}
