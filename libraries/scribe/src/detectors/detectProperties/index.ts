import type { Properties } from "../../types/index.ts"
import detectPurity from "../detectPurity/index.ts"
import detectCurrying from "../detectCurrying/index.ts"
import detectComplexity from "../detectComplexity/index.ts"
import { isIdempotent, isCommutative, isAssociative, isDistributive } from "../detectMathProperties/index.ts"

/**
 * Detects all properties from source code
 */
export default function detectProperties(source: string): Properties {
	const isPure = detectPurity(source)
	const currying = detectCurrying(source)
	const complexity = detectComplexity(source)
	
	return {
		isPure,
		isCurried: currying.isCurried,
		curryLevels: currying.isCurried ? currying.levels : undefined,
		isIdempotent: isIdempotent(source),
		isCommutative: isCommutative(source),
		isAssociative: isAssociative(source),
		isDistributive: isDistributive(source),
		complexity,
		nullHandling: "unknown", // TODO(@scribe): Implement in Phase 2
		deterministic: isPure, // Pure functions are deterministic
	}
}