import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import isPlainObject from "../../predicates/isPlainObject/index.ts"

/*++
 + Gets object entries as array of [key, value] tuples
 + Returns Result with entries array or error if input invalid
 */
export default function entries<T extends Record<string, unknown>>(
	obj: T,
): Result<ValidationError, ReadonlyArray<readonly [string, unknown]>> {
	/*++
	 + Happy path: valid object (but not an array)
	 */
	if (isPlainObject(obj)) {
		/*++
		 + [EXCEPTION] .entries is permitted here for performance reasons
		 + This is the ONLY place .entries should be used
		 + Everywhere else, use the `entries` function instead
		 */
		const entryArray = Object.entries(obj)

		return ok(entryArray)
	}

	/*++
	 + Sad path: not an object
	 */
	return error({
		code: "ENTRIES_INVALID_INPUT",
		field: "obj",
		messages: ["System needs an object to get entries from"],
		received: obj as never,
		expected: "Object",
		suggestion: "Provide an object value",
		severity: "requirement",
	})
}
