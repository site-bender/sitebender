import type { Validation } from "../../../types/fp/validation/index.ts"

import isSuccess from "../isSuccess/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Chains validation computations, short-circuiting on invalid.
 */
export default function chain<A, E, B>(fn: (value: A) => Validation<E, B>) {
	return function applyChain(
		validation: Validation<E, A>,
	): Validation<E, B> {
		if (isSuccess(validation)) {
		return fn(validation.value)
		}

		return validation
	}
}
