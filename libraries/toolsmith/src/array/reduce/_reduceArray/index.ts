import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that reduces a plain array
export default function _reduceArray<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceArrayWithFunction(initial: U) {
		return function _reduceArrayWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): U {
			// Happy path: valid function and array, reduce it
			if (and(isFunction(fn))(isArray<T>(array))) {
				/*++
				 + [EXCEPTION] .reduce is permitted here for performance reasons
				 + This is the ONLY place .reduce should be used
				 + Everywhere else, use the `reduce` function instead
				 */
				return array.reduce(fn, initial)
			}

			// Fallback: return initial value unchanged
			return initial
		}
	}
}
