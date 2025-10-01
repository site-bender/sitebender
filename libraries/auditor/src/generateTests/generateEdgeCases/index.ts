import type { FunctionSignature, TestCase } from "../../types/index.ts"

import generateEdgeCaseInputs from "../generateEdgeCaseInputs/index.ts"
import generateTestInput from "../generateTestInputs/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateEdgeCases(
	signature: FunctionSignature,
): Array<TestCase> {
	// Generate edge cases for each parameter
	const parameterEdgeCases = signature.parameters.flatMap((param, index) => {
		const edgeInputs = generateEdgeCaseInputs(param.type)

		const edgeTestCases = edgeInputs.map((edgeInput) => {
			// Build the full input array functionally
			const input = signature.parameters.map((p, i) =>
				i === index ? edgeInput : generateTestInput(p.type)
			)

			// Generate descriptive name
			const inputDesc = describeInput(edgeInput, param.type.raw)

			return {
				name: `handles ${inputDesc} for ${param.name}`,
				description: `Test with ${inputDesc} value for parameter ${param.name}`,
				input,
				// Don't assume expected output - let the test discover it
				// This avoids the problem of guessing wrong outputs
			}
		})

		// Handle optional parameters
		const optionalCases = param.optional
			? [{
				name: `handles missing optional ${param.name}`,
				description: `Test with optional parameter ${param.name} omitted`,
				input: signature.parameters.slice(0, index).map((p) =>
					generateTestInput(p.type)
				),
			}]
			: []

		return [...edgeTestCases, ...optionalCases]
	})

	// Add test for no parameters (if applicable)
	const noParamCase = signature.parameters.length === 0
		? [{
			name: "handles no parameters",
			description: "Test function with no parameters",
			input: [],
		}]
		: []

	// For functions returning Result type, test both success and failure cases
	// This is handled by the edge cases for parameters
	// The function will naturally return success or error based on inputs

	return [...parameterEdgeCases, ...noParamCase]
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function describeInput(value: unknown, _typeHint: string): string {
	if (value === null) return "null"
	if (value === undefined) return "undefined"
	if (value === "") return "empty string"
	if (value === 0) return "zero"
	if (Object.is(value, -0)) return "negative zero"
	if (Number.isNaN(value)) return "NaN"
	if (value === Infinity) return "Infinity"
	if (value === -Infinity) return "negative Infinity"
	if (Array.isArray(value)) {
		if (value.length === 0) return "empty array"
		if (value.length === 1) return "single element array"
		if (value.length > 100) return "large array"
		return "array"
	}
	if (typeof value === "string") {
		if (value.includes("🎯")) return "unicode string"
		if (value.length > 100) return "long string"
		if (value === " ") return "whitespace"
		return "string"
	}
	if (typeof value === "object" && value !== null) {
		const obj = value as Record<string, unknown>
		if ("ok" in obj) {
			return obj.ok ? "successful Result" : "error Result"
		}
		if (Object.keys(obj).length === 0) return "empty object"
		return "object"
	}
	if (typeof value === "number") {
		if (value > Number.MAX_SAFE_INTEGER) return "MAX_SAFE_INTEGER"
		if (value < Number.MIN_SAFE_INTEGER) return "MIN_SAFE_INTEGER"
		return "number"
	}

	return String(typeof value)
}
