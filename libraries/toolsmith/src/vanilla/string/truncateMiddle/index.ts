import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const truncateMiddle = (
	maxLength: number,
) =>
(
	separator: string = "...",
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// If string is already short enough, return as-is
	if (str.length <= maxLength) {
		return str
	}

	// If maxLength is less than or equal to separator length,
	// return just the separator truncated to maxLength
	if (maxLength <= separator.length) {
		return separator.slice(0, maxLength)
	}

	// Calculate how many characters we can keep from original string
	const availableLength = maxLength - separator.length

	// If no room for any original characters, return separator
	if (availableLength <= 0) {
		return separator.slice(0, maxLength)
	}

	// Split available length between start and end
	// Favor the start slightly if odd number
	const startLength = Math.ceil(availableLength / 2)
	const endLength = Math.floor(availableLength / 2)

	// Extract start and end portions
	const start = str.slice(0, startLength)
	const end = str.slice(-endLength)

	// Combine with separator
	return start + separator + end
}

export default truncateMiddle
