import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"

//++ Applies a curried binary function to two Result values
//++ Short-circuits on first Error encountered
export default function map2<A, B, C, E>(
	fn: (a: A) => (b: B) => C,
) {
	return function applyToFirstResult(
		resultA: Result<E, A>,
	) {
		return function applyToSecondResult(
			resultB: Result<E, B>,
		): Result<E, C> {
			if (isOk(resultA)) {
				if (isOk(resultB)) {
					return ok(fn(resultA.value)(resultB.value))
				}

				return resultB
			}

			return resultA
		}
	}
}
