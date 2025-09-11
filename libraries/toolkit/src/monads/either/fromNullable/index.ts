import type { Either } from "../../../types/fp/either/index.ts"

import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Creates an Either from a nullable value, using Left for null/undefined
export default function fromNullable<L, R>(error: L) {
	return function checkNullable(value: R | null | undefined): Either<L, R> {
		return value === null || value === undefined ? left(error) : right(value)
	}
}

//?? [EXAMPLE] fromNullable("missing")(null) // Left("missing")
//?? [EXAMPLE] fromNullable("missing")(42) // Right(42)
//?? [EXAMPLE] fromNullable({code: 404})("hello") // Right("hello")
/*??
 | [EXAMPLE]
 | const requireValue = fromNullable("Value is required")
 |
 | const getValue = (): string | null => {
 |   return Math.random() > 0.5 ? "success" : null
 | }
 |
 | const result = requireValue(getValue())
 | // Either Left("Value is required") or Right("success")
 |
 | // With custom error objects
 | type ValidationError = { field: string; message: string }
 | const requireField = (field: string) =>
 |   fromNullable<ValidationError, any>({ field, message: "Required" })
 |
 | const emailResult = requireField("email")(formData.email)
 | // Left({ field: "email", message: "Required" }) if null
 | // Right(email) if present
 |
 | [PRO] Converts nullable values to Either for safe handling
 | [PRO] Eliminates null/undefined checks in business logic
 | [PRO] Composable with other Either operations
 | [GOTCHA] Only checks for null and undefined, not empty strings
 |
*/
