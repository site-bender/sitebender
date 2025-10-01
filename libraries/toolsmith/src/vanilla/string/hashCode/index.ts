import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hashCode = (
	str: string | null | undefined,
): number => {
	if (isNullish(str) || typeof str !== "string") {
		return 0
	}

	if (str.length === 0) {
		return 0
	}

	const result = str.split("").reduce((hash, char) => {
		const code = char.charCodeAt(0)
		const newHash = ((hash << 5) - hash) + code
		// Convert to 32-bit integer
		return newHash | 0
	}, 0)

	return result
}

export default hashCode
