//++ Format violation outputs into printable strings
import type { FormattedViolations, ViolationCheck } from "../types/index.ts"

import reduce from "@sitebender/toolkit/vanilla/array/reduce/index.ts"

import formatViolation from "../formatViolation/index.ts"

export function formatViolations(
	results: Array<{ check: ViolationCheck; stdout: string }>,
): FormattedViolations {
	const initial: FormattedViolations = { errors: [], warnings: [] }

	return reduce(formatViolation)(initial)(results)
}

export default formatViolations
