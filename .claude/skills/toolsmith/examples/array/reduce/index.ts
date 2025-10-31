import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { Validation, ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import _reduceArray from "./_reduceArray/index.ts"
import _reduceToResult from "./_reduceToResult/index.ts"
import _reduceToValidation from "./_reduceToValidation/index.ts"
import chainResults from "@sitebender/toolsmith/monads/result/chain/index.ts"
import chainValidations from "@sitebender/toolsmith/monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Ternary Curried Function with Monadic Overloads
 +
 + This example demonstrates:
 + - Ternary currying (three nested functions)
 + - reduce(fn)(initialValue)(array) pattern
 + - Monadic behavior (handles plain/Result/Validation)
 + - Same overload pattern as map, but with three parameters
 +
 + PATTERN: Ternary curried functions have three levels of nesting
 + CURRYING: reduce(fn)(init)(array) allows partial application at each level
 + MONADIC: Automatically adapts to input type (plain/Result/Validation)
 +
 + Reduces array to a single value using a reducer function
 + Takes: reducer function, initial value, array
 + Returns: accumulated value (or Result/Validation monad)
 */
export default function reduce<T, U>(fn: (accumulator: U, item: T) => U) {
	/*++
	 + CURRYING LEVEL 1: Capture reducer function in closure
	 +
	 + NOTE: Like map(), we accept uncurried reducer because:
	 + - Native .reduce() expects (acc, item) => result
	 + - Avoids curry/uncurry overhead
	 + - Exception to normal currying rules for native method callbacks
	 */
	return function reduceWithFunction(initialValue: U) {
		/*++
		 + CURRYING LEVEL 2: Capture initial value in closure
		 +
		 + Now we have both fn and initialValue in closure.
		 + Return final function that takes array and performs reduction.
		 +
		 + This enables partial application:
		 + const sum = reduce((acc, n) => acc + n)(0)
		 + const total = sum([1, 2, 3]) // 6
		 */

		/*++
		 + MONADIC OVERLOADS: Same pattern as map()
		 +
		 + TypeScript selects correct overload based on input type.
		 + Enables type-safe monadic behavior.
		 */

		//++ [OVERLOAD 1] Plain array → Plain value
		//++ Takes ReadonlyArray<T>, returns U
		//++ Direct reduction, no error handling
		function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>): U

		//++ [OVERLOAD 2] Result monad → Result monad (fail-fast)
		//++ Takes Result<ValidationError, ReadonlyArray<T>>
		//++ Returns Result<ValidationError, U>
		//++ Errors propagate immediately
		function reduceWithFunctionAndInitialValue(
			array: Result<ValidationError, ReadonlyArray<T>>,
		): Result<ValidationError, U>

		//++ [OVERLOAD 3] Validation monad → Validation monad (error accumulation)
		//++ Takes Validation<ValidationError, ReadonlyArray<T>>
		//++ Returns Validation<ValidationError, U>
		//++ Errors accumulate
		function reduceWithFunctionAndInitialValue(
			array: Validation<ValidationError, ReadonlyArray<T>>,
		): Validation<ValidationError, U>

		/*++
		 + IMPLEMENTATION: Handles all overload cases
		 +
		 + Same pattern as map(): use type guards to dispatch
		 */
		function reduceWithFunctionAndInitialValue(
			array:
				| ReadonlyArray<T>
				| Result<ValidationError, ReadonlyArray<T>>
				| Validation<ValidationError, ReadonlyArray<T>>,
		): U | Result<ValidationError, U> | Validation<ValidationError, U> {
			/*++
			 + TYPE NARROWING: Use Toolsmith predicates
			 +
			 + Same pattern as map() - check type and dispatch to helper
			 */

			// PATH 1: Happy path - plain array
			if (isArray<T>(array)) {
				// TypeScript knows: array is ReadonlyArray<T>
				// Pass all three parameters to helper via currying
				return _reduceArray(fn)(initialValue)(array)
			}

			// PATH 2: Result path - fail-fast monadic reduction
			if (isOk<ReadonlyArray<T>>(array)) {
				// TypeScript knows: array is Ok<ReadonlyArray<T>>
				// Chain with helper that has fn and initialValue in closure
				return chainResults(_reduceToResult(fn)(initialValue))(array)
			}

			// PATH 3: Validation path - error accumulation monadic reduction
			if (isSuccess<ReadonlyArray<T>>(array)) {
				// TypeScript knows: array is Success<ReadonlyArray<T>>
				return chainValidations(_reduceToValidation(fn)(initialValue))(array)
			}

			/*++
			 + FALLBACK: Pass through unchanged (handles error/failure states)
			 +
			 + Same as map() - errors pass through for monadic composition
			 */
			return array
		}

		return reduceWithFunctionAndInitialValue
	}
}

//++ Example usage:
//++
//++ // Plain array - sum numbers:
//++ const sum = (acc: number, n: number) => acc + n
//++ const total = reduce(sum)(0)([1, 2, 3, 4, 5])
//++ // Result: 15
//++
//++ // Partial application at each level:
//++ const reduceWithSum = reduce(sum)        // Curried level 1
//++ const sumFromZero = reduceWithSum(0)     // Curried level 2
//++ const result1 = sumFromZero([1, 2, 3])   // Apply to array: 6
//++ const result2 = sumFromZero([10, 20])    // Reuse: 30
//++
//++ // Result monad:
//++ const resultArray: Result<ValidationError, ReadonlyArray<number>> = ok([1, 2, 3])
//++ const resultSum = reduce(sum)(0)(resultArray)
//++ // Result: Ok(6)
//++
//++ // Validation monad:
//++ const validationArray: Validation<ValidationError, ReadonlyArray<number>> = success([1, 2, 3])
//++ const validationSum = reduce(sum)(0)(validationArray)
//++ // Result: Success(6)
//++
//++ // Error passes through:
//++ const errorArray: Result<ValidationError, ReadonlyArray<number>> = error(someError)
//++ const stillError = reduce(sum)(0)(errorArray)
//++ // Result: Error(someError) - unchanged
