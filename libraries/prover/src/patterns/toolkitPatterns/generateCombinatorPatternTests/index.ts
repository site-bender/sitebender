/**
 * Generate tests for combinator pattern functions
 */

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

/**
 * Generate test cases for combinator functions (higher-order functions)
 * @param signature Function signature
 * @returns Array of combinator-specific test cases
 */
export default function generateCombinatorPatternTests(
	signature: FunctionSignature,
): Array<TestCase> {
	const tests: Array<TestCase> = []
	const name = signature.name.toLowerCase()

	// Curry combinator tests
	if (name.includes("curry")) {
		tests.push({
			name: "converts multi-arg to curried",
			description: "Transforms function to accept arguments one at a time",
			input: [(a: number, b: number) => a + b],
			expectedOutput: undefined, // Returns a function
			properties: [{
				name: "curry transformation",
				generator: "fc.func(fc.integer()), fc.integer(), fc.integer()",
				property: `
					const curried = curry(fn)
					const result1 = curried(a)(b)
					const result2 = fn(a, b)
					return result1 === result2
				`,
			}],
		})

		tests.push({
			name: "handles variable arity",
			description: "Works with different numbers of arguments",
			input: [(a: number, b: number, c: number) => a + b + c],
			expectedOutput: undefined,
			properties: [{
				name: "variable arity",
				generator:
					"fc.func(fc.integer()), fc.array(fc.integer(), { minLength: 1, maxLength: 5 })",
				property: `
					const curried = curry(fn)
					const args = [...arguments]
					const result = args.reduce((f, arg) => f(arg), curried)
					const expected = fn(...args)
					return result === expected
				`,
			}],
		})
	}

	// Flip combinator tests
	if (name.includes("flip")) {
		tests.push({
			name: "reverses argument order",
			description: "Flips the first two arguments",
			input: [(a: number, b: number) => a - b, 5, 3],
			expectedOutput: -2, // flip(subtract)(5, 3) = subtract(3, 5) = 3 - 5
			properties: [{
				name: "argument reversal",
				generator: "fc.func(fc.integer()), fc.integer(), fc.integer()",
				property: `
					const flipped = flip(fn)
					return flipped(a, b) === fn(b, a)
				`,
			}],
		})

		tests.push({
			name: "double flip is identity",
			description: "Flipping twice returns original",
			input: [(a: number, b: number) => a / b],
			expectedOutput: undefined,
			properties: [{
				name: "involution",
				generator: "fc.func(fc.integer()), fc.integer(), fc.integer()",
				property: `
					const doubleFlipped = flip(flip(fn))
					return doubleFlipped(a, b) === fn(a, b)
				`,
			}],
		})
	}

	// Partial application tests
	if (name.includes("partial")) {
		tests.push({
			name: "fixes initial arguments",
			description: "Partially applies first arguments",
			input: [(a: number, b: number, c: number) => a + b + c, 1, 2],
			expectedOutput: undefined, // Returns a function
			properties: [{
				name: "partial application",
				generator:
					"fc.func(fc.integer()), fc.array(fc.integer(), { minLength: 1 }), fc.integer()",
				property: `
					const partial = partialApply(fn, ...fixed)
					const result = partial(remaining)
					const expected = fn(...fixed, remaining)
					return result === expected
				`,
			}],
		})
	}

	// Identity combinator
	if (name === "identity" || name === "id") {
		tests.push({
			name: "returns input unchanged",
			description: "Identity function returns its argument",
			input: [42],
			expectedOutput: 42,
			properties: [{
				name: "identity law",
				generator: "fc.anything()",
				property: `
					return identity(input) === input
				`,
			}],
		})
	}

	// Constant combinator
	if (name === "constant" || name === "const" || name === "always") {
		tests.push({
			name: "always returns same value",
			description: "Returns constant regardless of input",
			input: [42, "ignored"],
			expectedOutput: 42,
			properties: [{
				name: "constant return",
				generator: "fc.anything(), fc.array(fc.anything())",
				property: `
					const k = constant(value)
					const results = inputs.map(k)
					return results.every(r => r === value)
				`,
			}],
		})
	}

	return tests
}
