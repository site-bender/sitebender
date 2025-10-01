import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"

//++ Maps a function over the Ok value of a Result
export default function map<T, U>(fn: (value: T) => U) {
	return function mapWithFn<E>(result: Result<E, T>): Result<E, U> {
		if (isOk(result)) {
			return ok(fn(result.value))
		}
		return result
	}
}

// const double = (x: number) => x * 2
// map(double)(ok(5))  // ok(10)
// map(double)(error("fail"))  // error("fail")
