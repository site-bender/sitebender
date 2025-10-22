import type { Ok, Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Type guard that checks if a Result is Ok
export default function isOk<E, T>(
	value: Result<E, T> | Validation<E, T>,
): value is Ok<T> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return value._tag === "Ok"
}

// isOk(ok(42))  // true
// isOk(error("failed"))  // false
