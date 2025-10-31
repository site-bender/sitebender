import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "@sitebender/toolsmith/predicates/isFunction/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Private Helper Delegating to Native Method
 +
 + This example demonstrates:
 + - Private helper (underscore prefix)
 + - Delegating to native .map() method
 + - Using Toolsmith predicates for validation
 + - Exception documentation for native method
 + - Defensive fallback behavior
 +
 + PATTERN: Private helpers can delegate to native methods with documentation
 + NAMING: Underscore prefix indicates private/internal use only
 + VALIDATION: Use Toolsmith predicates even in helpers
 +
 + Private helper that maps over a plain array, or returns array unchanged if inputs are invalid
 */
export default function _mapArray<T, U>(f: (arg: T, index?: number) => U) {
	/*++
	 + CURRYING: Even private helpers follow currying pattern
	 + This allows partial application and consistent API
	 */
	return function _mapArrayWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> {
		/*++
		 + VALIDATION: Use Toolsmith predicates for combining checks
		 +
		 + We use and() even though internally it uses &&, because:
		 + - Consistent with our semantic API
		 + - Already implemented and tested
		 + - Provides clear intent
		 + - No performance penalty (inlined by JIT)
		 +
		 + We use isFunction() and isArray() because:
		 + - These are our type guards
		 + - They provide TypeScript type narrowing
		 + - Defensive programming (protects against runtime errors)
		 */

		// Happy path: array is valid, map it
		if (and(isFunction(f))(isArray(array))) {
			/*++
			 + [EXCEPTION] Using native .map() for internal helper
			 +
			 + WHY: This is a private helper implementing the public map() API.
			 + Native .map() is highly optimized by JavaScript engines.
			 +
			 + EXTERNAL CODE: Uses our map() function, not .map directly
			 + CONSUMING CODE: import map from "@sitebender/toolsmith/array/map"
			 +
			 + PERFORMANCE: Native .map() is JIT-compiled and optimized
			 + - Faster than manual loop
			 + - Faster than recursive implementation
			 + - No function call overhead
			 +
			 + DELEGATION PATTERN:
			 + - Public function (map) handles monadic behavior
			 + - Private helper (_mapArray) delegates to native method
			 + - Clean separation of concerns
			 + - Easy to test and maintain
			 +
			 + NOTE: We accept uncurried callback for .map() to avoid curry/uncurry overhead
			 */
			return array.map(f)
		}

		/*++
		 + DEFENSIVE FALLBACK: Return array unchanged if validation fails
		 +
		 + This should never happen if types are correct, but provides safety.
		 + In production, invalid inputs would be caught by public function's
		 + monadic error handling before reaching this helper.
		 +
		 + NOTE: Type assertion needed because we can't actually map if f or array is invalid
		 */
		return array as unknown as ReadonlyArray<U>
	}
}

//++ Example usage (internal only, not exposed to consumers):
//++
//++ const double = (x: number) => x * 2
//++ const mapper = _mapArray(double)
//++ const result = mapper([1, 2, 3])
//++ // Result: [2, 4, 6]
//++
//++ // Invalid inputs are handled defensively:
//++ const invalidMapper = _mapArray(null as any)
//++ const safeResult = invalidMapper([1, 2, 3])
//++ // Result: [1, 2, 3] (unchanged)
