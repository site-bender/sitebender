import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/ValidationError/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import isObject from "../../validation/isObject/index.ts"
import isArray from "../../validation/isArray/index.ts"
import not from "../../logic/not/index.ts"
import and from "../../logic/and/index.ts"

//++ Gets object keys as array
//++ Returns Result with keys array or error if input invalid
export default function keys<T extends Record<string, unknown>>(
	obj: T,
): Result<ValidationError, ReadonlyArray<string>> {
	// Happy path: valid object (but not an array)
	if (and(isObject(obj))(not(isArray(obj)))) {
		const keyArray = Object.keys(obj)
		return ok(keyArray)
	}

	// Sad path: not an object
	return error({
		code: "KEYS_INVALID_INPUT",
		field: "obj",
		messages: ["System needs an object to get keys from"],
		received: obj as never,
		expected: "Object",
		suggestion: "Provide an object value",
		severity: "requirement",
	})
}
