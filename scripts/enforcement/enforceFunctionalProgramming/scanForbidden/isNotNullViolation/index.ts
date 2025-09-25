import type { Violation } from "../../../../../types/enforcement/Violation.ts"

export default function isNotNullViolation(
	v: Violation | null,
): v is Violation {
	return v !== null
}
