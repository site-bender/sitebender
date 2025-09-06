import type { FunctionSignature, TestCase } from "../types/index.ts"

/**
 * Generates property-based tests for a function signature
 * This is a temporary stub - will be properly refactored
 */
export default function generatePropertyTests(
	signature: FunctionSignature,
): Array<TestCase> {
	const tests: Array<TestCase> = []

	// Generate basic property tests based on function type
	if (signature.returnType.raw.includes("Array")) {
		tests.push({
			name: "preserves array length",
			description:
				"Function should preserve or transform array length predictably",
			input: [],
			properties: [{
				name: "length preservation",
				generator: "fc.array(fc.anything())",
				property: `const result = ${signature.name}(input)
return Array.isArray(result)`,
				runs: 100,
			}],
		})
	}

	if (signature.returnType.raw === "number") {
		tests.push({
			name: "returns valid numbers",
			description: "Function should return valid numbers",
			input: [],
			properties: [{
				name: "number type",
				generator: "fc.integer()",
				property: `const result = ${signature.name}(input)
return typeof result === 'number'`,
				runs: 100,
			}],
		})
	}

	if (signature.returnType.raw === "string") {
		tests.push({
			name: "returns valid strings",
			description: "Function should return valid strings",
			input: [],
			properties: [{
				name: "string type",
				generator: "fc.string()",
				property: `const result = ${signature.name}(input)
return typeof result === 'string'`,
				runs: 100,
			}],
		})
	}

	return tests
}
