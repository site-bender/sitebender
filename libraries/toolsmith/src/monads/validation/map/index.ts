import type { Validation } from "../../../types/validation/index.ts"

//++ Maps a function over a valid value, preserving invalid state
export default function map<A, B>(fn: (value: A) => B) {
	return function applyMap<E>(validation: Validation<E, A>): Validation<E, B> {
		if (validation._tag === "Failure") {
			return validation
		}

		return {
			_tag: "Success",
			value: fn(validation.value),
		}
	}
}
