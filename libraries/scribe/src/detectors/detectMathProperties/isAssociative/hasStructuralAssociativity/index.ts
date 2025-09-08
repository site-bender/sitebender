import hasAnyPattern from "../hasAnyPattern/index.ts"
import {
	STRUCTURAL_PATTERNS,
	ASSOCIATIVE_OPERATIONS,
} from "../constants/index.ts"

//++ Checks for structural patterns (monoid, semigroup) with binary operations
export default function hasStructuralAssociativity(source: string): boolean {
	const hasStructuralPattern = hasAnyPattern(STRUCTURAL_PATTERNS)(source)
	
	if (!hasStructuralPattern) {
		return false
	}
	
	return hasAnyPattern(ASSOCIATIVE_OPERATIONS)(source)
}

//?? [EXAMPLE] hasStructuralAssociativity("const identity = 0; return a + b") // true
//?? [EXAMPLE] hasStructuralAssociativity("function append(a, b) { return a * b }") // true
//?? [EXAMPLE] hasStructuralAssociativity("const empty = []") // false (no binary op)