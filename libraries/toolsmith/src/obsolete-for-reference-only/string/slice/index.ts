import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const slice = (
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

	// Use native slice with proper handling of Infinity
	const actualEnd = end === Infinity ? str.length : end
	return str.slice(start, actualEnd)
}

export default slice
