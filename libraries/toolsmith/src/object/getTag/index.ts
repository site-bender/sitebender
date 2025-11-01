import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"

import error from "../../monads/result/error/index.ts"
import isPlainObject from "../../predicates/isPlainObject/index.ts"
import ok from "../../monads/result/ok/index.ts"

/*++
 + Gets the _tag property from a discriminated union
 + Used with objects that have a _tag discriminant
 + Returns the tag value in a Result monad for type narrowing and checks
 */
export default function getTag<T extends { _tag: string }>(
	obj: T,
): Result<ValidationError, T["_tag"]> {
	//++ [EXCEPTION] in operator permitted in Toolsmith for performance - provides property existence check
	if (isPlainObject(obj) && "_tag" in obj && obj._tag) {
		return ok(obj._tag)
	}

	return error({
		code: "GET_TAG_INVALID_INPUT",
		field: "obj",
		messages: ["System needs an object with a _tag property"],
		received: obj as never,
		expected: "Object with _tag property",
		suggestion: "Provide an object with a valid _tag property",
		severity: "requirement",
	})
}
