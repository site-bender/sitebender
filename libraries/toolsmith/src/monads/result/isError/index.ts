import type { Error, Result } from "../../../types/fp/result/index.ts"

//++ Type guard that checks if a Result is Error
//++ [EXCEPTION] Uses === operator and property access to check discriminated union tag - this is a primitive type guard operation with no higher-level abstraction available
export default function isError<E, T>(
	result: Result<E, T>,
): result is Error<E> {
	return result._tag === "Error"
}

// isError(error("failed"))  // true
// isError(ok(42))  // false
