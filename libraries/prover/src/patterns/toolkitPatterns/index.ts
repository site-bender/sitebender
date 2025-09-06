/**
 * Generate toolkit-specific test patterns based on function characteristics
 */

import type { FunctionSignature, TestCase } from "../../types/index.ts"
import generatePipePatternTests from "./generatePipePatternTests/index.ts"
import generateComposePatternTests from "./generateComposePatternTests/index.ts"
import generateCurriedPatternTests from "./generateCurriedPatternTests/index.ts"
import generatePredicatePatternTests from "./generatePredicatePatternTests/index.ts"
import generateTransformerPatternTests from "./generateTransformerPatternTests/index.ts"
import generateCombinatorPatternTests from "./generateCombinatorPatternTests/index.ts"
import generateMonadPatternTests from "./generateMonadPatternTests/index.ts"
import detectPatternType from "./detectPatternType/index.ts"

/**
 * Generate test cases based on toolkit-specific patterns
 * @param signature Function signature
 * @returns Array of pattern-based test cases
 */
export default function generateToolkitPatternTests(
	signature: FunctionSignature,
): Array<TestCase> {
	const patterns = detectPatternType(signature)
	const tests: Array<TestCase> = []

	for (const pattern of patterns) {
		switch (pattern) {
			case "pipe":
				tests.push(...generatePipePatternTests(signature))
				break
			case "compose":
				tests.push(...generateComposePatternTests(signature))
				break
			case "curried":
				tests.push(...generateCurriedPatternTests(signature))
				break
			case "predicate":
				tests.push(...generatePredicatePatternTests(signature))
				break
			case "transformer":
				tests.push(...generateTransformerPatternTests(signature))
				break
			case "combinator":
				tests.push(...generateCombinatorPatternTests(signature))
				break
			case "monad":
				tests.push(...generateMonadPatternTests(signature))
				break
		}
	}

	return tests
}
