import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const substring = (
	start: number,
) =>
(
	end: number = Infinity,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Convert negative values to 0, handle Infinity
	const actualStart = Math.max(0, start)
	const actualEnd = end === Infinity ? str.length : Math.max(0, end)

	// Use native substring (it handles swapping automatically)
	return str.substring(actualStart, actualEnd)
}

export default substring
