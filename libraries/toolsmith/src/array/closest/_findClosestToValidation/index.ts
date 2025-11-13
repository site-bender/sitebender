import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _findClosest from "../_findClosest/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that finds the closest value and returns a Validation
 */
export default function _findClosestToValidation(target: number) {
	return function findClosestToValidationWithTarget(closestValue: number) {
		return function findClosestToValidationWithTargetAndClosest(
			currentValue: number,
		): Validation<never, number> {
			const result = _findClosest(target)(closestValue)(currentValue)
			return success(result)
		}
	}
}
