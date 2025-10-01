import type { Properties } from "../../types/index.ts"

import detectComplexity from "../detectComplexity/index.ts"
import detectCurrying from "../detectCurrying/index.ts"
import {
	isAssociative,
	isCommutative,
	isDistributive,
	isIdempotent,
} from "../detectMathProperties/index.ts"
import detectPurity from "../detectPurity/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
		nullHandling: "unknown", // TODO(@envoy): Implement in Phase 2
		deterministic: isPure, // Pure functions are deterministic
	}
}
