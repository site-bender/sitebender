import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Extracts the value from a Valid or returns a default value for Invalid
export default function getOrElse<E, A>(
	defaultValue: A,
) {
	return function applyGetOrElse(validation: Validation<E, A>): A {
		//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Validation monad tag checking
		if (validation._tag === "Failure") {
			return defaultValue
		}

		return validation.value
	}
}
