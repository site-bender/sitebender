import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import map from "../../../vanilla/array/map/index.ts"

//++ Maps a function over the errors in an Invalid, preserving Valid state
export default function mapErrors<E, F>(fn: (error: E) => F) {
	return function applyMapErrors<A>(
		validation: Validation<E, A>,
	): Validation<F, A> {
		if (validation._tag === "Failure") {
			// NonEmptyArray is guaranteed since Invalid always has at least one error
			const [firstError, ...restErrors] = validation.errors
			const transformedFirst = fn(firstError)
			const transformedRest = map(fn)(restErrors)

			return {
				_tag: "Failure",
				errors: [transformedFirst, ...transformedRest] as NonEmptyArray<F>,
			}
		}

		return validation
	}
}

//?? [EXAMPLE] mapErrors(e => e.toUpperCase())(invalid(["error"])) // invalid(["ERROR"])
//?? [EXAMPLE] mapErrors(e => e.toUpperCase())(valid(42)) // valid(42)

//?? [EXAMPLE] mapErrors(e => ({...e, timestamp: Date.now()}))(invalid([{field: "age", messages: ["error"]}]))
//?? // invalid([{field: "age", messages: ["error"], timestamp: 1234567890}])

/*??
 | [EXAMPLE]
 | const addTimestamp = (error) => ({
 |   ...error,
 |   timestamp: Date.now(),
 |   severity: "high"
 | })
 |
 | const validation = invalid([{field: "email", messages: ["invalid format"]}])
 | const enhanced = mapErrors(addTimestamp)(validation)
 | // invalid([{field: "email", messages: ["invalid format"], timestamp: 1234567890, severity: "high"}])
 |
 | // Transform error format for API responses
 | const toApiError = (err) => ({
 |   code: `VALIDATION_${err.field.toUpperCase()}`,
 |   message: err.messages.join(", "),
 |   field: err.field
 | })
 |
 | const apiReady = mapErrors(toApiError)(validation)
 | // invalid([{code: "VALIDATION_EMAIL", message: "invalid format", field: "email"}])
 |
 | // Preserves valid values
 | const validCase = valid(100)
 | mapErrors(addTimestamp)(validCase) // valid(100) - unchanged
 |
 | // Translate error messages
 | const translate = (error) => ({
 |   ...error,
 |   messages: error.messages.map(msg =>
 |     msg === "required" ? "campo obrigatório" : msg
 |   )
 | })
 |
 | [PRO] Transform error structure without affecting valid values
 | [PRO] Useful for adding metadata to errors (timestamps, severity, etc.)
 | [PRO] Can adapt error format for different consumers (API, UI, logs)
 | [PRO] All errors in the array are transformed
 |
 | [GOTCHA] Only transforms Invalid errors, Valid passes through unchanged
 | [GOTCHA] Must maintain NonEmptyArray structure for errors
 | [GOTCHA] Use bimap if you need to transform both Valid and Invalid
 */
