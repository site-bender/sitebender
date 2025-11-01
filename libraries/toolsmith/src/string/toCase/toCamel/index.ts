import words from "../../words/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toCamel = (str: string | null | undefined): string => {
	const wordList = words(str)

	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides camelCase wrapper
	if (wordList.length === 0) {
		return ""
	}

	const [first, ...rest] = wordList

	//++ [EXCEPTION] .toLowerCase(), .map(), .charAt(), .toUpperCase(), .slice(), .join(), and + permitted in Toolsmith for performance - provides camelCase wrapper
	return [
		first.toLowerCase(),
		...rest.map((word) =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		),
	].join("")
}

export default toCamel
