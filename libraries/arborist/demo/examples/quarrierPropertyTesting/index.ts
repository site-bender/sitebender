//++ Example: How Quarrier uses Arborist for property testing
//++ Shows intelligent data generation from semantic analysis

import parseFileWithSemantics from "../../../src/api/parseFileWithSemantics/index.ts"

//++ Sample function that Quarrier would test
export default function fibonacci(n: number) {
	return function calculateFibonacci() {
		if (n <= 1) return n
		return fibonacci(n - 1)() + fibonacci(n - 2)()
	}
}

//++ Quarrier property testing example
export async function generatePropertyTests(filePath: string) {
	const result = await parseFileWithSemantics(filePath)

	if (result._tag === "Error") {
		return {
			error: `Failed to parse: ${result.error.message}`,
			properties: null,
		}
	}

	const { semanticInfo } = result.value

	// Quarrier would use semantic info to:
	// - Generate constrained random data
	// - Discover mathematical properties
	// - Create shrinking strategies
	// - Find edge cases automatically

	const properties = {
		commutative: "Would detect commutative property",
		associative: "Would detect associative property",
		idempotent: "Would detect idempotent property",
		inverse: "Would detect inverse functions",
		complexity: `O(${
			semanticInfo.complexity.cyclomatic > 1 ? "exponential" : "constant"
		}) complexity detected`,
		dataTypes: "Would generate constrained random data",
		shrinking: "Would create smart test case shrinking",
		edgeCases: "Would identify boundary conditions",
	}

	return {
		error: null,
		properties,
	}
}
