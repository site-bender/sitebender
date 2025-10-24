import type { Success } from "../../../types/fp/validation/index.ts"

import isObject from "../../../predicates/isObject/index.ts"

//++ Type guard that checks if a Validation is Success
export default function isSuccess<T = unknown>(
	value: unknown,
): value is Success<T> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return isObject(value) && "_tag" in value && value._tag === "Success"
}

// isSuccess(ok(42))  // true
// isSuccess(error("failed"))  // false
