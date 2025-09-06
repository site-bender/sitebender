import type { FunctionSignature, TestCase } from "../../types/index.ts"
import inferEmptyArrayOutput from "./inferEmptyArrayOutput/index.ts"

/**
 * Generates edge case test scenarios
 * @param signature Function signature information
 * @returns Array of edge case test cases
 */
export default function generateEdgeCases(
	signature: FunctionSignature,
): Array<TestCase> {
	const edgeCases: Array<TestCase> = []

	// For curried functions, we need special handling
	const isCurried = signature.returnType?.raw.includes("=>")

	// For curried math functions (add, subtract, etc.)
	if (
		isCurried &&
		(signature.name === "add" || signature.name === "subtract" ||
			signature.name === "multiply" || signature.name === "divide")
	) {
		// Test with valid numbers
		edgeCases.push({
			name: `handles valid numbers`,
			description: `Test ${signature.name} with valid numbers`,
			input: [5, 3],
			expectedOutput: signature.name === "add"
				? 8
				: signature.name === "subtract"
				? 2
				: signature.name === "multiply"
				? 15
				: signature.name === "divide"
				? 1.67
				: undefined,
		})

		// Test with first parameter null/undefined
		edgeCases.push({
			name: `handles first parameter null`,
			description: `Test ${signature.name} with null first parameter`,
			input: [null, 3],
			expectedOutput: NaN,
		})

		// Test with second parameter null/undefined
		edgeCases.push({
			name: `handles second parameter null`,
			description: `Test ${signature.name} with null second parameter`,
			input: [5, null],
			expectedOutput: NaN,
		})

		// Test with first parameter undefined
		edgeCases.push({
			name: `handles first parameter undefined`,
			description:
				`Test ${signature.name} with undefined first parameter`,
			input: [undefined, 3],
			expectedOutput: NaN,
		})

		// Test with second parameter undefined
		edgeCases.push({
			name: `handles second parameter undefined`,
			description:
				`Test ${signature.name} with undefined second parameter`,
			input: [5, undefined],
			expectedOutput: NaN,
		})

		return edgeCases
	} // For curried functions like map, generate proper edge cases
	else if (
		isCurried && (signature.name === "map" || signature.name === "filter")
	) {
		// Test with identity function and empty array
		edgeCases.push({
			name: `handles empty array`,
			description: `Test ${signature.name} with empty array`,
			input: [(x: unknown) => x, []],
			expectedOutput: [],
		})

		// Test with identity function and single element array
		edgeCases.push({
			name: `handles single element array`,
			description: `Test ${signature.name} with single element array`,
			input: [(x: unknown) => x, [1]],
			expectedOutput: [1],
		})

		// Test with null array
		edgeCases.push({
			name: `handles null array`,
			description: `Test ${signature.name} with null array`,
			input: [(x: unknown) => x, null],
			expectedOutput: [],
		})

		// Test with undefined array
		edgeCases.push({
			name: `handles undefined array`,
			description: `Test ${signature.name} with undefined array`,
			input: [(x: unknown) => x, undefined],
			expectedOutput: [],
		})

		return edgeCases
	}

	// Special handling for object utility functions
	if (
		signature.name === "keys" || signature.name === "values" ||
		signature.name === "entries"
	) {
		// Test with regular object
		edgeCases.push({
			name: `handles regular object`,
			description: `Test ${signature.name} with regular object`,
			input: [{ a: 1, b: 2 }],
			expectedOutput: signature.name === "keys"
				? ["a", "b"]
				: signature.name === "values"
				? [1, 2]
				: [["a", 1], ["b", 2]],
		})

		// Test with empty object
		edgeCases.push({
			name: `handles empty object`,
			description: `Test ${signature.name} with empty object`,
			input: [{}],
			expectedOutput: [],
		})

		// Test with string (special case for keys)
		if (signature.name === "keys") {
			edgeCases.push({
				name: `handles string input`,
				description: `Test ${signature.name} with string input`,
				input: ["abc"],
				expectedOutput: ["0", "1", "2"],
			})
		}

		// Test with number (non-object primitive)
		edgeCases.push({
			name: `handles number input`,
			description: `Test ${signature.name} with number input`,
			input: [42],
			expectedOutput: [],
		})

		return edgeCases
	}

	for (const param of signature.parameters) {
		const paramName = param.name
		const paramType = param.type.raw

		if (paramType.includes("Array") || paramType.includes("[]")) {
			edgeCases.push({
				name: `handles empty array for ${paramName}`,
				description: `Test with empty array input for ${paramName}`,
				input: [[]],
				expectedOutput: inferEmptyArrayOutput(signature),
			})

			edgeCases.push({
				name: `handles single element array for ${paramName}`,
				description: `Test with single element array for ${paramName}`,
				input: [[1]],
			})
		}

		if (paramType === "number") {
			edgeCases.push({
				name: `handles zero for ${paramName}`,
				description: `Test with zero value for ${paramName}`,
				input: [0],
			})

			edgeCases.push({
				name: `handles negative number for ${paramName}`,
				description: `Test with negative value for ${paramName}`,
				input: [-1],
			})

			edgeCases.push({
				name: `handles large number for ${paramName}`,
				description: `Test with large value for ${paramName}`,
				input: [Number.MAX_SAFE_INTEGER],
			})
		}

		if (paramType === "string") {
			edgeCases.push({
				name: `handles empty string for ${paramName}`,
				description: `Test with empty string for ${paramName}`,
				input: [""],
			})

			edgeCases.push({
				name: `handles unicode string for ${paramName}`,
				description: `Test with unicode characters for ${paramName}`,
				input: ["🚀 Unicode 文字"],
				expectedOutput: signature.returnType.raw === "string"
					? "🚀 Unicode 文字"
					: undefined,
			})
		}

		if (param.optional || paramType.includes("undefined")) {
			const expectedOutput =
				(signature.name === "keys" || signature.name === "values" ||
						signature.name === "entries")
					? []
					: signature.returnType.raw === "string"
					? ""
					: signature.returnType.raw.includes("number")
					? NaN
					: undefined

			edgeCases.push({
				name: `handles undefined for ${paramName}`,
				description: `Test with undefined value for ${paramName}`,
				input: [undefined],
				expectedOutput,
			})
		}

		if (paramType.includes("null")) {
			const expectedOutput =
				(signature.name === "keys" || signature.name === "values" ||
						signature.name === "entries")
					? []
					: signature.returnType.raw === "string"
					? ""
					: signature.returnType.raw.includes("number")
					? NaN
					: undefined

			edgeCases.push({
				name: `handles null for ${paramName}`,
				description: `Test with null value for ${paramName}`,
				input: [null],
				expectedOutput,
			})
		}
	}

	return edgeCases
}
