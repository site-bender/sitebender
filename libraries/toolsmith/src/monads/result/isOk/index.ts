import type { Ok } from "../../../types/fp/result/index.ts"

import isObject from "../../../predicates/isObject/index.ts"

//++ Type guard that checks if a Result is Ok
export default function isOk<T = unknown>(
	value: unknown,
): value is Ok<T> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return isObject(value) && "_tag" in value && value._tag === "Ok"
}

// isOk(ok(42))  // true
// isOk(error("failed"))  // false
