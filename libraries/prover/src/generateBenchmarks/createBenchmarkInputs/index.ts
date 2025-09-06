import type { FunctionSignature } from "../../types/index.ts"
import type { BenchmarkPattern } from "../detectBenchmarkPatterns/index.ts"
import generateRealisticInputs from "./generateRealisticInputs/index.ts"
import generateScaledInputs from "./generateScaledInputs/index.ts"

export type BenchmarkInputSet = {
	name: string
	description: string
	inputs: Array<Array<unknown>>
}

/**
 * Creates benchmark input sets based on detected patterns
 * Pure function that generates various input scenarios for performance testing
 * @param signature - The function signature
 * @param patterns - Detected benchmark patterns
 * @returns Array of benchmark input sets
 * @example
 * const inputs = createBenchmarkInputs(signature, patterns)
 * // Returns: [{ name: "small-array", inputs: [[1,2,3]] }]
 */
export default function createBenchmarkInputs(
	signature: FunctionSignature,
	patterns: Array<BenchmarkPattern>,
): Array<BenchmarkInputSet> {
	const realistic = generateRealisticInputs(signature, patterns)
	const scaled = generateScaledInputs(signature, patterns)

	return [...realistic, ...scaled]
}
