import type { FormattedViolations, ViolationCheck } from "../types/index.ts"

import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"

//++ Formats a single violation result
export default function formatViolation(
	acc: FormattedViolations,
	result: { check: ViolationCheck; stdout: string }
): FormattedViolations {
	const { check, stdout } = result
	const trimmed = trim(stdout)

	if (trimmed === "") {
		return acc
	}

	return check.severity === "error"
		? {
			errors: [
				...acc.errors,
				`\n${check.errorMessage}\nFound in:\n${trimmed}`,
			],
			warnings: acc.warnings,
		}
		: {
			errors: acc.errors,
			warnings: [
				...acc.warnings,
				`${check.name}\n${trimmed}`,
			],
		}
}