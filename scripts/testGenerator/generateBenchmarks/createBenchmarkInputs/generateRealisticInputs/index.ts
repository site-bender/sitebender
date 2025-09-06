import type { FunctionSignature } from "../../../types/index.ts"
import type { BenchmarkPattern } from "../../detectBenchmarkPatterns/index.ts"
import type { BenchmarkInputSet } from "../index.ts"

/**
 * Generates realistic benchmark inputs based on common use cases
 * Pure function that creates real-world input scenarios
 * @param signature - The function signature
 * @param patterns - Detected benchmark patterns
 * @returns Array of realistic input sets
 * @example
 * const inputs = generateRealisticInputs(signature, patterns)
 * // Returns: [{ name: "typical-use", inputs: [...] }]
 */
export default function generateRealisticInputs(
	signature: FunctionSignature,
	patterns: Array<BenchmarkPattern>
): Array<BenchmarkInputSet> {
	const inputSets: Array<BenchmarkInputSet> = []
	
	// Generate based on patterns
	patterns.forEach(pattern => {
		switch (pattern) {
			case 'array-operation':
				inputSets.push({
					name: 'empty-array',
					description: 'Empty array input',
					inputs: [[[]]]
				})
				inputSets.push({
					name: 'small-array',
					description: 'Small array (10 elements)',
					inputs: [[Array.from({ length: 10 }, (_, i) => i)]]
				})
				inputSets.push({
					name: 'medium-array',
					description: 'Medium array (100 elements)',
					inputs: [[Array.from({ length: 100 }, (_, i) => i)]]
				})
				break
				
			case 'string-manipulation':
				inputSets.push({
					name: 'empty-string',
					description: 'Empty string input',
					inputs: [['']]
				})
				inputSets.push({
					name: 'short-string',
					description: 'Short string (10 chars)',
					inputs: [['hello test']]
				})
				inputSets.push({
					name: 'long-string',
					description: 'Long string (1000 chars)',
					inputs: [['a'.repeat(1000)]]
				})
				break
				
			case 'numeric-computation':
				inputSets.push({
					name: 'small-numbers',
					description: 'Small number inputs',
					inputs: [[1], [10], [100]]
				})
				inputSets.push({
					name: 'large-numbers',
					description: 'Large number inputs',
					inputs: [[1000], [10000], [100000]]
				})
				break
				
			case 'recursive':
				inputSets.push({
					name: 'base-case',
					description: 'Base case for recursion',
					inputs: [[0], [1]]
				})
				inputSets.push({
					name: 'shallow-recursion',
					description: 'Shallow recursion depth',
					inputs: [[5]]
				})
				break
				
			default:
				// Generic inputs for unknown patterns
				inputSets.push({
					name: 'default-input',
					description: 'Default test input',
					inputs: [[signature.parameters[0] ? 1 : undefined]]
				})
		}
	})
	
	return inputSets
}