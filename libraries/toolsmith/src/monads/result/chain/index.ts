import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Chains result computations, short-circuiting on invalid.
 */
export default function chain<T, U, E>(fn: (value: T) => Result<E, U>) {
	return function chainWithFn(result: Result<E, T>): Result<E, U> {
		if (isOk(result)) {
			return fn(result.value)
		}

		return result
	}
}
