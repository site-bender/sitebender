import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"

import type { Violation } from "../../../../../types/enforcement/Violation.ts"

import searchIndex from "../../string/searchIndex/index.ts"

export default function addViolation(
	file: string,
	lines: Array<string>,
	idx: number,
	rule: { name: string; regex: RegExp },
): Violation {
	return {
		file,
		line: idx + 1,
		col: searchIndex(rule.regex)(lines[idx]) + 1,
		rule: rule.name,
		snippet: trim(lines[idx]),
	}
}
