import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"

import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import isObject from "../../validation/isObject/index.ts"
import isArray from "../../validation/isArray/index.ts"
import not from "../../logic/not/index.ts"
import and from "../../logic/and/index.ts"

//++ Gets object values as array
//++ Returns Result with values array or error if input invalid
export default function values<T extends Record<string, unknown>>(
	obj: T,
): Result<ValidationError, ReadonlyArray<T[keyof T]>> {
	// Happy path: valid object (but not an array)
	if (and(isObject(obj))(not(isArray(obj)))) {
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
