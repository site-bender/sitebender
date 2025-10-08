import type { Validation } from "../../../types/validation/index.ts"

//++ Chains validation computations, short-circuiting on invalid
export default function chain<A, E, B>(fn: (value: A) => Validation<E, B>) {
	return function applyChain(
		validation: Validation<E, A>,
	): Validation<E, B> {
		if (validation._tag === "Failure") {
			return validation
		}

		return fn(validation.value)
	}
}
