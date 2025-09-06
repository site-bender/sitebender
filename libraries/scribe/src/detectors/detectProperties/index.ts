import type { Properties } from "../../types/index.ts"
import detectPurity from "../detectPurity/index.ts"
import detectCurrying from "../detectCurrying/index.ts"
import detectComplexity from "../detectComplexity/index.ts"

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
		isIdempotent: false, // TODO(@scribe): Implement in Phase 2
		isCommutative: false, // TODO(@scribe): Implement in Phase 2
		isAssociative: false, // TODO(@scribe): Implement in Phase 2
		isDistributive: false, // TODO(@scribe): Implement in Phase 2
		complexity,
		nullHandling: "unknown", // TODO(@scribe): Implement in Phase 2
		deterministic: isPure, // Pure functions are deterministic
	}
}