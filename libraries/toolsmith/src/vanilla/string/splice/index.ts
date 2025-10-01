import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const splice = (
	start: number,
) =>
(
	deleteCount: number,
) =>
(
	replacement: string = "",
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Normalize negative index
	const actualStart = start < 0
		? Math.max(0, str.length + start)
		: Math.min(start, str.length)

	// Calculate actual delete count
	const actualDeleteCount = Math.min(
		Math.max(0, deleteCount),
		str.length - actualStart,
	)

	// Build result: before + replacement + after
	return str.slice(0, actualStart) +
		replacement +
		str.slice(actualStart + actualDeleteCount)
}

export default splice
