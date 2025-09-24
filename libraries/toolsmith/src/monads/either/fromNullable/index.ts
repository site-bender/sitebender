import type { Either } from "../../../types/fp/either/index.ts"

import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Lifts a nullable value into Either (null/undefined -> Left, otherwise Right)
export default function fromNullable<L, R>(error: L) {
	return function checkNullable(value: R | null | undefined): Either<L, R> {
		return isNullish(value) ? left(error) : right(value as R)
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
 | [PRO] Converts nullable values to Either for explicit handling
 | [PRO] Eliminates scattered null checks
 | [PRO] Interoperates with downstream map/chain flows
 | [GOTCHA] Only treats null/undefined as empty (not empty string / NaN / 0)
 | [GOTCHA] Provide rich error objects early to reduce later mapping
 |
*/
