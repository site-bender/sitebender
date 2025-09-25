import type { Violation } from "../../../../types/enforcement/Violation.ts"

export default function mapEntryToViolations(
	pedantic: boolean,
	toLines: (pedantic: boolean) => (source: string) => Array<string>,
	scanForbidden: (file: string) => (lines: Array<string>) => Array<Violation>,
	scanAssigns: (file: string) => (source: string) => Array<Violation>,
) {
	return function fromEntry(
		entry: { file: string; source: string },
	): Array<Violation> {
		const { file, source } = entry
		const lines = toLines(pedantic)(source)
		const forbid = scanForbidden(file)(lines)
		const assigns = scanAssigns(file)(source)

		return [...forbid, ...assigns]
	}
}
