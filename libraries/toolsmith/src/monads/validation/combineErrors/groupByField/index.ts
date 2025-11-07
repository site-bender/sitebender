import type ValidationError from "../../../../types/fp/validation/index.ts"

//++ Groups validation error messages by field name using accumulator pattern
export default function groupByField(
	acc: Record<string, Array<string>>,
	err: ValidationError,
): Record<string, Array<string>> {
	const existing = acc[err.field] || []

	return {
		...acc,
		[err.field]: [...existing, ...err.messages],
	}
}
