import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import mapVanilla from "../../../vanilla/array/map/index.ts"
import length from "../../../vanilla/array/length/index.ts"
import sequenceResult from "../sequenceResult/index.ts"
import sequenceValidation from "../sequenceValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Lifts a monadic function over an array; use Result to fail fast, Validation to accumulate errors
function map<T, U, E>(fn: (value: T) => Result<U, E> | Validation<E, U>) {
	return function mapWithFn(
		array: Array<T>,
	): Result<Array<U>, E> | Validation<E, Array<U>> {
		// Handle empty array case by returning ok which works for both monads
		if (length(array) === 0) {
			// Return ok([]) - works for Result cases
			return ok([]) as Result<Array<U>, E>
		}

		// Apply function to each element
		const results = mapVanilla(fn)(array)

		// Check first result to determine monad type
		const firstResult = results[0]

		if (
			"_tag" in firstResult &&
			(firstResult._tag === "Left" || firstResult._tag === "Right")
		) {
			// It's a Result (Either) - use fail-fast sequencing
			return sequenceResult(results as Array<Result<U, E>>)
		} else {
			// It's a Validation - use error accumulation sequencing
			return sequenceValidation(results as Array<Validation<E, U>>)
		}
	}
}

export default map

//?? [EXAMPLE] map(x => ok(x * 2))([1, 2, 3]) // ok([2, 4, 6])
//?? [EXAMPLE] map(x => x > 0 ? ok(x) : left("negative"))([1, -1, 2]) // left("negative")
//?? [EXAMPLE] map(x => valid(x * 2))([1, 2, 3]) // valid([2, 4, 6])
/*??
 | [EXAMPLE] Complex validation with error accumulation
 | map(x => x > 0 ? valid(x) : invalid(["negative"]))([1, -1, -2])
 | // invalid(["negative", "negative"])
 |
 | [GOTCHA] Empty array type detection limitation - returns Result by default
 | [PRO] Automatic monad type detection at runtime
 | [PRO] Preserves fail-fast vs error accumulation semantics
 */
