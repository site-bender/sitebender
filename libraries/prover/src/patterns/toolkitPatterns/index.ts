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
	signature: FunctionSignature
): Array<TestCase> {
	const patterns = detectPatternType(signature)
	
	return patterns.flatMap(pattern => {
		switch (pattern) {
			case "pipe":
				return generatePipePatternTests(signature)
			case "compose":
				return generateComposePatternTests(signature)
			case "curried":
				return generateCurriedPatternTests(signature)
			case "predicate":
				return generatePredicatePatternTests(signature)
			case "transformer":
				return generateTransformerPatternTests(signature)
			case "combinator":
				return generateCombinatorPatternTests(signature)
			case "monad":
				return generateMonadPatternTests(signature)
			default:
				return []
		}
	})
}