import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Type guard that checks if a value is a Validation monad
export default function isValidation<E, A>(
	value: unknown,
): value is Validation<E, A> {
	//++ [EXCEPTION] typeof and !== operators permitted in Toolsmith for performance - provides type guard checking
	if (typeof value !== "object" || value === null) {
		return false
	}

	const tagged = value as { _tag?: string }

	//++ [EXCEPTION] === and || operators permitted in Toolsmith for performance - provides discriminated union type checking
	return tagged._tag === "Success" || tagged._tag === "Failure"
}
