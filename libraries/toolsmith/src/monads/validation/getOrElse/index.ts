import type { Validation } from "../../../types/Validation/index.ts"

//++ Extracts the value from a Valid or returns a default value for Invalid
export default function getOrElse<E, A>(
	defaultValue: A,
) {
	return function applyGetOrElse(validation: Validation<E, A>): A {
		if (validation._tag === "Failure") {
			return defaultValue
		}

		return validation.value
	}
}
