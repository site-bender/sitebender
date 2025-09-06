/**
 * Generate tests for compose pattern functions
 */

import type { FunctionSignature, TestCase } from "../../../types/index.ts"

/**
 * Generate test cases for compose pattern (right-to-left composition)
 * @param _signature Function signature (reserved for future use)
 * @returns Array of compose-specific test cases
 */
export default function generateComposePatternTests(
	_signature: FunctionSignature
): Array<TestCase> {
	const tests: Array<TestCase> = []
	
	// Test right-to-left composition
	tests.push({
		name: "compose applies functions right-to-left",
		description: "Last function is applied first",
		input: [
			[(x: number) => x + 1, (x: number) => x * 2],
			5
		],
		expectedOutput: 11, // (5 * 2) + 1
	})
	
	// Test associativity
	tests.push({
		name: "compose is associative",
		description: "compose(f, compose(g, h)) === compose(compose(f, g), h)",
		input: [
			[(x: number) => x + 1, (x: number) => x * 2, (x: number) => x - 3],
			10
		],
		expectedOutput: 15, // ((10 - 3) * 2) + 1
	})
	
	// Test single function
	tests.push({
		name: "compose with single function",
		description: "Single function compose acts as identity",
		input: [[(x: number) => x * 3], 7],
		expectedOutput: 21,
	})
	
	// Test empty compose
	tests.push({
		name: "empty compose returns identity",
		description: "Compose with no functions returns input",
		input: [[], "test"],
		expectedOutput: "test",
	})
	
	return tests
}