import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _findClosest from "../_findClosest/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that finds the closest value and returns a Result
 */
export default function _findClosestToResult(target: number) {
	return function findClosestToResultWithTarget(closestValue: number) {
		return function findClosestToResultWithTargetAndClosest(
			currentValue: number,
		): Result<never, number> {
			const result = _findClosest(target)(closestValue)(currentValue)
			return ok(result)
		}
	}
}
