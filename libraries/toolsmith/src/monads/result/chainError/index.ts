import type { Result } from "../../../types/fp/result/index.ts"

import isError from "../isError/index.ts"

//++ Flat maps over the Error value of a Result
export default function chainError<E, F, T>(fn: (err: E) => Result<F, T>) {
	return function chainErrorWithFn(result: Result<E, T>): Result<F, T> {
		if (isError(result)) {
			return fn(result.error)
		}
		return result
	}
}

// const recoverError = (e: string) =>
//   e === "recoverable" ? ok(0) : error(`Fatal: ${e}`)
//
// chainError(recoverError)(error("recoverable"))  // ok(0)
// chainError(recoverError)(error("unrecoverable"))  // error("Fatal: unrecoverable")
// chainError(recoverError)(ok(42))  // ok(42)
