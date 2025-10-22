import type { Error, Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Type guard that checks if a Result is Error
//++ [EXCEPTION] Uses === operator and property access to check discriminated union tag - this is a primitive type guard operation with no higher-level abstraction available
export default function isError<E, T>(
	value: Result<E, T> | Validation<E, T>,
): value is Error<E> {
	return value._tag === "Error"
}

// isError(error("failed"))  // true
// isError(ok(42))  // false
