import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

//++ Combines validation errors using semigroup principles, grouping messages by field
export default function combineErrors(
	errors1: NonEmptyArray<ValidationError>,
	errors2: NonEmptyArray<ValidationError>,
): NonEmptyArray<ValidationError> {
	const fieldMap = new Map<string, Array<string>>()

	// Collect all messages by field
	for (const err of [...errors1, ...errors2]) {
		const existing = fieldMap.get(err.field) || []
		fieldMap.set(err.field, [...existing, ...err.messages])
	}

	// Convert back to structured format
	const combined = Array.from(fieldMap.entries()).map(([field, messages]) => ({
		field,
		messages,
	}))

	return combined as NonEmptyArray<ValidationError>
}