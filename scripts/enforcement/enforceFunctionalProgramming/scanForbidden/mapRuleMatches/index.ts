import type { Violation } from "../../../../../types/enforcement/Violation.ts"

import addViolation from "../addViolation/index.ts"

export default function mapRuleMatches(
	file: string,
	lines: Array<string>,
	rule: { name: string; regex: RegExp },
): Array<Violation | null> {
	return lines.map(function mapLine(ln: string, i: number): Violation | null {
		return rule.regex.test(ln) ? addViolation(file, lines, i, rule) : null
	})
}
