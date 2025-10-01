import type { Ok, Result } from "../../../types/fp/result/index.ts"

//++ Type guard that checks if a Result is Ok
export default function isOk<E, T>(result: Result<E, T>): result is Ok<T> {
	return result._tag === "Ok"
}

// isOk(ok(42))  // true
// isOk(error("failed"))  // false
