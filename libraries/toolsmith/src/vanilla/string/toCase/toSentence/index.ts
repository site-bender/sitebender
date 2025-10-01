import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toSentence = (s: string): string => {
	if (not(s)) return s

	// Convert to lowercase and capitalize only the first letter
	const trimmed = s.trim()
	if (trimmed.length === 0) return s

	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
}

export default toSentence
