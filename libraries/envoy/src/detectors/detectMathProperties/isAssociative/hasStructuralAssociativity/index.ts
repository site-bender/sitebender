import {
	ASSOCIATIVE_OPERATIONS,
	STRUCTURAL_PATTERNS,
} from "../constants/index.ts"
import hasAnyPattern from "../hasAnyPattern/index.ts"

//++ Checks for structural patterns (monoid, semigroup) with binary operations
export default function hasStructuralAssociativity(source: string): boolean {
	const hasStructuralPattern = hasAnyPattern(STRUCTURAL_PATTERNS)(source)

	if (!hasStructuralPattern) {
		return false
	}

	return hasAnyPattern(ASSOCIATIVE_OPERATIONS)(source)
}
