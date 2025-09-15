import type { Error, Result } from "../../../types/fp/result/index.ts"

//++ Type guard that checks if a Result is Error
export default function isError<E, T>(result: Result<E, T>): result is Error<E> {
	return result._tag === "Error"
}

//?? [EXAMPLE]
// isError(error("failed"))  // true
// isError(ok(42))  // false
