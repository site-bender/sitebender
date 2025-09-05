/**
 * Generate toolkit-specific test patterns based on function characteristics
 */

import type { FunctionSignature, TestCase } from "../../types/index.ts"
import generatePipePatternTests from "./generate-pipe-pattern-tests/index.ts"
import generateComposePatternTests from "./generate-compose-pattern-tests/index.ts"
import generateCurriedPatternTests from "./generate-curried-pattern-tests/index.ts"
import generatePredicatePatternTests from "./generate-predicate-pattern-tests/index.ts"
import generateTransformerPatternTests from "./generate-transformer-pattern-tests/index.ts"
import generateCombinatorPatternTests from "./generate-combinator-pattern-tests/index.ts"
import generateMonadPatternTests from "./generate-monad-pattern-tests/index.ts"
import detectPatternType from "./detect-pattern-type/index.ts"

/**
 * Generate test cases based on toolkit-specific patterns
 * @param signature Function signature
 * @returns Array of pattern-based test cases
 */
export default function generateToolkitPatternTests(
	signature: FunctionSignature
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