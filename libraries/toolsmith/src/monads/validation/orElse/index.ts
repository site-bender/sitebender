import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Returns the validation if Valid, otherwise returns an alternative validation
export default function orElse<E, A>(
	alternative: () => Validation<E, A>,
) {
	return function applyOrElse(validation: Validation<E, A>): Validation<E, A> {
		//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Validation monad tag checking
		if (validation._tag === "Failure") {
			return alternative()
		}

		return validation
	}
}
