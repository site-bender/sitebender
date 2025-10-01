import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"

//++ Maps functions over both Error and Ok values
export default function bimap<E, F>(onError: (err: E) => F) {
	return function bimapWithOnError<T, U>(onOk: (value: T) => U) {
		return function bimapWithBoth(result: Result<E, T>): Result<F, U> {
			if (isOk(result)) {
				return ok(onOk(result.value))
			}

			return error(onError(result.error))
		}
	}
}

// const transform = bimap
//   ((e: string) => e.toUpperCase())
//   ((x: number) => x * 2)
//
// transform(ok(5))      // ok(10)
// transform(error("fail")) // error("FAIL")
