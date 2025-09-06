import type { FunctionSignature } from "../../../types/index.ts"
import type { BenchmarkPattern } from "../../detectBenchmarkPatterns/index.ts"
import type { BenchmarkInputSet } from "../index.ts"

/**
 * Generates scaled benchmark inputs for complexity analysis
 * Pure function that creates inputs of increasing sizes
 * @param signature - The function signature
 * @param patterns - Detected benchmark patterns
 * @returns Array of scaled input sets
 * @example
 * const inputs = generateScaledInputs(signature, patterns)
 * // Returns: [{ name: "scale-10", inputs: [...] }]
 */
export default function generateScaledInputs(
	_signature: FunctionSignature,
	patterns: Array<BenchmarkPattern>,
): Array<BenchmarkInputSet> {
	const inputSets: Array<BenchmarkInputSet> = []
	const scales = [10, 100, 1000, 10000]

	// Generate scaled inputs for patterns that benefit from scaling
	patterns.forEach((pattern) => {
		switch (pattern) {
			case "array-operation":
			case "iterative":
				scales.forEach((size) => {
					inputSets.push({
						name: `scale-${size}`,
						description: `Array with ${size} elements`,
						inputs: [[Array.from({ length: size }, (_, i) => i)]],
					})
				})
				break

			case "string-manipulation":
				scales.forEach((size) => {
					inputSets.push({
						name: `string-scale-${size}`,
						description: `String with ${size} characters`,
						inputs: [["a".repeat(size)]],
					})
				})
				break

			case "recursive":
				// Limit recursion depth to prevent stack overflow
				;[5, 10, 15, 20].forEach((depth) => {
					inputSets.push({
						name: `recursion-depth-${depth}`,
						description: `Recursion depth of ${depth}`,
						inputs: [[depth]],
					})
				})
				break

			case "numeric-computation":
				scales.forEach((size) => {
					inputSets.push({
						name: `numeric-scale-${size}`,
						description: `Number value ${size}`,
						inputs: [[size]],
					})
				})
				break
		}
	})

	return inputSets
}
