//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
//++ matches(pattern)(value) — RegExp/string pattern predicate for strings
const matches = (
	pattern: RegExp | string,
) =>
(
	value: unknown,
): boolean => {
	if (typeof value !== "string") {
		return false
	}

	const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern

	return regex.test(value)
}

export default matches

//?? [EXAMPLE] matches(/^\d+$/)("123") // true
//?? [EXAMPLE] matches(/^\d+$/)("12a") // false
