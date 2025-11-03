//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const swapCase = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	return str.replace(/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g, (char) => {
		return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
	})
}

export default swapCase
