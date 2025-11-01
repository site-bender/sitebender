import not from "../../../validation/not/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toSentence = (s: string): string => {
	if (not(s)) return s

	// Convert to lowercase and capitalize only the first letter
	//++ [EXCEPTION] .trim() permitted in Toolsmith for performance - provides sentence case wrapper
	const trimmed = s.trim()
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides sentence case wrapper
	if (trimmed.length === 0) return s

	//++ [EXCEPTION] .charAt(), .toUpperCase(), .slice(), .toLowerCase(), and + permitted in Toolsmith for performance - provides sentence case wrapper
	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
}

export default toSentence
