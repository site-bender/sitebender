//++ Example: How Auditor uses Arborist for test generation
//++ Shows type-aware test data generation

import parseFileWithSemantics from "../../../src/api/parseFileWithSemantics/index.ts"

//++ Sample function that Auditor would generate tests for
export default function validateEmail(email: string) {
	return function validateEmailFormat() {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}
}

//++ Auditor test generation example
export async function generateTests(filePath: string) {
	const result = await parseFileWithSemantics(filePath)

	if (result._tag === "Error") {
		return {
			error: `Failed to parse: ${result.error.message}`,
			tests: null,
		}
	}

	const { semanticInfo } = result.value

	// Auditor would use semantic info to generate:
	// - Property-based tests
	// - Type-aware test data
	// - Edge case identification
	// - Mock data generation

	const tests = {
		propertyTests: "Would generate property-based tests from types",
		edgeCases: "Would identify boundary conditions",
		mockData: "Would create type-safe mock objects",
		invariants: "Would check mathematical properties",
		coverage: `Would aim for ${
			semanticInfo.complexity.cyclomatic > 5 ? "high" : "standard"
		} coverage`,
	}

	return {
		error: null,
		tests,
	}
}
