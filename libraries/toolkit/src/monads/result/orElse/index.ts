import type { Result } from "../../../types/fp/result/index.ts"

import isError from "../isError/index.ts"

//++ Returns an alternative Result if the current one is Error
export default function orElse<E, F, T>(recover: (err: E) => Result<F, T>) {
	return function orElseWithRecover(result: Result<E, T>): Result<F, T> {
		if (isError(result)) {
			return recover(result.error)
		}
		return result
	}
}

//?? [EXAMPLE]
// const fallback = orElse(() => ok(0))
//
// fallback(ok(42))  // ok(42)
// fallback(error("failed"))  // ok(0)
//
// const tryAgain = orElse((e: string) =>
//   e === "retry" ? ok(1) : error("fatal")
// )
//
// tryAgain(error("retry"))  // ok(1)
// tryAgain(error("other"))  // error("fatal")
