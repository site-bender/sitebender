import not from "@sitebender/toolkit/vanilla/logic/not/index.ts"
import startsWith from "@sitebender/toolkit/vanilla/string/startsWith/index.ts"
import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"

export type AssignFinding = { index: number; text: string }

//++ Finds Object.assign calls where first argument is not a literal empty object
export default function assignMatcher(source: string): AssignFinding[] {
	const re = /Object\.assign\(([^)]*)\)/g
	const findings: AssignFinding[] = []

	function collectMatches(text: string): void {
		const regex = new RegExp(re.source, re.flags)
		let match = regex.exec(text)

		function processMatch(): void {
			if (not(match)) {
				return
			}

			const args = trim(match[1])
			if (not(startsWith("{}")(args))) {
				findings.push({ index: match.index, text: match[0] })
			}

			match = regex.exec(text)
			processMatch()
		}

		processMatch()
	}

	collectMatches(source)
	return findings
}