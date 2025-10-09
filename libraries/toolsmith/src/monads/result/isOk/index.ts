import type { Ok, Result } from "../../../types/fp/result/index.ts"

//++ Type guard that checks if a Result is Ok
//++ [EXCEPTION] Uses === operator and property access to check discriminated union tag - this is a primitive type guard operation with no higher-level abstraction available
export default function isOk<E, T>(result: Result<E, T>): result is Ok<T> {
	return result._tag === "Ok"
}

// isOk(ok(42))  // true
// isOk(error("failed"))  // false
