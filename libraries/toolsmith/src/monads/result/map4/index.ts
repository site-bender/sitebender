import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"

//++ Applies a curried quaternary function to four Result values
//++ Short-circuits on first Error encountered
export default function map4<A, B, C, D, E, F>(
	fn: (a: A) => (b: B) => (c: C) => (d: D) => E,
) {
	return function applyToFirstResult(
		resultA: Result<F, A>,
	) {
		return function applyToSecondResult(
			resultB: Result<F, B>,
		) {
			return function applyToThirdResult(
				resultC: Result<F, C>,
			) {
				return function applyToFourthResult(
					resultD: Result<F, D>,
				): Result<F, E> {
					if (isOk(resultA)) {
						if (isOk(resultB)) {
							if (isOk(resultC)) {
								if (isOk(resultD)) {
									return ok(
										fn(resultA.value)(resultB.value)(resultC.value)(
											resultD.value,
										),
									)
								}

								return resultD
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
}
