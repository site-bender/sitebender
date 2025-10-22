import type { Result } from "../../../types/fp/result/index.ts"
import type { Success, Validation } from "../../../types/fp/validation/index.ts"

//++ Type guard that checks if a Validation is Success
export default function isSuccess<E, T>(
	value: Result<E, T> | Validation<E, T>,
): value is Success<T> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return value._tag === "Success"
}

// isSuccess(ok(42))  // true
// isSuccess(error("failed"))  // false
