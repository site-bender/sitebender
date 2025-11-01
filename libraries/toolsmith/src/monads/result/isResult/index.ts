import type { Result } from "../../../types/fp/result/index.ts"

//++ Type guard that checks if a value is a Result monad
export default function isResult<E, T>(value: unknown): value is Result<E, T> {
	//++ [EXCEPTION] typeof and !== operators permitted in Toolsmith for performance - provides type guard checking
	if (typeof value !== "object" || value === null) {
		return false
	}

	const tagged = value as { _tag?: string }

	//++ [EXCEPTION] === and || operators permitted in Toolsmith for performance - provides discriminated union type checking
	return tagged._tag === "Ok" || tagged._tag === "Error"
}
