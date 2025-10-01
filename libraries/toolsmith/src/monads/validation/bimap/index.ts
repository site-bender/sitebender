import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import map from "../../../vanilla/array/map/index.ts"
import failure from "../failure/index.ts"
import success from "../success/index.ts"

//++ Maps functions over both Invalid and Valid values
export default function bimap<E, F>(onInvalid: (error: E) => F) {
	return function withValid<A, B>(onValid: (value: A) => B) {
		return function applyBimap(
			validation: Validation<E, A>,
		): Validation<F, B> {
			if (validation._tag === "Failure") {
				// NonEmptyArray is guaranteed since Invalid always has at least one error
				const [firstError, ...restErrors] = validation.errors
				const transformedFirst = onInvalid(firstError)
				const transformedRest = map(onInvalid)(restErrors)

				return failure(
					[transformedFirst, ...transformedRest] as NonEmptyArray<F>,
				)
			}

			return success(onValid(validation.value))
		}
	}
}

//?? [EXAMPLE] bimap(e => e.toUpperCase())(n => n * 2)(valid(21)) // valid(42)
//?? [EXAMPLE] bimap(e => e.toUpperCase())(n => n * 2)(invalid(["error"])) // invalid(["ERROR"])

//?? [EXAMPLE] bimap(e => ({code: e}))(n => n.toString())(valid(100)) // valid("100")
//?? [EXAMPLE] bimap(e => ({code: e}))(n => n.toString())(invalid(["fail"])) // invalid([{code: "fail"}])

/*??
 | [EXAMPLE]
 | const validation = invalid([{field: "age", messages: ["too young"]}])
 | const addTimestamp = (err) => ({...err, timestamp: Date.now()})
 | const doubled = (n) => n * 2
 |
 | const result = bimap(addTimestamp)(doubled)(validation)
 | // invalid([{field: "age", messages: ["too young"], timestamp: 1234567890}])
 |
 | const validCase = valid(21)
 | const result2 = bimap(addTimestamp)(doubled)(validCase)
 | // valid(42)
 |
 | // Chaining transformations
 | const errorToString = (err) => JSON.stringify(err)
 | const numberToHex = (n) => n.toString(16)
 | const transformed = bimap(errorToString)(numberToHex)(valid(255))
 | // valid("ff")
 |
 | [PRO] Transforms both success and failure cases in one operation
 | [PRO] Maintains the validation structure while transforming contents
 | [PRO] Type-safe transformation of heterogeneous types
 | [PRO] Follows bifunctor laws for principled error handling
 |
 | [GOTCHA] Error transformation applies to ALL errors in the array
 | [GOTCHA] Order matters - error function first, then value function
 | [GOTCHA] Both functions must be provided, use identity function if no change needed
 */
