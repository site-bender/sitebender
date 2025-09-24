//++ Finds all regex matches in a string
export default function findAllMatches(
	regex: RegExp,
	text: string,
): Array<RegExpExecArray> {
	regex.lastIndex = 0
	const matches: Array<RegExpExecArray> = []
	let match: RegExpExecArray | null

	// Recursive approach to avoid while loop
	function collectMatches(): void {
		match = regex.exec(text)
		if (match !== null) {
			matches.push(match)
			collectMatches()
		}
	}

	collectMatches()
	return matches
}