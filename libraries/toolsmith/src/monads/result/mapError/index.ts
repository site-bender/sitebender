import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"

//++ Maps a function over the Error value of a Result
export default function mapError<E, F>(fn: (err: E) => F) {
	return function mapErrorWithFn<T>(result: Result<E, T>): Result<F, T> {
		if (isError(result)) {
			return error(fn(result.error))
		}
		return result
	}
}

// const addContext = (e: string) => `Error: ${e}`
// mapError(addContext)(error("failed"))  // error("Error: failed")
// mapError(addContext)(ok(42))  // ok(42)
