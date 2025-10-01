import type { Result } from "../../../types/fp/result/index.ts"

//++ Type guard that checks if a value is a Result monad
export default function isResult<E, T>(value: unknown): value is Result<E, T> {
	if (typeof value !== "object" || value === null) {
		return false
	}

	const tagged = value as { _tag?: string }

	return tagged._tag === "Ok" || tagged._tag === "Error"
}
