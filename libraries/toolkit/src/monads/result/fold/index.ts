import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"

//++ Folds a Result to a single value using handlers for both cases
export default function fold<E, B>(onError: (error: E) => B) {
	return function foldWithOnError<T>(onOk: (value: T) => B) {
		return function foldWithBoth(result: Result<E, T>): B {
			if (isOk(result)) {
				return onOk(result.value)
			}
			return onError(result.error)
		}
	}
}

//?? [EXAMPLE]
// const toNumber = fold<string, number>(
//   (e: string) => 0  // Error case returns 0
// )(
//   (x: number) => x   // Ok case returns the value
// )
//
// toNumber(ok(42))  // 42
// toNumber(error("failed"))  // 0
