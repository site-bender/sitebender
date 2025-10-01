import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"

//++ Applies a curried ternary function to three Result values
//++ Short-circuits on first Error encountered
export default function map3<A, B, C, D, E>(
	fn: (a: A) => (b: B) => (c: C) => D,
) {
	return function applyToFirstResult(
		resultA: Result<E, A>,
	) {
		return function applyToSecondResult(
			resultB: Result<E, B>,
		) {
			return function applyToThirdResult(
				resultC: Result<E, C>,
			): Result<E, D> {
				if (isOk(resultA)) {
					if (isOk(resultB)) {
						if (isOk(resultC)) {
							return ok(fn(resultA.value)(resultB.value)(resultC.value))
						}

						return resultC
					}

					return resultB
				}

				return resultA
			}
		}
	}
}
