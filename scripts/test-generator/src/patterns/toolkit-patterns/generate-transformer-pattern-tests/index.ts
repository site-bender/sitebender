/**
 * Generate tests for transformer pattern functions
 */

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

/**
 * Generate test cases for transformer functions (map, filter, reduce, etc.)
 * @param signature Function signature
 * @returns Array of transformer-specific test cases
 */
export default function generateTransformerPatternTests(
	signature: FunctionSignature
): Array<TestCase> {
	const tests: Array<TestCase> = []
	const name = signature.name.toLowerCase()
	
	// Map pattern tests
	if (name.includes("map")) {
		tests.push({
			name: "preserves array length",
			description: "Map preserves the length of the input array",
			input: [(x: number) => x * 2, [1, 2, 3]],
			expectedOutput: [2, 4, 6],
			properties: [{
				name: "length preservation",
				generator: "fc.func(fc.anything()), fc.array(fc.anything())",
				property: `
					const result = map(fn)(arr)
					return result.length === arr.length
				`,
			}],
		})
		
		tests.push({
			name: "identity map",
			description: "Mapping with identity returns original array",
			input: [(x: unknown) => x, [1, 2, 3]],
			expectedOutput: [1, 2, 3],
			properties: [{
				name: "identity law",
				generator: "fc.array(fc.anything())",
				property: `
					const result = map(x => x)(arr)
					return JSON.stringify(result) === JSON.stringify(arr)
				`,
			}],
		})
		
		tests.push({
			name: "composition law",
			description: "map(f ∘ g) = map(f) ∘ map(g)",
			input: [(x: number) => x + 1, [1, 2, 3]],
			expectedOutput: [2, 3, 4],
			properties: [{
				name: "functor composition",
				generator: "fc.func(fc.integer()), fc.func(fc.integer()), fc.array(fc.integer())",
				property: `
					const composed = map(x => f(g(x)))(arr)
					const separate = map(f)(map(g)(arr))
					return JSON.stringify(composed) === JSON.stringify(separate)
				`,
			}],
		})
	}
	
	// Filter pattern tests
	if (name.includes("filter")) {
		tests.push({
			name: "returns subset",
			description: "Filter returns subset of original array",
			input: [(x: number) => x > 2, [1, 2, 3, 4]],
			expectedOutput: [3, 4],
			properties: [{
				name: "subset property",
				generator: "fc.func(fc.boolean()), fc.array(fc.anything())",
				property: `
					const result = filter(pred)(arr)
					return result.every(item => arr.includes(item)) &&
					       result.length <= arr.length
				`,
			}],
		})
		
		tests.push({
			name: "preserves order",
			description: "Filter preserves relative order of elements",
			input: [(x: number) => x % 2 === 0, [1, 2, 3, 4, 5, 6]],
			expectedOutput: [2, 4, 6],
			properties: [{
				name: "order preservation",
				generator: "fc.func(fc.boolean()), fc.array(fc.integer())",
				property: `
					const result = filter(pred)(arr)
					for (let i = 0; i < result.length - 1; i++) {
						const idx1 = arr.indexOf(result[i])
						const idx2 = arr.indexOf(result[i + 1])
						if (idx1 >= idx2) return false
					}
					return true
				`,
			}],
		})
	}
	
	// Reduce pattern tests
	if (name.includes("reduce")) {
		tests.push({
			name: "handles empty array with initial value",
			description: "Reduce with initial value on empty array returns initial",
			input: [(acc: number, x: number) => acc + x, 0, []],
			expectedOutput: 0,
		})
		
		tests.push({
			name: "accumulates correctly",
			description: "Reduce accumulates values in order",
			input: [(acc: number, x: number) => acc + x, 0, [1, 2, 3, 4]],
			expectedOutput: 10,
			properties: [{
				name: "accumulation",
				generator: "fc.func(fc.integer()), fc.integer(), fc.array(fc.integer())",
				property: `
					const result = reduce(fn)(init)(arr)
					let manual = init
					for (const item of arr) {
						manual = fn(manual, item)
					}
					return result === manual
				`,
			}],
		})
	}
	
	// Transform pattern tests
	if (name.includes("transform") || name.includes("convert")) {
		tests.push({
			name: "transforms input type",
			description: "Successfully transforms from input to output type",
			input: ["123"],
			expectedOutput: 123,
			properties: [{
				name: "type transformation",
				generator: "fc.anything()",
				property: `
					const result = ${signature.name}(input)
					return typeof result === '${signature.returnType.raw}'
				`,
			}],
		})
	}
	
	return tests
}