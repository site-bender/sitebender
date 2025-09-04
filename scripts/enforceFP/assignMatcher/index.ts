// Special-case: flag Object.assign unless first arg is a literal {}

export type AssignFinding = { index: number; text: string }

export default function assignMatcher(source: string): AssignFinding[] {
	const re = /Object\.assign\(([^)]*)\)/g
	const findings: AssignFinding[] = []
	let match: RegExpExecArray | null
	while ((match = re.exec(source))) {
		const args = match[1].trim()
		if (!args.startsWith("{}")) {
			findings.push({ index: match.index, text: match[0] })
		}
	}
	return findings
}
