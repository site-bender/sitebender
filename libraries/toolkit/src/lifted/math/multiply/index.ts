import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import error from "../../../monads/result/error/index.ts"
import vanillaMultiply from "../../../vanilla/math/multiply/index.ts"
import isArray from "../../../vanilla/validation/isArray/index.ts"

//++ [GROUP] Error Types
type MultiplyError =
	| { tag: "NotFinite"; value: number; position?: string }
	| { tag: "EmptyArray" }
	| { tag: "InvalidInput"; value: unknown }
//++ [END]

export function multiply(
	multiplier: number,
): (multiplicand: number) => Result<MultiplyError, number>
export function multiply(
	factors: Array<number>,
): Result<MultiplyError, number>

//++ Lifted multiply: wraps vanilla multiply with Result monad for explicit error handling
export default function multiply(
	multiplierOrFactors: number | Array<number>,
):
	| Result<MultiplyError, number>
	| ((multiplicand: number) => Result<MultiplyError, number>) {
	// Handle array case
	if (isArray(multiplierOrFactors)) {
		const factors = multiplierOrFactors

		if (factors.length === 0) {
			return error({ tag: "EmptyArray" })
		}

		// Find first non-finite value for specific error
		for (let i = 0; i < factors.length; i++) {
			const factor = factors[i]
			if (!Number.isFinite(factor)) {
				return error({
					tag: "NotFinite",
					value: factor,
					position: `index ${i}`,
				})
			}
		}

		// Delegate to vanilla version - we know it will succeed
		const result = vanillaMultiply(factors) as number | undefined
		return result !== undefined
			? ok(result)
			: error({ tag: "InvalidInput", value: factors })
	}

	// Handle number case - return curried function
	if (typeof multiplierOrFactors === "number") {
		if (!Number.isFinite(multiplierOrFactors)) {
			// Return a function that always fails with the specific error
			return () =>
				error({
					tag: "NotFinite",
					value: multiplierOrFactors,
					position: "multiplier",
				})
		}

		const multiplier = multiplierOrFactors

		return function multiplyByMultiplier(
			multiplicand: number,
		): Result<MultiplyError, number> {
			if (!Number.isFinite(multiplicand)) {
				return error({
					tag: "NotFinite",
					value: multiplicand,
					position: "multiplicand",
				})
			}

			// Delegate to vanilla version
			const curriedVanilla = vanillaMultiply(multiplier) as (
				multiplicand: number,
			) => number | undefined
			const result = curriedVanilla(multiplicand)

			return result !== undefined
				? ok(result)
				: error({ tag: "InvalidInput", value: { multiplier, multiplicand } })
		}
	}

	// Invalid input type
	return error({ tag: "InvalidInput", value: multiplierOrFactors })
}

//?? [EXAMPLE] multiply(2)(3) // { _tag: "Ok", value: 6 }
//?? [EXAMPLE] multiply([2, 3, 4]) // { _tag: "Ok", value: 24 }
//?? [EXAMPLE] multiply(NaN) // Returns function that fails with NotFinite error
//?? [EXAMPLE] multiply(2)(Infinity) // { _tag: "Error", error: { tag: "NotFinite", value: Infinity, position: "multiplicand" } }
//?? [EXAMPLE] multiply([2, NaN, 3]) // { _tag: "Error", error: { tag: "NotFinite", value: NaN, position: "index 1" } }
//?? [EXAMPLE] multiply([]) // { _tag: "Error", error: { tag: "EmptyArray" } }

//?? [PRO] Explicit error handling with detailed error information
//?? [PRO] Maintains curried form like vanilla version
//?? [PRO] Delegates computation to battle-tested vanilla implementation
//?? [PRO] Rich error types enable precise error handling

//?? [GOTCHA] Returns Result type instead of raw values - requires unwrapping
//?? [GOTCHA] Curried form returns function that returns Result, not Result directly
//?? [GOTCHA] Empty arrays now fail instead of returning identity (more strict)

//?? [CON] More verbose than vanilla version for simple cases
//?? [CON] Requires understanding of Result monad
