//++ Format violation outputs into printable strings
import type { ViolationCheck, FormattedViolations } from '../types/index.ts'

export function formatViolations(
	results: Array<{ check: ViolationCheck; stdout: string }>,
): FormattedViolations {
	const initial: FormattedViolations = { errors: [], warnings: [] }

	return results.reduce<FormattedViolations>((acc, { check, stdout }) => {
		const trimmed = stdout.trim()

		if (trimmed === '') {
			return acc
		}

		return check.severity === 'error'
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
	}, initial)
}

export default formatViolations
