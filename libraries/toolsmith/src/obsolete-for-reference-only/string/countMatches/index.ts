import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const countMatches = (
	pattern: string | RegExp | null | undefined,
) =>
(
	str: string | null | undefined,
): number => {
	if (isNullish(str) || typeof str !== "string") {
		return 0
	}

	if (isNullish(pattern)) {
		return 0
	}

	if (typeof pattern === "string") {
		if (pattern === "") {
			// Empty string matches at every position including end
			return str.length + 1
		}

		// Count non-overlapping occurrences of the substring
		let count = 0
		let index = 0

		while ((index = str.indexOf(pattern, index)) !== -1) {
			count++
			index += pattern.length
		}

		return count
	}

	if (pattern instanceof RegExp) {
		// Create a new regex with global flag if not present
		const globalPattern = pattern.global
			? pattern
			: new RegExp(pattern.source, pattern.flags + "g")

		const matches = str.match(globalPattern)
		return matches ? matches.length : 0
	}

	return 0
}

export default countMatches
