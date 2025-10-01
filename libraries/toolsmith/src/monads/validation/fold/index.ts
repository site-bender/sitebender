import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

//++ Folds a validation to a single value by handling both cases
export default function fold<A, B>(onValid: (value: A) => B) {
	return function withInvalid<E>(
		onInvalid: (errors: NonEmptyArray<E>) => B,
	) {
		return function applyFold(
			validation: Validation<E, A>,
		): B {
			if (validation._tag === "Failure") {
				return onInvalid(validation.errors)
			}

			return onValid(validation.value)
		}
	}
}

//?? [EXAMPLE] fold(n => `Valid: ${n}`)(errs => `Errors: ${errs.length}`)(valid(42)) // "Valid: 42"
//?? [EXAMPLE] fold(n => `Valid: ${n}`)(errs => `Errors: ${errs.length}`)(invalid(["e1", "e2"])) // "Errors: 2"

//?? [EXAMPLE] fold(n => n * 2)(errs => 0)(valid(21)) // 42
//?? [EXAMPLE] fold(n => n * 2)(errs => 0)(invalid(["error"])) // 0

/*??
 | [EXAMPLE]
 | const validation = valid(100)
 | const result = fold(
 |   (value) => ({ success: true, data: value })
 | )(
 |   (errors) => ({ success: false, errors: errors })
 | )(validation)
 | // { success: true, data: 100 }
 |
 | const invalidCase = invalid([{field: "age", messages: ["too young"]}])
 | const result2 = fold(
 |   (value) => `User age: ${value}`
 | )(
 |   (errors) => `Validation failed: ${errors.map(e => e.messages.join(", ")).join("; ")}`
 | )(invalidCase)
 | // "Validation failed: too young"
 |
 | // Converting to React components
 | const renderResult = fold(
 |   (data) => <SuccessMessage data={data} />
 | )(
 |   (errors) => <ErrorList errors={errors} />
 | )
 |
 | // Converting to HTTP responses
 | const toResponse = fold(
 |   (data) => ({ status: 200, body: JSON.stringify(data) })
 | )(
 |   (errors) => ({ status: 400, body: JSON.stringify({ errors }) })
 | )
 |
 | [PRO] Eliminates the validation wrapper, extracting the final value
 | [PRO] Forces handling of both success and failure cases
 | [PRO] Useful for converting validations to other types (UI, HTTP, etc.)
 | [PRO] Pattern matches exhaustively on the validation
 |
 | [GOTCHA] Both functions must return the same type B
 | [GOTCHA] Order matters - valid handler first, then invalid handler
 | [GOTCHA] Once folded, the validation context is lost - can't chain further
 */
