import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { Validation, ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"
import chainResults from "@sitebender/toolsmith/monads/result/chain/index.ts"
import chainValidations from "@sitebender/toolsmith/monads/validation/chain/index.ts"
import _mapArray from "./_mapArray/index.ts"
import _mapToResult from "./_mapToResult/index.ts"
import _mapToValidation from "./_mapToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

/*++
 + TOOLSMITH EXAMPLE: Binary Curried Function with Monadic Overloads
 +
 + This example demonstrates:
 + - Binary currying (function returns function)
 + - Monadic behavior (handles plain/Result/Validation)
 + - Overloaded signatures for type safety
 + - Type guards for dispatching to appropriate helpers
 + - Fallthrough behavior for error states
 +
 + PATTERN: Functions can handle 3 input types and return appropriate output
 + CURRYING: map(fn)(array) allows partial application
 + MONADIC: Automatically adapts to input type (plain/Result/Validation)
 +
 + Transforms each array element using a function
 + Supports plain arrays, Result monad, and Validation monad
 */
export default function map<T, U>(f: (arg: T, index?: number) => U) {
	/*++
	 + CURRYING LEVEL 1: Capture mapping function in closure
	 +
	 + NOTE: We accept uncurried callback (arg, index?) => U because:
	 + - Native .map() expects uncurried callback
	 + - Avoids curry/uncurry overhead when delegating to .map()
	 + - This is an EXCEPTION to normal currying rules
	 + - Only applies to callbacks passed to native methods
	 +
	 + The outer function captures f and returns the main implementation
	 */

	/*++
	 + MONADIC OVERLOADS: Type-safe signatures for each input/output combination
	 +
	 + TypeScript will select the correct overload based on the input type.
	 + This enables type-safe monadic behavior without runtime overhead.
	 */

	//++ [OVERLOAD 1] Plain array → Plain array
	//++ Takes ReadonlyArray<T>, returns ReadonlyArray<U>
	//++ Direct transformation, no error handling
	function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD 2] Result monad → Result monad (fail-fast)
	//++ Takes Result<ValidationError, ReadonlyArray<T>>
	//++ Returns Result<ValidationError, ReadonlyArray<U>>
	//++ Errors propagate immediately (first error stops processing)
	function mapWithFunction(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<U>>

	//++ [OVERLOAD 3] Validation monad → Validation monad (error accumulation)
	//++ Takes Validation<ValidationError, ReadonlyArray<T>>
	//++ Returns Validation<ValidationError, ReadonlyArray<U>>
	//++ Errors accumulate (collect all errors before failing)
	function mapWithFunction(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<U>>

	/*++
	 + IMPLEMENTATION: Handles all overload cases with type guards
	 +
	 + The implementation signature is the union of all overload inputs/outputs.
	 + We use type guards to narrow and dispatch to appropriate helper.
	 */
	function mapWithFunction(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<U>
		| Result<ValidationError, ReadonlyArray<U>>
		| Validation<ValidationError, ReadonlyArray<U>> {
		/*++
		 + TYPE NARROWING: Use Toolsmith predicates to determine input type
		 +
		 + IMPORTANT: We use Toolsmith predicates even internally because:
		 + - They provide TypeScript type narrowing
		 + - They're already optimized
		 + - Consistent with our own API
		 + - No need to duplicate type checking logic
		 */

		// PATH 1: Happy path - plain array
		if (isArray<T>(array)) {
			// TypeScript now knows: array is ReadonlyArray<T>
			return _mapArray(f)(array)
		}

		// PATH 2: Result path - fail-fast monadic mapping
		if (isOk<ReadonlyArray<T>>(array)) {
			// TypeScript now knows: array is Ok<ReadonlyArray<T>>
			// Use chainResults to handle monadic transformation
			return chainResults(_mapToResult(f))(array)
		}

		// PATH 3: Validation path - error accumulation monadic mapping
		if (isSuccess<ReadonlyArray<T>>(array)) {
			// TypeScript now knows: array is Success<ReadonlyArray<T>>
			// Use chainValidations to handle error accumulation
			return chainValidations(_mapToValidation(f))(array)
		}

		/*++
		 + FALLBACK: Pass through unchanged (handles error/failure states)
		 +
		 + IMPORTANT: This is not an error - it's intentional behavior.
		 + If input is Error or Failure, we pass it through unchanged.
		 + This enables monadic composition:
		 +
		 + const result = pipe(
		 +   validate,      // Returns Error on invalid input
		 +   map(transform) // Error passes through unchanged
		 +   map(format)    // Error still passes through
		 + )
		 +
		 + Without fallthrough, errors would be lost or need special handling.
		 */
		return array
	}

	return mapWithFunction
}

//++ Example usage:
//++
//++ // Plain array:
//++ const double = (x: number) => x * 2
//++ const doubled = map(double)([1, 2, 3])
//++ // Result: [2, 4, 6]
//++
//++ // Result monad:
//++ const result: Result<ValidationError, ReadonlyArray<number>> = ok([1, 2, 3])
//++ const doubledResult = map(double)(result)
//++ // Result: Ok([2, 4, 6])
//++
//++ // Validation monad:
//++ const validation: Validation<ValidationError, ReadonlyArray<number>> = success([1, 2, 3])
//++ const doubledValidation = map(double)(validation)
//++ // Result: Success([2, 4, 6])
//++
//++ // Error passes through:
//++ const errorResult: Result<ValidationError, ReadonlyArray<number>> = error(someError)
//++ const stillError = map(double)(errorResult)
//++ // Result: Error(someError) - unchanged
