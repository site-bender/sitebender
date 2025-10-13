import not from "@sitebender/toolsmith/logic/not/index.ts"
import startsWith from "@sitebender/toolsmith/string/startsWith/index.ts"
import trim from "@sitebender/toolsmith/string/trim/index.ts"

export type AssignFinding = { index: number; text: string }

//++ Finds Object.assign calls where first argument is not a literal empty object
export default function assignMatcher(source: string): AssignFinding[] {
	const re = /Object\.assign\(([^)]*)\)/g

	function collect(regex: RegExp, text: string): AssignFinding[] {
		const m = regex.exec(text)
		if (m === null) return []
		const args = trim(m[1])
		const head: AssignFinding[] = not(startsWith("{}")(args))
			? [{ index: m.index, text: m[0] }]
			: []
		const next = new RegExp(re.source, re.flags)
		return [...head, ...collect(next, text)]
	}

	const regex = new RegExp(re.source, re.flags)
	return collect(regex, source)
}
