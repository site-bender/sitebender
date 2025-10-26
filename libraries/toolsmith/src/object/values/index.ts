import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"

import and from "../../logic/and/index.ts"
import error from "../../monads/result/error/index.ts"
import isPlainObject from "../../predicates/isPlainObject/index.ts"
import ok from "../../monads/result/ok/index.ts"

//++ Gets object values as array
//++ Returns Result with values array or error if input invalid
export default function values<T extends Record<string, unknown>>(
	obj: T,
): Result<ValidationError, ReadonlyArray<T[keyof T]>> {
	// Happy path: valid plain object
	if (and(isPlainObject(obj))) {
		/*++
		 + [EXCEPTION] .values is permitted here for performance reasons
		 + This is the ONLY place .values should be used
		 + Everywhere else, use the `values` function instead
		 */
		const valueArray = Object.values(obj) as ReadonlyArray<T[keyof T]>

		return ok(valueArray)
	}

	// Sad path: not an object
	return error({
		code: "VALUES_INVALID_INPUT",
		field: "obj",
		messages: ["System needs an object to get values from"],
		received: obj as never,
		expected: "Object",
		suggestion: "Provide an object value",
		severity: "requirement",
	})
}
