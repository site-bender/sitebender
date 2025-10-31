import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Ternary Curried Private Helper
 +
 + This example demonstrates:
 + - Ternary currying in private helper
 + - Delegating to native .reduce() method
 + - Three levels of function nesting
 + - Exception documentation for .reduce
 +
 + PATTERN: Even private helpers follow full currying pattern
 + DELEGATION: Wraps native .reduce() with validation
 + TERNARY: Three parameters = three nested functions
 +
 + Private helper that reduces a plain array using native .reduce()
 */
export default function _reduceArray<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	/*++
	 + CURRYING LEVEL 1: Capture reducer function
	 */
	return function _reduceArrayWithFunction(initial: U) {
		/*++
		 + CURRYING LEVEL 2: Capture initial value
		 +
		 + Now fn and initial are in closure
		 */
		return function _reduceArrayWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): U {
			/*++
			 + CURRYING LEVEL 3: Take array and perform reduction
			 +
			 + All three parameters available: fn, initial, array
			 */

			// Validate inputs using Toolsmith predicates
			if (and(isFunction(fn))(isArray<T>(array))) {
				/*++
				 + [EXCEPTION] Using native .reduce() for performance
				 +
				 + WHY: Native .reduce() is highly optimized by JavaScript engines.
				 + This is the ONLY place .reduce should be used.
				 +
				 + EVERYWHERE ELSE: Use the `reduce` function from Toolsmith
				 + CONSUMING CODE: import reduce from "@sitebender/toolsmith/array/reduce"
				 +
				 + PERFORMANCE: Native .reduce() is JIT-compiled and optimized
				 + - Faster than manual loop (which is also forbidden)
				 + - Faster than recursive implementation
				 + - No function call overhead beyond the reducer itself
				 +
				 + DELEGATION PATTERN:
				 + - Public reduce() handles monadic behavior and currying
				 + - Private _reduceArray() delegates to native method
				 + - Clean separation: public API vs internal implementation
				 +
				 + TERNARY CURRYING COMPLETE:
				 + - Level 1: fn captured
				 + - Level 2: initial captured
				 + - Level 3: array received, reduction performed
				 */
				return array.reduce(fn, initial)
			}

			/*++
			 + DEFENSIVE FALLBACK: Return initial value unchanged
			 +
			 + If validation fails, we can't reduce, so return initial.
			 + This should never happen with correct types, but provides safety.
			 */
			return initial
		}
	}
}

//++ Example usage (internal only):
//++
//++ const sum = (acc: number, n: number) => acc + n
//++
//++ // Full currying:
//++ const reducer = _reduceArray(sum)      // Level 1: function
//++ const withInit = reducer(0)            // Level 2: initial value
//++ const result = withInit([1, 2, 3])     // Level 3: array
//++ // Result: 6
//++
//++ // One-liner:
//++ const total = _reduceArray(sum)(0)([1, 2, 3, 4, 5])
//++ // Result: 15
