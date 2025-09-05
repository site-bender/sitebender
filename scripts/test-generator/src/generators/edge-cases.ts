/**
 * Generates edge case tests for functions
 */

import type { FunctionSignature, TestCase, Parameter } from "../types/index.ts"
import { getEdgeCasesForType } from "./type-mappings.ts"

/**
 * Generate comprehensive edge case tests for a function
 */
export function generateEdgeCaseTests(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []

	// Generate null/undefined tests if parameters allow
	tests.push(...generateNullUndefinedTests(signature))

	// Generate type-specific edge cases
	tests.push(...generateTypeSpecificEdgeCases(signature))

	// Generate boundary value tests
	tests.push(...generateBoundaryValueTests(signature))

	// Generate empty collection tests
	tests.push(...generateEmptyCollectionTests(signature))

	// Generate special numeric tests
	tests.push(...generateSpecialNumericTests(signature))

	// Generate string edge cases
	tests.push(...generateStringEdgeCases(signature))

	// Generate function-specific edge cases based on name
	tests.push(...generateNameBasedEdgeCases(signature))

	return tests
}

/**
 * Generate tests for null and undefined inputs
 */
function generateNullUndefinedTests(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []
	
	for (const param of signature.parameters) {
		if (param.optional || param.type.includes("null") || param.type.includes("undefined")) {
			tests.push({
				name: `handles null input for ${param.name}`,
				description: `Test function behavior with null ${param.name}`,
				type: "edge",
				code: `
it("handles null input for ${param.name}", () => {
	const result = ${signature.name}(null)
	assertExists(result) // or appropriate assertion
})`
			})

			tests.push({
				name: `handles undefined input for ${param.name}`,
				description: `Test function behavior with undefined ${param.name}`,
				type: "edge",
				code: `
it("handles undefined input for ${param.name}", () => {
	const result = ${signature.name}(undefined)
	assertExists(result) // or appropriate assertion
})`
			})
		}
	}

	return tests
}

/**
 * Generate type-specific edge cases
 */
function generateTypeSpecificEdgeCases(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []

	for (const param of signature.parameters) {
		const edgeCases = getEdgeCasesForType(param.type)
		
		for (const edgeCase of edgeCases) {
			tests.push({
				name: `handles edge case ${edgeCase} for ${param.name}`,
				description: `Test with ${edgeCase} as ${param.name}`,
				type: "edge",
				code: `
it("handles ${edgeCase} for ${param.name}", () => {
	const input = ${edgeCase}
	const result = ${signature.name}(input)
	assertExists(result)
	// Add specific assertions based on expected behavior
})`
			})
		}
	}

	return tests
}

/**
 * Generate boundary value tests
 */
function generateBoundaryValueTests(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []

	for (const param of signature.parameters) {
		if (param.type === "number" || param.type === "bigint") {
			tests.push({
				name: `handles maximum safe integer for ${param.name}`,
				description: `Test with Number.MAX_SAFE_INTEGER`,
				type: "edge",
				code: `
it("handles maximum safe integer for ${param.name}", () => {
	const result = ${signature.name}(Number.MAX_SAFE_INTEGER)
	assertExists(result)
})`
			})

			tests.push({
				name: `handles minimum safe integer for ${param.name}`,
				description: `Test with Number.MIN_SAFE_INTEGER`,
				type: "edge",
				code: `
it("handles minimum safe integer for ${param.name}", () => {
	const result = ${signature.name}(Number.MIN_SAFE_INTEGER)
	assertExists(result)
})`
			})
		}
	}

	return tests
}

/**
 * Generate tests for empty collections
 */
function generateEmptyCollectionTests(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []

	for (const param of signature.parameters) {
		if (param.type.includes("Array") || param.type.includes("[]")) {
			tests.push({
				name: `handles empty array for ${param.name}`,
				description: `Test with empty array`,
				type: "edge",
				code: `
it("handles empty array for ${param.name}", () => {
	const result = ${signature.name}([])
	assertExists(result)
	if (Array.isArray(result)) {
		assertEquals(result.length, 0)
	}
})`
			})

			tests.push({
				name: `handles single element array for ${param.name}`,
				description: `Test with array containing one element`,
				type: "edge",
				code: `
it("handles single element array for ${param.name}", () => {
	const result = ${signature.name}([1])
	assertExists(result)
	if (Array.isArray(result)) {
		assertEquals(result.length, 1)
	}
})`
			})

			tests.push({
				name: `handles array with undefined elements for ${param.name}`,
				description: `Test with sparse array`,
				type: "edge",
				code: `
it("handles sparse array for ${param.name}", () => {
	const sparseArray = new Array(5)
	sparseArray[2] = "value"
	const result = ${signature.name}(sparseArray)
	assertExists(result)
})`
			})
		}

		if (param.type.includes("Set")) {
			tests.push({
				name: `handles empty Set for ${param.name}`,
				description: `Test with empty Set`,
				type: "edge",
				code: `
it("handles empty Set for ${param.name}", () => {
	const result = ${signature.name}(new Set())
	assertExists(result)
})`
			})
		}

		if (param.type.includes("Map")) {
			tests.push({
				name: `handles empty Map for ${param.name}`,
				description: `Test with empty Map`,
				type: "edge",
				code: `
it("handles empty Map for ${param.name}", () => {
	const result = ${signature.name}(new Map())
	assertExists(result)
})`
			})
		}

		if (param.type.includes("object") || param.type.startsWith("{")) {
			tests.push({
				name: `handles empty object for ${param.name}`,
				description: `Test with empty object`,
				type: "edge",
				code: `
it("handles empty object for ${param.name}", () => {
	const result = ${signature.name}({})
	assertExists(result)
})`
			})

			tests.push({
				name: `handles object with null prototype for ${param.name}`,
				description: `Test with Object.create(null)`,
				type: "edge",
				code: `
it("handles object with null prototype for ${param.name}", () => {
	const obj = Object.create(null)
	const result = ${signature.name}(obj)
	assertExists(result)
})`
			})
		}
	}

	return tests
}

/**
 * Generate tests for special numeric values
 */
function generateSpecialNumericTests(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []

	for (const param of signature.parameters) {
		if (param.type === "number") {
			// NaN test
			tests.push({
				name: `handles NaN for ${param.name}`,
				description: `Test with NaN value`,
				type: "edge",
				code: `
it("handles NaN for ${param.name}", () => {
	const result = ${signature.name}(NaN)
	// NaN handling varies by function
	assertExists(result)
})`
			})

			// Infinity tests
			tests.push({
				name: `handles Infinity for ${param.name}`,
				description: `Test with positive Infinity`,
				type: "edge",
				code: `
it("handles Infinity for ${param.name}", () => {
	const result = ${signature.name}(Infinity)
	assertExists(result)
})`
			})

			tests.push({
				name: `handles -Infinity for ${param.name}`,
				description: `Test with negative Infinity`,
				type: "edge",
				code: `
it("handles -Infinity for ${param.name}", () => {
	const result = ${signature.name}(-Infinity)
	assertExists(result)
})`
			})

			// Zero tests
			tests.push({
				name: `handles positive zero for ${param.name}`,
				description: `Test with +0`,
				type: "edge",
				code: `
it("handles positive zero for ${param.name}", () => {
	const result = ${signature.name}(0)
	assertExists(result)
})`
			})

			tests.push({
				name: `handles negative zero for ${param.name}`,
				description: `Test with -0`,
				type: "edge",
				code: `
it("handles negative zero for ${param.name}", () => {
	const result = ${signature.name}(-0)
	assertExists(result)
	// Check for -0 vs +0 if relevant
})`
			})

			// Very small numbers
			tests.push({
				name: `handles epsilon for ${param.name}`,
				description: `Test with Number.EPSILON`,
				type: "edge",
				code: `
it("handles epsilon for ${param.name}", () => {
	const result = ${signature.name}(Number.EPSILON)
	assertExists(result)
})`
			})
		}
	}

	return tests
}

/**
 * Generate string-specific edge cases
 */
function generateStringEdgeCases(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []

	for (const param of signature.parameters) {
		if (param.type === "string") {
			// Empty string
			tests.push({
				name: `handles empty string for ${param.name}`,
				description: `Test with empty string`,
				type: "edge",
				code: `
it("handles empty string for ${param.name}", () => {
	const result = ${signature.name}("")
	assertExists(result)
})`
			})

			// Whitespace
			tests.push({
				name: `handles whitespace for ${param.name}`,
				description: `Test with various whitespace characters`,
				type: "edge",
				code: `
it("handles whitespace for ${param.name}", () => {
	const whitespaces = [" ", "\\t", "\\n", "\\r", "\\f"]
	for (const ws of whitespaces) {
		const result = ${signature.name}(ws)
		assertExists(result)
	}
})`
			})

			// Unicode
			tests.push({
				name: `handles unicode for ${param.name}`,
				description: `Test with unicode characters`,
				type: "edge",
				code: `
it("handles unicode for ${param.name}", () => {
	const unicodeStrings = ["🚀", "你好", "مرحبا", "\\u0000", "\\uFFFF"]
	for (const str of unicodeStrings) {
		const result = ${signature.name}(str)
		assertExists(result)
	}
})`
			})

			// Very long strings
			tests.push({
				name: `handles very long string for ${param.name}`,
				description: `Test with extremely long string`,
				type: "edge",
				code: `
it("handles very long string for ${param.name}", () => {
	const longString = "a".repeat(10000)
	const result = ${signature.name}(longString)
	assertExists(result)
})`
			})

			// Special characters
			tests.push({
				name: `handles special characters for ${param.name}`,
				description: `Test with special characters`,
				type: "edge",
				code: `
it("handles special characters for ${param.name}", () => {
	const specialChars = ["\\0", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r"]
	for (const char of specialChars) {
		const result = ${signature.name}(char)
		assertExists(result)
	}
})`
			})
		}
	}

	return tests
}

/**
 * Generate edge cases based on function name patterns
 */
function generateNameBasedEdgeCases(signature: FunctionSignature): Array<TestCase> {
	const tests: Array<TestCase> = []
	const name = signature.name.toLowerCase()

	// Division functions
	if (name.includes("divide") || name.includes("div")) {
		tests.push({
			name: "handles division by zero",
			description: "Test division by zero behavior",
			type: "edge",
			code: `
it("handles division by zero", () => {
	const result = ${signature.name}(1)(0)
	// Check for Infinity or error handling
	assert(result === Infinity || isNaN(result))
})`
		})
	}

	// Square root or nth root functions
	if (name.includes("sqrt") || name.includes("root")) {
		tests.push({
			name: "handles negative input for root",
			description: "Test root of negative number",
			type: "edge",
			code: `
it("handles negative input for root", () => {
	const result = ${signature.name}(-1)
	assert(isNaN(result) || result.toString().includes("i"))
})`
		})
	}

	// Parsing functions
	if (name.includes("parse")) {
		tests.push({
			name: "handles invalid input for parsing",
			description: "Test parsing invalid data",
			type: "edge",
			code: `
it("handles invalid input for parsing", () => {
	const invalids = ["", "not-a-number", "null", "undefined", "{invalid json}"]
	for (const invalid of invalids) {
		try {
			const result = ${signature.name}(invalid)
			// Should either throw or return error value
		} catch (e) {
			// Expected for invalid input
			assert(e instanceof Error)
		}
	}
})`
		})
	}

	// Index-based functions
	if (name.includes("index") || name === "at" || name === "nth") {
		tests.push({
			name: "handles out of bounds index",
			description: "Test with negative and too large indices",
			type: "edge",
			code: `
it("handles out of bounds index", () => {
	const arr = [1, 2, 3]
	const indices = [-1, -100, 3, 100, Infinity, -Infinity]
	for (const idx of indices) {
		const result = ${signature.name}(idx)(arr)
		// Should handle gracefully (undefined, error, or wrapped index)
		assertExists(result !== null) // Exists or is explicitly null/undefined
	}
})`
		})
	}

	// Range functions
	if (name.includes("range") || name.includes("between")) {
		tests.push({
			name: "handles inverted range",
			description: "Test when min > max",
			type: "edge",
			code: `
it("handles inverted range", () => {
	const result = ${signature.name}(10)(5)
	// Should either swap, return empty, or handle gracefully
	assertExists(result)
})`
		})
	}

	return tests
}

/**
 * Generate a comprehensive edge case test suite
 */
export function generateEdgeCaseSuite(signature: FunctionSignature): string {
	const tests = generateEdgeCaseTests(signature)
	
	return `
describe("${signature.name} - Edge Cases", () => {
${tests.map(test => test.code).join("\n\n")}
})`
}

/**
 * Get critical edge cases that must be tested
 */
export function getCriticalEdgeCases(signature: FunctionSignature): Array<string> {
	const critical: Array<string> = []

	// Always test null/undefined for optional params
	for (const param of signature.parameters) {
		if (param.optional) {
			critical.push(`${param.name} = undefined`)
			critical.push(`${param.name} = null`)
		}
	}

	// Always test empty collections
	for (const param of signature.parameters) {
		if (param.type.includes("Array")) {
			critical.push(`${param.name} = []`)
		}
		if (param.type === "string") {
			critical.push(`${param.name} = ""`)
		}
		if (param.type.includes("object")) {
			critical.push(`${param.name} = {}`)
		}
	}

	// Always test special numbers
	for (const param of signature.parameters) {
		if (param.type === "number") {
			critical.push(`${param.name} = 0`)
			critical.push(`${param.name} = NaN`)
		}
	}

	return critical
}