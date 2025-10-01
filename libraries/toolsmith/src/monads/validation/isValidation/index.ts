import type { Validation } from "../../../types/Validation/index.ts"

//++ Type guard that checks if a value is a Validation monad
export default function isValidation<E, A>(
	value: unknown,
): value is Validation<E, A> {
	if (typeof value !== "object" || value === null) {
		return false
	}

	const tagged = value as { _tag?: string }

	return tagged._tag === "Success" || tagged._tag === "Failure"
}
